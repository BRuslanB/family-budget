DROP TABLE IF EXISTS expense_category CASCADE;
CREATE TABLE expense_category (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS purchase CASCADE;
CREATE TABLE purchase (
    id SERIAL PRIMARY KEY NOT NULL,
    category_id INT,
    expense TEXT NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS budget CASCADE;
CREATE TABLE budget (
    id SERIAL PRIMARY KEY NOT NULL,
    income TEXT NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS checks CASCADE;
CREATE TABLE checks (
    id SERIAL PRIMARY KEY NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    date DATE NOT NULL,
    note TEXT,
    budget_id INT NULL,
    purchase_id INT NULL
);

DROP TABLE IF EXISTS role CASCADE;
CREATE TABLE role (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    birth_day DATE NOT NULL,
    password TEXT NOT NULL
);

DROP TABLE IF EXISTS users_roles;
CREATE TABLE users_roles (
    user_id INT NOT NULL,
    roles_id INT NOT NULL
);