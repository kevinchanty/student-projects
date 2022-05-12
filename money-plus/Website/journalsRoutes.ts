import express from 'express';
import { isLoggedInAPI } from './guard';
import {client} from './app';
// import from models.ts

export const journalsRoutes = express.Router();

let user;

journalsRoutes.post('/insertJournal',isLoggedInAPI, async (req,res) => {    
    user = req.session['user'];

    const {name, modules_id,description,goals} = await req.body;
    let result  = await client.query(`INSERT INTO journals 
    (name,modules_id,description,goals,create_at,update_at) 
    VALUES ($1,$2,$3,$4,NOW(),NOW()) returning id`,[
        name, modules_id,description,goals
    ])
    let journalID = result.rows[0].id

    await client.query(`INSERT INTO users_journals (users_id, journals_id, roles_id)
    VALUES ($1,$2,2)`, [user.id,journalID]);

    res.redirect('/home');
});

journalsRoutes.get('/getJournals', isLoggedInAPI, async function getJournals(req, res) {
    user = req.session['user'];    
    console.log(user);

    let journalResult = (await client.query(`
    SELECT journals.id as jID ,* FROM journals JOIN users_journals
    ON journals.id = users_journals.journals_id
    WHERE users_journals.users_id = $1;`,
    [user.id])).rows;
    console.log(journalResult);
    res.json(journalResult);
})