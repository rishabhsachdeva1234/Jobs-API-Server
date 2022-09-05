import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { UserEntity } from "./components/auth/entity/user.entity";
config({ path: "environment.env" });

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_DB_HOST!,
  port: +process.env.PG_DB_PORT!,
  username: process.env.PG_DB_USERNAME!,
  password: process.env.PG_DB_PASSWORD!,
  database: process.env.PG_DB_NAME!,
  synchronize: true,
  logging: false,
  entities: [UserEntity],
});
