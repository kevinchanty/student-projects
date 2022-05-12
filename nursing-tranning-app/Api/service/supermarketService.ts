import { Knex } from "knex";
import { StockItems, PurchasedItems } from "./model";

export class SupermarketService {
    constructor(private knex: Knex) { }

    //done
    async getStockItems() {
        try {
            const result = await this.knex
                .select("*")
                .from("stock_items")
                .where("is_supermarket", true);
            return result;
        } catch (e) {
            return e;
        }
    }

    //done
    async postPurchaseItems(item_id: number, user_id: any) {
        return this.knex.transaction(async knex => {

            const stock_items = await knex
                .select("*")
                .from("stock_items")
                .where("id", item_id)
                .first()

            const user = await knex
                .select("*")
                .from("users")
                .where("id", user_id)
                .first();


            if (
                user.score < stock_items.price
            ) {
                throw new Error("You're poor guy!!")
            } else {
                await knex.insert({
                    user_id: user_id,
                    item_id: stock_items.id,
                    purchase_at: new Date(),
                })
                    .into("purchased_items");
            }

            const newScore = user.score - stock_items.price;
            const newIndex =
                user.glycemic_index + stock_items.glycemic_index;

            await knex("users").where("id", user_id).update({
                score: newScore,
                glycemic_index: newIndex,
            });

            let newUserInfo = await knex
                .select("*")
                .from("users")
                .where("id", user_id)
                .first();

            return newUserInfo;

        })
    }
}
