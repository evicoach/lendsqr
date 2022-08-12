import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_SCHEMA!)
    .createTable("accounts", (table) => {
      table.increments("account_id");
      table.integer("balance").defaultTo(0.0);
      table.integer("available_balance").notNullable().defaultTo(0.0);
      table.timestamps(true,true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("accounts");
}
