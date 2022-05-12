// Update with your config settings.
import dotenv from "dotenv";

dotenv.config();

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: process.env.DB_DEV_NAME,
            user: process.env.DB_DEV_USERNAME,
            password: process.env.DB_DEV_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
            afterCreate: function (connection: any, callback: any) {
                connection.query(
                    "SET timezone = 'Hongkong';",
                    function (err: any) {
                        callback(err, connection);
                    }
                );
            },
        },
        migrations: {
            tableName: "knex_migrations",
        },
        // debug: true,
    },

    testing: {
        client: "postgresql",
        connection: {
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            timezone: "HKT",
        },
        pool: {
            min: 2,
            max: 10,
            afterCreate: function (connection: any, callback: any) {
                connection.query(
                    "SET timezone = 'Hongkong';",
                    function (err: any) {
                        callback(err, connection);
                    }
                );
            },
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.POSTGRES_HOST,
        },
        pool: {
            min: 2,
            max: 10,
            afterCreate: function (connection: any, callback: any) {
                connection.query(
                    "SET timezone = 'Hongkong';",
                    function (err: any) {
                        callback(err, connection);
                    }
                );
            },
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
