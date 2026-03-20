const express = require("express");

const app = express();

app.set("trust proxy", 1);

const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const INSTANCE_NAME = process.env.INSTANCE_NAME || "backend";
const CACHE_TTL_MS = 30 * 1000;
const UPSTREAM_TIMEOUT_MS = 5 * 1000;
const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;
const MAX_LIMIT = 100;

const cache = new Map();

function parsePagination(value, defaultValue, min, max) {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    return null;
  }

  return parsed;
}

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.value;
}

function setCache(key, value) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Upstream responded with HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

app.get("/health", (req, res) => {
  res.json({ ok: true, instance: INSTANCE_NAME });
});

app.get("/products", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const limit = parsePagination(req.query.limit, DEFAULT_LIMIT, 1, MAX_LIMIT);
  const skip = parsePagination(req.query.skip, DEFAULT_SKIP, 0, 100000);

  if (limit === null || skip === null) {
    return res.status(400).json({
      error: "Invalid pagination parameters. limit must be 1-100, skip must be 0 or greater.",
    });
  }

  let upstreamUrl;

  if (q) {
    const params = new URLSearchParams({ q });
    if (req.query.limit !== undefined) {
      params.set("limit", String(limit));
    }
    if (req.query.skip !== undefined) {
      params.set("skip", String(skip));
    }
    upstreamUrl = `https://dummyjson.com/products/search?${params.toString()}`;
  } else {
    const params = new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
    });
    upstreamUrl = `https://dummyjson.com/products?${params.toString()}`;
  }

  const cachedData = getCached(upstreamUrl);
  if (cachedData) {
    return res.json({
      instance: INSTANCE_NAME,
      clientIp: req.ip,
      upstreamUrl,
      data: cachedData,
    });
  }

  try {
    const data = await fetchWithTimeout(upstreamUrl, UPSTREAM_TIMEOUT_MS);
    setCache(upstreamUrl, data);

    return res.json({
      instance: INSTANCE_NAME,
      clientIp: req.ip,
      upstreamUrl,
      data,
    });
  } catch (error) {
    const message =
      error && error.name === "AbortError"
        ? "Upstream timeout"
        : "Failed to fetch upstream products";

    return res.status(502).json({
      error: message,
      instance: INSTANCE_NAME,
      clientIp: req.ip,
      upstreamUrl,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found", instance: INSTANCE_NAME });
});

app.listen(PORT, () => {
  console.log(`[${INSTANCE_NAME}] listening on port ${PORT}`);
});
