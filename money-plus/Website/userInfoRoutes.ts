import express from 'express';
import { client } from "./app";
import { isLoggedInAPI } from './guard';

export const userInfoRoutes = express.Router();

userInfoRoutes.get('/userJournals', isLoggedInAPI, async (req, res) => {
    const user = req.session['user']
    const result = (await client.query(`SELECT json_agg(journals.name) as name, json_agg(journals.id) as id FROM users_journals JOIN journals 
    ON users_journals.journals_id = journals.id
    WHERE users_id = $1
    GROUP BY users_id`, [user.id])).rows

    if (result.length = 1) {
        res.json(result[0])
    } else {
        res.status(500).json({ "success": false })
    }
});

// userInfoRoutes.get('/user-id/:name', async (req,res) => {
//     const name = req.params.name;
//     const result = (await client.query(`Select id from users where username = $1 LIMIT 1`, [name])).rows[0].id;
//     res.end(result.toString());
// })

// Add member to Journals
userInfoRoutes.post('/journal-member', async (req, res) => {
    try{
        const { user, journal } = req.body;
        const userID = (await client.query(`Select id from users where username = $1 LIMIT 1`, [user])).rows[0].id;
    
        const result = (await client.query(`INSERT INTO users_journals (users_id, journals_id, roles_id)
        VALUES ($1,$2,$3) RETURNING id`, [userID, journal, 2]));
        if (result.rows.length === 1) {
            res.status(200).json({ success: true, msg:`${user} is added to journal` })
        } else {
            res.status(501).json({ success: false , msg: "Incorrect username"})
        }
    } catch {
        res.status(501).json({ success: false, msg: "Incorrect username" })
    }

})
