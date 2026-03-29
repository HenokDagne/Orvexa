const dotenv = require("dotenv");
dotenv.config();
const { connectDB, disconnectDB } = require("./db/connection");
const app = require("./src/app");

const PORT = Number.parseInt(process.env.PORT || "3000", 10);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[backend] listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("[backend] failed to connect database:", error);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDB();
  process.exit(0);
});

module.exports = app;