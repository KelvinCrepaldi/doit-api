import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

(async () => {
  const PORT = process.env.PORT || 3001;

  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
})();
