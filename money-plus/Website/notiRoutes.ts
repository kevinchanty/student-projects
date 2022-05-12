import express from 'express';
import { isLoggedInAPI } from './guard';
import { client } from './app'
// import { format } from "date-fns";

export const notiRoutes = express.Router();


notiRoutes.get('/noti', isLoggedInAPI, async (req, res) => {
    const user = req.session['user'];
    console.log(user);
    
    let notis = (await client.query(`SELECT * from notifications WHERE users_id = $1`, [user.id])).rows
    // let stamp = format(`${notis.create_at}`, "yyyy-MM-dd HH:mm:ss")
    res.json(notis);
    console.log(notis);

})


