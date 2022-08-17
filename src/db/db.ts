import knex from "knex";
import knexfile from "./knexfile";
const option =
  process.env.NODE_ENV === "development"
    ? knexfile.development
    : knexfile.development;
const db = knex(option);
export default db;
