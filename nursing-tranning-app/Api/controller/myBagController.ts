import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { MyBagService } from "../service/myBagService";
import { Decode } from "./userController";

export class MyBagController {

    constructor(private myBagService: MyBagService) { }

    getSupermarketPurchased = async (req: Request, res: Response) => {
        const user = req.user;
        try {
            let result = await this.myBagService.getSupermarketPurchased(user.id);
            res.json(result);
            return
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: (e as Error).toString() });
            return
        }
    }

    getGymPurchased = async (req: Request, res: Response) => {
        const user = req.user;
        try {
            let result = await this.myBagService.getGymPurchased(user.id);
            res.json(result);
            return
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: (e as Error).toString() });
            return
        }
    }
}