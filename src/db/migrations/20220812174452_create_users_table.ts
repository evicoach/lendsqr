import knex, { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_SCHEMA!)
    .createTable("users", (table: Knex.CreateTableBuilder) => {
      table.increments("user_id");
      table.string("email").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.date("dob").notNullable();
      table.enum("sex", ["male", "female", "not sure"]);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
