import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('chess_move', t=>{
        t.increments()
        t.integer('user_id').notNullable().references('users.id')
        t.integer('step').notNullable()
        t.timestamps(false,true)
    })

    await knex.schema.raw(`
      create or replace view user_score as (
        with user_score_tmp as (
            select
              users.id
            , (
                select
                  sum(stock_items.price)
                from purchased_items
                inner join stock_items on stock_items.id = purchased_items.item_id
                where purchased_items.user_id = users.id
            ) as spend
            , (
                select
                  sum(step)
                from chess_move
                where chess_move.user_id = users.id
                  and step > 0
            ) as forward
            , (
                select 
                  sum(step) - count(*)
                from chess_move
                where chess_move.user_id = users.id
                  and step < 0
            ) as backward
            from users
          )
          select
            id
          , forward
          , backward
          , spend
          , forward - backward - spend as remain
          from user_score_tmp
      )
    `)
    await knex.insert({user_id: 2, step: 1}).into('chess_move')
    await knex.insert({user_id: 2, step: 2}).into('chess_move')
    await knex.insert({user_id: 2, step: -1}).into('chess_move')
    await knex.insert({user_id: 2, step: 3}).into('chess_move')
}


export async function down(knex: Knex): Promise<void> {
    // await knex.schema.raw('drop view user_score');
    // await knex.schema.dropTable('chess_move')
}

