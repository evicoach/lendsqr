import { Knex } from "knex";

// Update with your config settings.
interface IKnexConfig {
  [key: string]: Knex.Config;
}

const config: IKnexConfig = {
  development: {
    client: process.env.DB_CLIENT,
    version: process.env.DB_VERSION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as number | undefined,
      database: process.env.DB_SCHEMA,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: process.env.DB_MIN_POOL as number | undefined,
      max: process.env.DB_MAX_POOL as number | undefined,
    },
    migrations: {
      tableName: process.env.DB_MIGRATION_TABLE,
    },
  },

  staging: {
    client: process.env.DB_CLIENT,
    version: process.env.DB_VERSION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as number | undefined,
      database: process.env.DB_SCHEMA,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: process.env.DB_MIN_POOL as number | undefined,
      max: process.env.DB_MAX_POOL as number | undefined,
    },
    migrations: {
      tableName: process.env.DB_MIGRATION_TABLE,
    },
  },

  production: {
    client: process.env.DB_CLIENT,
    version: process.env.DB_VERSION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as number | undefined,
      database: process.env.DB_SCHEMA,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: process.env.DB_MIN_POOL as number | undefined,
      max: process.env.DB_MAX_POOL as number | undefined,
    },
    migrations: {
      tableName: process.env.DB_MIGRATION_TABLE,
    },
  },
};

export default config;
