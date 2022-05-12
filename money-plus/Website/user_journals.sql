SELECT * FROM journals;
SELECT * FROM users_journals;

SELECT json_agg(journals.name) FROM users_journals JOIN journals 
    ON users_journals.journals_id = journals.id
    WHERE users_id = 2
    GROUP BY users_id

Select * from transactions;