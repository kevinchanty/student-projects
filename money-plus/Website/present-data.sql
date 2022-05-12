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
    VALUES ('Kevin','chan','kevin@k.com','Male','Kevin','$2a$10$LJnAKeAIG2kFMfFh1BYLXup78Odqq5Mn8QE2.LMYZdboEeVN5SAwe',18,true,'Edgar Gaming.png');
INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser, image)
    VALUES ('Sandie','ng','sandie@s.com','Female','Sandie','$2a$10$..VQyjmhGPA4KfF8taCVyeAjJZUgEbxtjaxEn4IGao.3/Hp47W6Uq',25,true,'pig-bank.png');
INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser, image)
    VALUES ('Serena','s','serena@s.com','Female','Serena','$2a$10$Q1viL4X3YsAX.CSnhW53BOp/m3ygcvHvOXMeU9cgfDSQfsSHkP.ZC',25,true,'Nyan Cat.gif');
INSERT INTO users (first_name, last_name, email, gender, username, password, age, is_superuser, image)
    VALUES ('Serena','lai','serena@s.com','Female','Serena','$2a$10$Q1viL4X3YsAX.CSnhW53BOp/m3ygcvHvOXMeU9cgfDSQfsSHkP.ZC',25,true,'Nyan Cat.gif');

-- real of modules
INSERT INTO modules (name) VALUES ('Money Pool');
INSERT INTO modules (name) VALUES ('Target Achievement');

-- Real Data of rols!!!! NOT SAMPLE
INSERT INTO roles (name) VALUES ('Admin');
INSERT INTO roles (name) VALUES ('Member');

-- Sample of journals
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('Saving',2,'Save money','Save $5000 every month',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('Trip',1,'Japan Trip with friends','Share all spending during the trip',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('Household',2,'Control money flow','Save money for child education',NOW(),NOW());
INSERT INTO journals (name, modules_id, description, goals,create_at,update_at)
    VALUES ('Bussiness Team',1,'Patty cash with collegue','Whitin $1500',NOW(),NOW());

-- Sample of users_journals
INSERT INTO users_journals (users_id, journals_id)
    VALUES (1,1);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (1,2);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (1,3);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (1,4);

INSERT INTO users_journals (users_id, journals_id)
    VALUES (2,1);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (2,2);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (2,3);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (2,4);

INSERT INTO users_journals (users_id, journals_id)
    VALUES (3,1);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (3,2);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (3,3);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (3,4);

INSERT INTO users_journals (users_id, journals_id)
    VALUES (4,1);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (4,2);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (4,3);
INSERT INTO users_journals (users_id, journals_id)
    VALUES (4,4);

-- Real Data of categories (insert all)
-- utility
INSERT INTO categories (name, is_income, groups) VALUES ('phone',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('internet',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('gas',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('electricity',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('water',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('rates and government rent',false,'utility');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'utility');
 
-- home
INSERT INTO categories (name, is_income, groups) VALUES ('rent',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('mortgage',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('taxes',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('maintenance',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('property management fee',false,'home');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'home');

-- debts and loans
INSERT INTO categories (name, is_income, groups) VALUES ('credit card',false,'debts and loans');
INSERT INTO categories (name, is_income, groups) VALUES ('personal loans',false,'debts and loans');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'debts and loans');

-- food
INSERT INTO categories (name, is_income, groups) VALUES ('grocery',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('breakfast',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('lunch',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('dinner',false,'food');
INSERT INTO categories (name, is_income, groups) VALUES ('misc',false,'food');

-- shopping
INSERT INTO categories (name, is_income, groups) VALUES ('fashion',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('beauty',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('technologies',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('toys',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('gifts',false,'shopping');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'shopping');

-- transportation
INSERT INTO categories (name, is_income, groups) VALUES ('public transit',false,'transportation');
INSERT INTO categories (name, is_income, groups) VALUES ('petrol',false,'transportation');
INSERT INTO categories (name, is_income, groups) VALUES ('parking',false,'transportation');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'transportation');

-- personal
INSERT INTO categories (name, is_income, groups) VALUES ('hobbies',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('gym',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('haircuts',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('pets',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('charity',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('travel',false,'personal');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'personal');

-- healthcare
INSERT INTO categories (name, is_income, groups) VALUES ('doctor visits',false,'healthcare');
INSERT INTO categories (name, is_income, groups) VALUES ('medications',false,'healthcare');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'healthcare');

-- insurance
INSERT INTO categories (name, is_income, groups) VALUES ('life insurance',false,'insurance');
INSERT INTO categories (name, is_income, groups) VALUES ('health insurance',false,'insurance');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'insurance');

-- entertainment
INSERT INTO categories (name, is_income, groups) VALUES ('movies',false,'entertainment');
INSERT INTO categories (name, is_income, groups) VALUES ('parties',false,'entertainment');
INSERT INTO categories (name, is_income, groups) VALUES ('dates',false,'entertainment');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'entertainment');

-- education
INSERT INTO categories (name, is_income, groups) VALUES ('tuition',false,'education');
INSERT INTO categories (name, is_income, groups) VALUES ('books',false,'education');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'education');

-- vice
INSERT INTO categories (name, is_income, groups) VALUES ('alcohol',false,'vice');
INSERT INTO categories (name, is_income, groups) VALUES ('smoking',false,'vice');
INSERT INTO categories (name, is_income, groups) VALUES ('gambling',false,'vice');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'vice');

-- child expense
INSERT INTO categories (name, is_income, groups) VALUES ('childcare',false,'child expense');
INSERT INTO categories (name, is_income, groups) VALUES ('education',false,'child expense');
INSERT INTO categories (name, is_income, groups) VALUES ('others',false,'child expense');

-- income
INSERT INTO categories (is_income, groups) VALUES (true,'wages');
INSERT INTO categories (is_income, groups) VALUES (true,'passive income');
INSERT INTO categories (is_income, groups) VALUES (true,'interest');
INSERT INTO categories (is_income, groups) VALUES (true,'others');


-- Sample of TRANSACTION
-- user 1 / Journal 2
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,6,'2021-04-01',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,5,'2021-04-05',279);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,12,'2021-04-13',2344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,28,'2021-04-16',907);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,25,'2021-04-19',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,30,'2021-04-21',837);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,36,'2021-04-24',857);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,36,'2021-04-24',857);


-- user 1 / Journal 1
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,2,'2021-05-05',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,8,'2021-05-13',350);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,14,'2021-05-16',1250);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,20,'2021-05-19',890);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,26,'2021-05-21',876);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,32,'2021-05-24',456);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,38,'2021-05-27',332);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,44,'2021-05-29',557);

-- user 1 / Journal 2
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,6,'2021-06-01',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,5,'2021-06-05',279);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,12,'2021-06-13',2344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,28,'2021-06-16',907);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,25,'2021-06-19',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,30,'2021-06-21',837);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,36,'2021-06-24',857);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,42,'2021-06-27',333);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,48,'2021-06-29',783);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,56,'2021-06-30',553);


-- user 1 / Journal 1
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,2,'2021-07-05',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,8,'2021-07-13',350);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,14,'2021-07-16',1250);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,20,'2021-07-19',890);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,26,'2021-07-21',876);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,32,'2021-07-24',456);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,38,'2021-07-27',332);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,44,'2021-07-29',557);

-- user 1 / Journal 2
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,6,'2021-07-01',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,5,'2021-07-05',279);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,12,'2021-07-13',2344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,28,'2021-07-16',907);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,25,'2021-07-19',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,30,'2021-07-21',837);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,36,'2021-07-24',857);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,42,'2021-07-27',333);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,48,'2021-07-29',783);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,56,'2021-07-31',553);

-- user 1 / Journal 3
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,9,'2021-07-01',399);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,4,'2021-07-05',479);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,11,'2021-07-13',1344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,27,'2021-07-16',1407);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,26,'2021-07-19',445);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,29,'2021-07-21',337);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,35,'2021-07-24',2557);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,41,'2021-07-27',933);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,47,'2021-07-29',836);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,55,'2021-07-31',1139);

-- user 1 / Journal 4
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,9,'2021-07-01',129);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,4,'2021-07-05',379);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,11,'2021-07-13',1144);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,27,'2021-07-16',1107);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,26,'2021-07-19',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,29,'2021-07-21',237);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,35,'2021-07-24',2157);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,41,'2021-07-27',733);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,47,'2021-07-29',436);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,55,'2021-07-31',439);

-- user 1 / Journal 1
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,2,'2021-08-05',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,8,'2021-08-13',350);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,14,'2021-08-16',1250);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,20,'2021-08-19',890);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,26,'2021-08-21',876);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,32,'2021-08-24',456);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,38,'2021-08-27',332);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,44,'2021-08-29',557);

-- user 1 / Journal 2
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,6,'2021-08-01',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,5,'2021-08-05',279);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,12,'2021-08-13',2344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,28,'2021-08-16',908);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,25,'2021-08-19',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,30,'2021-08-21',837);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,36,'2021-08-24',857);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,42,'2021-08-27',333);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,48,'2021-08-29',783);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,2,56,'2021-08-31',553);

-- user 1 / Journal 3
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,9,'2021-08-01',399);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,4,'2021-08-05',479);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,11,'2021-08-13',1344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,27,'2021-08-16',1408);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,26,'2021-08-19',445);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,29,'2021-08-21',337);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,35,'2021-08-24',2557);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,41,'2021-08-27',933);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,47,'2021-08-29',836);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,3,55,'2021-08-31',1139);

-- user 1 / Journal 4
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,9,'2021-08-01',129);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,4,'2021-08-05',379);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,11,'2021-08-13',1144);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,27,'2021-08-16',1108);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,26,'2021-08-19',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,29,'2021-08-21',237);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,35,'2021-08-24',2157);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,41,'2021-08-27',733);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,47,'2021-08-29',436);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,4,55,'2021-08-31',439);


-- user 2 / Journal 1
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,2,'2021-07-01',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,8,'2021-07-05',350);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,14,'2021-07-10',1250);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,20,'2021-07-14',890);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,26,'2021-07-18',876);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,32,'2021-07-21',456);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,38,'2021-07-26',332);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,44,'2021-07-31',557);

-- user 2 / Journal 2
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,6,'2021-07-02',199);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,5,'2021-07-05',279);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,12,'2021-07-09',2344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,28,'2021-07-13',907);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,25,'2021-07-16',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,30,'2021-07-19',837);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,36,'2021-07-20',857);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,42,'2021-07-29',333);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,48,'2021-07-30',783);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,2,56,'2021-07-31',553);

-- user 2 / Journal 3
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,9,'2021-07-01',399);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,4,'2021-07-05',479);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,11,'2021-07-11',1344);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,27,'2021-07-15',1407);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,26,'2021-07-17',445);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,29,'2021-07-20',337);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,35,'2021-07-23',2557);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,41,'2021-07-26',933);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,47,'2021-07-28',836);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,3,55,'2021-07-30',1139);

-- user 2 / Journal 4
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,9,'2021-07-01',129);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,4,'2021-07-05',379);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,11,'2021-07-13',1144);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,27,'2021-07-16',1107);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,26,'2021-07-19',345);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,29,'2021-07-21',237);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,35,'2021-07-24',2157);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,41,'2021-07-27',733);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,47,'2021-07-29',436);
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,4,55,'2021-07-31',439);


-- Income
INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,59,'2021-07-28',30000);

INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,59,'2021-07-28',30000);

INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (2,1,59,'2021-08-28',28000);

INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
    VALUES (1,1,59,'2021-08-28',28000);



-- Sample of Notifications
INSERT INTO notifications (users_id, tag, title, message, create_at)
    VALUES (1,'Alert','New friend Appear','You have been invite to join the group', NOW());
INSERT INTO notifications (users_id, tag, title, message, create_at)
    VALUES (1,'Alert','New invitation','You are the group member of Bussiness Team', NOW());
INSERT INTO notifications (users_id, tag, title, message, create_at)
    VALUES (2,'Alert','New friend Appear','You have been invite to join the group', NOW());
INSERT INTO notifications (users_id, tag, title, message, create_at)
    VALUES (2,'Alert','New invitation','You are the group member of Bussiness Team', NOW());


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