import express, { Express } from "express";
import { config } from "dotenv";
import { restRouter } from "./components/index";
import { validateEnv } from "./functions/validate-env.function";
import { appDataSource } from "./data-source";
import { notFound } from "./middlewares/not-found";
config({ path: "environment.env" });

const PORT = process.env.SERVER_PORT || 3000;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", restRouter);

//Invalid Route Middleware...
app.use(notFound);

//SERVER INITIALIZING....
(async () => {
  try {
    await validateEnv();
    await appDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.log(error);
  }
})();

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
