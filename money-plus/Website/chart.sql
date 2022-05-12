-- SELECT all from TABLES
SELECT * FROM users;
SELECT * FROM modules;
SELECT * FROM journals;
SELECT * FROM roles;
SELECT * FROM users_journals;
SELECT * FROM transactions;
SELECT * FROM categories;
SELECT * FROM notifications;

SELECT * FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id;

-- 1 journal
SELECT categories.groups, SUM(transactions.amount) FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE transactions.users_id = 1 AND
    categories.is_income = false AND
    transactions.journals_id = 1
    GROUP BY categories.groups
    ;

-- Multiple
SELECT categories.groups, SUM(transactions.amount), journals_id FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE transactions.users_id = 1 AND
    categories.is_income = false
    GROUP BY categories.groups, journals_id
    ORDER BY journals_id
    ;

-- Dashboard 2
SELECT * FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id;

-- first 2 charts Expense / Income by groups (current Month)
SELECT SUM(amount),groups FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE transactions.users_id = 1 AND
    categories.is_income = true AND
    journals_id = 1 AND
    date_part ('month',transactions.date) = date_part('month', NOW())
    GROUP BY categories.groups;
    
-- Monthly Expense / Income (current month)
SELECT SUM(amount),is_income FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE transactions.users_id = 1 AND
    categories.is_income = false AND
    journals_id = 1 AND
    date_part ('month',transactions.date) = date_part('month', NOW()) AND
    date_part ('year',transactions.date) = date_part('year', NOW())
    GROUP BY categories.is_income;

-- Expense / Income by groups (current year)
SELECT SUM(amount),groups FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE transactions.users_id = 1 AND
    categories.is_income = false AND
    journals_id = 1 AND
    date_part ('year',transactions.date) = date_part('year', NOW())
    GROUP BY categories.groups;;
    

-- Monthly Expense / Income of last 12 nonths --> chart json
SELECT json_agg(sum) as amount, json_agg(label) as labels
FROM (
SELECT SUM(amount), TO_CHAR(transactions.date :: DATE, 'Mon-yyyy') as label ,Date_part('month', transactions.date) as month , 
    Date_part('year', transactions.date) as year, is_income FROM  transactions JOIN categories
    ON transactions.categories_id = categories.id
    WHERE transactions.users_id = 1 AND
    categories.is_income = false AND
    journals_id = 1
    GROUP BY TO_CHAR(transactions.date :: DATE, 'Mon-yyyy'), is_income, month, year
    ORDER BY Date_part('year', transactions.date) desc, Date_part('month', transactions.date) desc
    LIMIT 12
) as a
    group by is_income


select * from categories

--  ADD DELETE MEMBER...
select * from users;
select * from users_journals;
select * from roles;

INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser)
    VALUES ('sandie','ng','sandie@s.com','Female','sandie','$2a$10$..VQyjmhGPA4KfF8taCVyeAjJZUgEbxtjaxEn4IGao.3/Hp47W6Uq',25,true);

INSERT INTO users_journals (users_id, journals_id, roles_id)
    VALUES (2,1,1)
    RETURNING id;

DELETE FROM users_journals WHERE 
    users_id = 2 AND
    journals_id = 1

Select id from users where username = 'sandie' LIMIT 1;