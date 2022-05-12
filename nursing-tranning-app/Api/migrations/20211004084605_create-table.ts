import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.text("username").notNullable();
        table.text("token");
        table.text("email").unique();
        table.boolean("is_active").notNullable();
        table.integer("score").notNullable();
        table.integer("glycemic_index").notNullable();
        table.boolean("finished_all_mc").notNullable();
        table.text("biography");
        table.boolean("is_poly");
        table.text("profile_picture");
        table.integer("gym_quota");
        table.integer("win");
        table.boolean("is_admin");
        table.timestamps(false, true);
    });

    await knex.schema.createTable("questions", (table) => {
        table.increments();
        table.text("content").notNullable();
        table.boolean("is_active").notNullable();
        table.text("pool");
    });

    await knex.schema.createTable("answers", (table) => {
        table.increments();
        table.integer("question_id").unsigned();
        table.foreign("question_id").references("questions.id");
        table.text("content").notNullable();
        table.boolean("is_correct").notNullable();
        table.boolean("is_active").notNullable();
    });

    await knex.schema.createTable("test_records", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("question_id").unsigned();
        table.foreign("question_id").references("questions.id");
        table.boolean("is_correct");
        table.integer("selected_answer").unsigned().notNullable();
        table.foreign("selected_answer").references("answers.id");
        table.timestamp("question_time");
        table.timestamp("answer_time");
    });

    await knex.schema.createTable("stock_items", (table) => {
        table.increments();
        table.integer("glycemic_index").notNullable();
        table.text("item_name").notNullable();
        table.integer("price");
        table.boolean("is_gym");
        table.boolean("is_supermarket");
        table.text("description");
        table.text("item_pic");
    });
    await knex.schema.createTable("purchased_items", (table) => {
        table.increments();
        table.timestamp("purchase_at").notNullable();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("item_id").unsigned();
        table.foreign("item_id").references("stock_items.id");
    });

    await knex.schema.createTable("student_posts", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.text("caption").notNullable();
        table.boolean("visibility").notNullable();
        table.timestamp("create_at").notNullable();
        table.timestamp("update_at");
    });

    await knex.schema.createTable("post_images", (table) => {
        table.increments();
        table
            .integer("post_id")
            .unsigned()
            .notNullable()
            .references("student_posts.id");
        table.text("url");
    });

    await knex.schema.createTable("post_comments", (table) => {
        table.increments();
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("users.id");
        table.integer("post_id").unsigned().notNullable();
        table.foreign("post_id").references("student_posts.id");
        table.text("content");
        table.timestamp("create_at").notNullable();
        table.timestamp("update_at");
    });

    // RATINGGGGGGGG DUPLICATE
    await knex.schema.createTable("post_ratings", (table) => {
        table.increments();
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("users.id");
        table
            .integer("post_id")
            .unsigned()
            .notNullable()
            .references("student_posts.id");
        table.integer("rating").unsigned().notNullable();
        table.timestamps(false, true);
        // table.unique(['post_id','user_id'])
    });

    await knex.schema.createTable("game_rooms", (table) => {
        table.increments();
        table.text("name");
        table.integer("turn");
    });

    await knex.schema.createTable("game_room_members", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("game_room_id").unsigned();
        table.foreign("game_room_id").references("game_rooms.id");
    });

    await knex.schema.createTable("game_records", (table) => {
        table.increments();
        table.integer("game_room_id").unsigned();
        table.foreign("game_room_id").references("game_rooms.id");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("location");
        table.integer("coins");
        table.boolean("answering_mc");
        table.timestamps(false, true);
    });

    await knex.schema.createTable("special_tiles", (table) => {
        table.increments();
        table.integer("origin");
        table.integer("destination");
        table.integer("reward");
        table.boolean("is_reward");
    });

    await knex.schema.createTable("game_question_records", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("question_id").unsigned();
        table.foreign("question_id").references("questions.id");
        table.integer("answer_id").unsigned();
        table.foreign("answer_id").references("answers_id");
        table.integer("game_room_id").unsigned();
        table.foreign("game_room_id").references("game_rooms.id");
        table.integer("special_tile_id").unsigned();
        table.foreign("special_tile_id").references("special_tiles.id");
    });

    await knex.schema.createTable("request_record", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table.text("method");
        table.text("path");
        table.text("browser");
        table.text("version");
        table.text("os");
        table.text("platform");
        table.text("source");
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("game_question_records"); // this is new
    await knex.schema.dropTable("special_tiles"); // this is new
    await knex.schema.dropTable("request_record"); // this is new
    await knex.schema.dropTable("game_records");
    await knex.schema.dropTable("game_room_members");
    await knex.schema.dropTable("game_rooms");
    await knex.schema.dropTable("test_records");
    await knex.schema.dropTable("answers");
    await knex.schema.dropTable("questions");
    await knex.schema.dropTable("purchased_items");
    await knex.schema.dropTable("stock_items");
    await knex.schema.dropTable("post_comments");
    await knex.schema.dropTable("post_images");
    await knex.schema.dropTable("post_ratings");
    await knex.schema.dropTable("student_posts");
    await knex.schema.dropTable("users");
}
