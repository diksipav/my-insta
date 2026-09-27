import { createApp } from "./app.ts";
import { config } from "./config.ts";
import { pool } from "./db/client.ts";

const app = createApp();

const server = app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
});

function shutdown(signal: string) {
  console.log(`${signal} received. Shutting down gracefully.`);

  server.close(async (error) => {
    if (error) {
      console.error("Failed to close HTTP server", error);
      process.exit(1);
    }

    console.log("HTTP server closed.");
    await pool.end();
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Shutdown timed out; forcing exit.");
    process.exit(1);
  }, 10_000).unref();
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
