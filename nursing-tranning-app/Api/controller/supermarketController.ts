import { Request, Response } from "express";
import { SupermarketService } from "../service/supermarketService";

export class SupermarketController {
    constructor(private supermarketService: SupermarketService) {}

    getStockItems = async (req: Request, res: Response) => {
        try {
            let result = await this.supermarketService.getStockItems();
            res.json(result);
            return
        } catch (e) {
            res.status(500).json({message: "Internal Server Error"});
            return
        }
    };
    
    postPurchaseItems = async (req: Request, res: Response) => {
        const userId = req.user.id;
        let item_id = +req.params.item_id
        if(!item_id){
            res.status(400).json({error:'missing item_id in req.params'})
            return
        }
        try {
            let user = await this.supermarketService.postPurchaseItems(item_id, userId);
            res.json(user);
            return
        } catch (e) {
            console.error('postPurchaseItems error:', e)
            res.status(500).json({error:e.toString()});
            return
        }

    };
}
