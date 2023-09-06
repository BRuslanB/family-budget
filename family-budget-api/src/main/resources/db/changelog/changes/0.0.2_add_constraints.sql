ALTER TABLE expense
    DROP CONSTRAINT IF EXISTS expense_expense_category_id_fk;
ALTER TABLE expense
    ADD CONSTRAINT expense_expense_category_id_fk
        FOREIGN KEY (category_id) REFERENCES expense_category(id)
            ON DELETE SET NULL;

ALTER TABLE checks
    DROP CONSTRAINT IF EXISTS checks_income_id_fk;
ALTER TABLE checks
    ADD CONSTRAINT checks_income_id_fk
        FOREIGN KEY (income_id) REFERENCES income(id);

ALTER TABLE checks
    DROP CONSTRAINT IF EXISTS checks_expense_id_fk;
ALTER TABLE checks
    ADD CONSTRAINT checks_expense_id_fk
        FOREIGN KEY (expense_id) REFERENCES expense(id);

ALTER TABLE checks
    DROP CONSTRAINT IF EXISTS checks_actor_id_fk;
ALTER TABLE checks
    ADD CONSTRAINT checks_actor_id_fk
        FOREIGN KEY (actor_id) REFERENCES actor(id);

ALTER TABLE budget
    DROP CONSTRAINT IF EXISTS budget_pk;
ALTER TABLE budget
    ADD CONSTRAINT budget_pk
        UNIQUE (date);