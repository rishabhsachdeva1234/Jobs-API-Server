declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      RUN_SECURE: string;
      PG_DB_HOST: string;
      PG_DB_PORT: number;
      PG_DB_USERNAME: string;
      PG_DB_PASSWORD: string;
      PG_DB_NAME: string;
      JWT_SECRET_KEY: string;
      NODE_ENV: "production" | "development";
    }
  }
}

export module EnvironmentData {
  // interface IProcessEnv {
  //   SERVER_PORT: string;
  //   RUN_SECURE: string;
  //   PG_DB_HOST: string;
  //   PG_DB_PORT: number;
  //   PG_DB_USER: string;
  //   PG_DB_PASSWORD: string;
  //   PG_DB_NAME: string;
  //   JWT_SECRET_KEY: string;
  //   NODE_ENV: "production" | "development";
  // }
}
