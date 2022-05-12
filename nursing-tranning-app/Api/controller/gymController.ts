import { Request, Response } from "express";
import { GymService } from "../service/gymService";

export class GymController {
    constructor(private gymService: GymService) { }

    getStockItems = async (req: Request, res: Response) => {
        try {
            let result = await this.gymService.getStockItems();
            res.json(result);
            return
        } catch (e) {
            res.status(500).json({ message: "Internal Server Error" });
            return
        }
    };

    postPurchaseItems = async (req: Request, res: Response) => {
        let item_id = +req.params.item_id
        const userId = req.user.id

        if(!item_id){
            res.status(400).json({error:'missing item_id in req.params'})
            return
        }
        try {
            let result = await this.gymService.postPurchaseItems(item_id, userId);
            res.json(result);
            return;
        } catch (e) {
            console.error('postPurchaseItems error:', e)
            res.status(500).json({error:e.toString()});
            return
        }
    };

}
