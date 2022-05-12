import { Knex } from "knex";


export class MyBagService {
    constructor(private knex: Knex) { }

    async getSupermarketPurchased(userId: number) {
        const result = await this.knex
            .select("*")
            .from("purchased_items")
            .innerJoin("stock_items", "stock_items.id", "purchased_items.item_id")
            .where("purchased_items.user_id", userId)
            .andWhere("stock_items.is_supermarket", true);
        return result;

    }

    async getGymPurchased(userId: number) {
        const result = await this.knex
            .select("*")
            .from("purchased_items")
            .innerJoin("stock_items", "stock_items.id", "purchased_items.item_id")
            .where("purchased_items.user_id", userId)
            .andWhere("stock_items.is_gym", true);
        return result;

    }


}