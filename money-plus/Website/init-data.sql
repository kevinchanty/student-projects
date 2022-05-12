-- SELECT all from TABLES
SELECT * FROM users;
SELECT * FROM modules;
SELECT * FROM journals;
SELECT * FROM roles;
SELECT * FROM users_journals;
SELECT * FROM transactions;
SELECT * FROM categories;
SELECT * FROM notifications;

-- Sample of users
INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser, image)
    VALUES ('kevin','chan','kevin@k.com','Male','kevin','$2a$10$LJnAKeAIG2kFMfFh1BYLXup78Odqq5Mn8QE2.LMYZdboEeVN5SAwe',18,true,'Edgar Gaming.png');
INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser, image)
    VALUES ('sandie','ng','sandie@s.com','Female','sandie','$2a$10$..VQyjmhGPA4KfF8taCVyeAjJZUgEbxtjaxEn4IGao.3/Hp47W6Uq',25,true,'pig-bank.png');
INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser, image)
    VALUES ('serena','s','serena@s.com','Female','serena','$2a$10$Q1viL4X3YsAX.CSnhW53BOp/m3ygcvHvOXMeU9cgfDSQfsSHkP.ZC',25,true,'Nyan Cat.gif');
INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser, image)
    VALUES ('serena','lai','serena@s.com','Female','serenal','$2a$10$Q1viL4X3YsAX.CSnhW53BOp/m3ygcvHvOXMeU9cgfDSQfsSHkP.ZC',25,true,'Nyan Cat.gif');



-- Sample of modules
INSERT INTO modules (name) VALUES ('Money Pool');
INSERT INTO modules (name) VALUES ('Target Achievement');

-- Real Data of rols!!!! NOT SAMPLE
INSERT INTO roles (name) VALUES ('Admin');
INSERT INTO roles (name) VALUES ('Member');

-- Sample of journals
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('LAM_TIN',1,'My home, my family.','Survive through COVID-19',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('SHA_TIN',1,'My home, my family.','Survive through COVID-19',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('SUM_TIN',2,'My home, my family.','Survive through COVID-19',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('SIU_TIN',1,'My home, my family.','Survive through COVID-19',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('TIN_TIN',2,'My home, my family.','Survive through COVID-19',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('TIN_TIN',2,'My home, my family.','Survive through COVID-19',NOW(),NOW());

INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('HOME Sweet HOME',2,'1st Bucket of Gold','Financial free',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('Travel Around the World',1,'Around the World','no goals',NOW(),NOW());

-- Sample of users_journals
INSERT INTO users_journals (users_id, journals_id)
    VALUES (1,2);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (2,5);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (1,3);

INSERT INTO users_journals (users_id, journals_id)
    VALUES (4,1);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (4,2);

-- Sample of categories
INSERT INTO categories (name, is_income, groups) VALUES ('phone',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('internet',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('gas',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('electricity',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('water',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('rates and government rent',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'utility');


INSERT INTO categories (name, is_income, groups) VALUES ('rent',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('mortgage',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('taxes',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('maintenance',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('property management fee',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'home');


INSERT INTO categories (name, is_income, groups) VALUES ('credit card',false,'debts and loans');
INSERT INTO categories (name, is_income, groups) VALUES ('personal loans',false,'debts and loans');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'debts and loans');


INSERT INTO categories (name, is_income, groups) VALUES ('grocery',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('breakfast',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('lunch',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('dinner',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('misc',false,'food');


INSERT INTO categories (name, is_income, groups) VALUES ('fashion',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('beauty',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('technologies',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('toys',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('gifts',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'shopping');


INSERT INTO categories (name, is_income, groups) VALUES ('public transit',false,'transportation');
INSERT INTO categories (name, is_income, groups) VALUES ('petrol',false,'transportation');
INSERT INTO categories (name, is_income, groups) VALUES ('parking',false,'transportation');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'transportation');


INSERT INTO categories (name, is_income, groups) VALUES ('hobbies',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('gym',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('haircuts',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('pets',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('charity',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('travel',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'personal');


INSERT INTO categories (name, is_income, groups) VALUES ('doctor visits',false,'healthcare');
INSERT INTO categories (name, is_income, groups) VALUES ('medications',false,'healthcare');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'healthcare');


INSERT INTO categories (name, is_income, groups) VALUES ('life insurance',false,'insurance');
INSERT INTO categories (name, is_income, groups) VALUES ('health insurance',false,'insurance');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'insurance');


INSERT INTO categories (name, is_income, groups) VALUES ('movies',false,'entertainment');
INSERT INTO categories (name, is_income, groups) VALUES ('parties',false,'entertainment');
INSERT INTO categories (name, is_income, groups) VALUES ('dates',false,'entertainment');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'entertainment');


INSERT INTO categories (name, is_income, groups) VALUES ('tuition',false,'education');
INSERT INTO categories (name, is_income, groups) VALUES ('books',false,'education');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'education');


INSERT INTO categories (name, is_income, groups) VALUES ('alcohol',false,'vice');
INSERT INTO categories (name, is_income, groups) VALUES ('smoking',false,'vice');
INSERT INTO categories (name, is_income, groups) VALUES ('gambling',false,'vice');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'vice');


INSERT INTO categories (name, is_income, groups) VALUES ('childcare',false,'child expense');
INSERT INTO categories (name, is_income, groups) VALUES ('education',false,'child expense');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'child expense');

INSERT INTO categories (is_income, groups) VALUES (true,'wages');
INSERT INTO categories (is_income, groups) VALUES (true,'passive income');
INSERT INTO categories (is_income, groups) VALUES (true,'interest');
INSERT INTO categories (is_income, groups) VALUES (true,'others');



-- Sample of TRANSACTION
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,1,'2021-08-05',123);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,1,'2021-08-28',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (3,1,2,'2021-08-08',123);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (3,2,1,'2021-08-18',800);

INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (4,1,1,'2021-08-05',123);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (4,2,1,'2021-08-28',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (4,1,2,'2021-08-08',123);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (4,2,18,'2021-08-18',800);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (4,2,62,'2021-08-20',300);

INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,1,'2021-08-05',123);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,1,'2021-06-28',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,1,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,2,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,3,'2021-06-05',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,1,'2021-06-28',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,7,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,11,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,12,'2021-06-05',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,13,'2021-06-28',333);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,14,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,24,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,15,'2021-06-05',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,16,'2021-06-28',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,5,17,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,28,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,19,'2021-06-05',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,10,'2021-06-28',2400);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,21,'2021-06-28',1234);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,24,'2021-06-28',4);
-- Income
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,59,'2021-08-28',4000);

-- Sample of Notifications
INSERT INTO notifications (users_id, tag, title, message, create_at)
    VALUES (1,'Alert','New Cat Appears','You have to join the newest cat meme group', NOW());
INSERT INTO notifications (users_id, tag, title, message, create_at)
    VALUES (2,'Alert','New Cat Appears','You have to join the newest cat mems', NOW());
INSERT INTO notifications (users_id, tag, title, message, create_at)
    VALUES (2,'BAD','New DOG Appears','You have to join the newest cat mems', NOW());




-- Example only'
SELECT users.username,journals.* from users
    inner join users_journals on users_journals.users_id = users.id
    inner join journals on users_journals.journals_id = journals.id
    where users.username = 'kevin';

-- Lecture example
SELECE memos.* from user
    inner join likes on likes.user_id = users.id
    inner join memos on likes.memo_id = memos.id
    where users.username = 'gordon@tecky.io';

--test
INSERT INTO users (first_name, last_name, email, gender, username, password) 
        values ('k','k','k@k.com',true,'ooo','k') returning id 
DELETE FROM users WHERE username like 'serena@gmail.com';


DELETE FROM categories where description like 'Rent';

-- 勁野！recommended by Gordon
SELECT groups, json_agg(categories.name) as name, json_agg(id) as ID FROM categories group by groups;

SELECT description from categories where name = 'Utility';

SELECT name from categories where groups = 'Utility';

SELECT groups FROM categories WHERE is_income = TRUE;

SELECT groups FROM categories WHERE is_income = FALSE;

TRUNCATE table transactions;
TRUNCATE table categories;
TRUNCATE table users;


SELECT categories.groups,sum(amount) FROM transactions inner join categories 
    on transactions.categories_id = categories.id
    where categories.is_income = false
    group by categories.groups;

SELECT categories.groups,sum(amount) FROM transactions inner join categories 
    on transactions.categories_id = categories.id
    where categories.is_income = true
    group by categories.groups;

SELECT * FROM transactions 
    right join categories on transactions.categories_id = categories.id;
SELECT json_agg(categories.is_income),groups FROM categories WHERE is_income = true group by groups;


-- (Kevin) newTxn test

-- /category-item/:type
SELECT DISTINCT groups FROM categories 
    WHERE is_income = false;

-- /category-descriptions/:type'
SELECT json_agg(name) FROM categories
    WHERE groups = 'utility'
    GROUP BY groups;

SELECT json_agg(categories.groups),groups FROM categories 
    WHERE is_income = false 
    group by groups;

SELECT json_agg(categories.groups),groups
    FROM categories
    WHERE is_income = false 
    group by groups
    ORDER BY ASC;

SELECT * FROM categories;

SELECT DISTINCT groups FROM categories 
    WHERE is_income = false;

SELECT json_agg(DISTINCT groups) FROM categories
    WHERE is_income = false
    GROUP BY is_income;

SELECT * FROM transactions JOIN categories
    ON transactions.categories_id = categories.id
    WHERE users_id = 4