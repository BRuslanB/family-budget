DROP TABLE IF EXISTS expense_category CASCADE;
CREATE TABLE expense_category (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS expense CASCADE;
CREATE TABLE expense (
    id SERIAL PRIMARY KEY NOT NULL,
    category_id INT,
    name TEXT NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS income CASCADE;
CREATE TABLE income (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS actor CASCADE;
CREATE TABLE actor (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS checks CASCADE;
CREATE TABLE checks (
    id SERIAL PRIMARY KEY NOT NULL,
    val DOUBLE PRECISION NOT NULL,
    date DATE NOT NULL,
    note TEXT,
    actor_id INT NOT NULL,
    income_id INT NULL,
    expense_id INT NULL,
    object_id TEXT
);

DROP TABLE IF EXISTS budget CASCADE;
CREATE TABLE budget (
    id SERIAL PRIMARY KEY NOT NULL,
    sum DOUBLE PRECISION NOT NULL,
    date DATE NOT NULL
);