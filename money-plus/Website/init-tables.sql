-- SELECT all from TABLES
SELECT * FROM users;
SELECT * FROM modules;
SELECT * FROM journals;
SELECT * FROM roles;
SELECT * FROM users_journals;
SELECT * FROM transactions;
SELECT * FROM categories;
SELECT * FROM notifications;

-- Correct Order ONE CLICK!!!
DROP TABLE notifications;
DROP TABLE transactions;
DROP TABLE categories;
DROP TABLE users_journals;
DROP TABLE journals;
DROP TABLE modules;
DROP TABLE roles;
DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    is_superuser BOOLEAN DEFAULT FALSE,
    gender TEXT,
    age TEXT,
    email text,
    image varchar(255)
);

CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE journals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    modules_id INTEGER,
    FOREIGN KEY (modules_id) REFERENCES modules(id)
        ON DELETE SET NULL,
    description TEXT,
    goals TEXT,
    create_at DATE,
    update_at DATE
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE users_journals (
    id SERIAL PRIMARY KEY,
    users_id INTEGER NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id)
        ON DELETE SET NULL,
    journals_id INTEGER NOT NULL,
    FOREIGN KEY (journals_id) REFERENCES journals(id),
    roles_id INTEGER DEFAULT 2,
    FOREIGN KEY (roles_id) REFERENCES roles(id)
);

-- Categories of transactions, Group by "groups"
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT,
    is_income BOOLEAN,
    groups TEXT
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,

    users_id INTEGER,
    FOREIGN KEY (users_id) REFERENCES users(id)
        ON DELETE SET NULL,

    journals_id INTEGER,
    FOREIGN KEY (journals_id) REFERENCES journals(id)
        ON DELETE SET NULL,

    categories_id INTEGER,
    FOREIGN KEY (categories_id) REFERENCES categories(id)
        ON DELETE SET NULL,

    date DATE,

    amount decimal(16,2)
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    users_id INTEGER,
    FOREIGN KEY (users_id) REFERENCES  users(id)
        ON DElETE SET NULL,
    title TEXT,
    tag TEXT,
    message TEXT,
    create_at DATE,
    options json
);
