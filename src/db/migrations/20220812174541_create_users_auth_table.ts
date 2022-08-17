import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_SCHEMA!)
    .createTable("user_auth", (table) => {
      table.increments("auth_id");
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_auth");
}
