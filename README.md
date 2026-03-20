# Production-Style Product Proxy (Nginx + Express + Docker Compose)

This project exposes one public endpoint through Nginx:

- `GET /products?q=...&limit=...&skip=...`

Nginx reverse proxies requests to 3 Express instances (`backend1`, `backend2`, `backend3`) and provides:

- Load balancing
- IP-based rate limiting (`10r/s`, burst `20`)
- Forwarded headers (`X-Forwarded-For`, `X-Forwarded-Proto`, `X-Real-IP`)
- Basic WAF-like blocking rules (`../`, `<script`, `union select`)

Express app behavior:

- `app.set('trust proxy', 1)`
- `GET /health` returns `{ ok: true, instance }`
- `GET /products`
  - With `q`: calls `https://dummyjson.com/products/search?q=...`
  - Without `q`: calls `https://dummyjson.com/products?limit=...&skip=...`
  - `limit`/`skip` are validated as integers
- 30-second in-memory cache
- 5-second upstream timeout
- Response shape:

```json
{
  "instance": "backend1",
  "clientIp": "::ffff:172.18.0.1",
  "upstreamUrl": "https://dummyjson.com/products?limit=10&skip=0",
  "data": {}
}
```

## Project Layout

```text
.
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
└── backend/
    ├── Dockerfile
    ├── package.json
    └── server.js
```

## Run

From project root:

```bash
docker compose up --build
```

Public entrypoint:

- `http://localhost:8080`

Only Nginx is exposed to host. Backends are internal-only on Docker network.

## Example Requests

Health (repeat to see load balancing across instances):

```bash
curl -s http://localhost:8080/health | jq
```

Products without search:

```bash
curl -s "http://localhost:8080/products?limit=10&skip=0" | jq
```

Products with search query:

```bash
curl -s "http://localhost:8080/products?q=phone&limit=5&skip=0" | jq
```

Invalid pagination (expect `400`):

```bash
curl -i "http://localhost:8080/products?limit=abc&skip=0"
```

WAF-like block examples (expect `403`):

```bash
curl -i "http://localhost:8080/products?q=<script>alert(1)</script>"
curl -i "http://localhost:8080/products?q=1 union select 1"
curl -i "http://localhost:8080/../../etc/passwd"
```

Quick rate-limit check (expect some `429` responses under heavy burst):

```bash
for i in $(seq 1 60); do
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:8080/products?limit=1&skip=0" &
done
wait
```

## Stop

```bash
docker compose down
```
