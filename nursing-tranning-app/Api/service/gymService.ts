import { Knex } from "knex";
import { Users, PurchasedItems, StockItems } from "./model";

export class GymService {
  constructor(private knex: Knex) { }

  async getStockItems() {
    const result = await this.knex
      .select("*")
      .from("stock_items")
      .where("is_gym", true);
    return result;
  }

  async postPurchaseItems(buyItemsId: number, userId: any) {

    let gymMaxQuota = 2;
    let DAY = 1000 * 60 * 60 * 24;
    let now = new Date().getTime();
    let yesterday = new Date(now - DAY);

    //get stock_item information  
    // new SQL
    let stockItems = await this.knex
      .select("*")
      .from("stock_items")
      .where("id", buyItemsId)
      .first()

    // get user information
    let student = await this.knex
      .select("*")
      .from("users")
      .where("id", userId)
      .first();

    //count purchase in past 24 hours
    const row = await this.knex
      .count("* as count")
      .from("purchased_items")
      .where("purchase_at", ">=", yesterday)
      .innerJoin(
        "stock_items",
        "stock_items.id",
        "purchased_items.item_id"
      )
      .andWhere("stock_items.is_gym", true)
      .first();

    const txn = await this.knex.transaction();

    if (
      +row!.count >= gymMaxQuota ||
      +student.glycemic_index < stockItems.glycemic_index
    ) {
      throw new Error("You're out of daily gym quota / calories");
    } else {
      await txn
        .insert({
          user_id: userId,
          item_id: stockItems.id,
          purchase_at: new Date(),
        })
        .into("purchased_items");
    }


    const newIndex = student.glycemic_index - stockItems.glycemic_index


    await this.knex("users").where("id", userId)
      .update({ glycemic_index: newIndex })


    let newStudentInfo = await this.knex
      .select("*")
      .from("users")
      .where("id", userId)
      .first();

    return newStudentInfo;

  }

  // async updateInfo(user_id: number, stock_items: StockItems) {
  //     return await this.knex.transaction(async (txn) => {
  //         let student = await txn
  //             .select(
  //                 "id",
  //                 "username",
  //                 "score",
  //                 "glycemic_index",
  //                 "finished_all_mc",
  //                 "biography",
  //                 "is_poly",
  //                 "gym_quota"
  //             )
  //             .from("users")
  //             .where("id", user_id)
  //             .first();

  //         // const newScore = student.score - stock_items.price;

  //         // console.log("new score: ", student.score, "->", newScore);
  //         // console.log("new index: ", student.glycemic_index, "->", newIndex);



  //     });
  // }

}

// GymService.job.start()

/*

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


select
  sum(stock_items.price)
from purchased_items
where purchased_items.user_id = users.id
inner join stock_items on stock_items.id = purchased_items.item_id


// if move forward N step, + N coin
// if move backend M step, - (M-1) coin

 */