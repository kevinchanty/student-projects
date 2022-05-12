## How to Create User in PSQL:
```SQL
create user user_name with encrypted password 'mypassword';
grant all privileges on database sample_db to user_name;
```

## How to Make a New Knex Seed:
``` 
yarn knex seed:make -x ts name-of-the-seed
```

## Run Knex Seed:

```
yarn runseed
```

## Knex Migragtion:
Run to latest:
```
yarn latest
```

Rollback last batch:
```
yarn rollback
```
Move up or down 1 migration:
```
yarn knex migrate:up
yarn knex migrate:down
```

Original command:
```
yarn knex seed:run
yarn knex migrate:latest
yarn knex migrate:rollback
```

## Knex Cheat Sheet:
https://devhints.io/knex

## Placeholder Image
"https://picsum.photos/300"