import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_SCHEMA!)
    .createTable("transactions", (table) => {
      table.increments("transaction_id");
      table.enum("type", ["credit", "debit"]).defaultTo("debit");
      table.integer("amount").notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
