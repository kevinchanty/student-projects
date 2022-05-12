import express from "express";
import { client, upload } from "./app";
import { Users } from "./models";
// import { isLoggedIn } from "./guard";
import crypto from "crypto";
import fetch from 'node-fetch';
import { isLoggedInAPI } from "./guard";
import { checkPassword, hashPassword } from "./hash";

export const loginRoutes = express.Router();


// create new users, insert to sever side
loginRoutes.post('/users', upload.single('image'), async (req, res) => {

    console.log(req.body);
    const { first_name, last_name, email, gender, username, password, age } = await req.body;
    await client.query(`INSERT INTO users (first_name, last_name, email, gender, username, password, age, image) 
    values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`, [
        first_name, last_name, email, gender, username, await hashPassword(password), age, req.file?.filename
    ]);

    let users: Users[] = (await client.query(`SELECT * from users WHERE username = $1`,
        [username])).rows;
    const user = users[0];
    req.session['user'] = user;


    res.redirect('/home');
})


// usual login with username & password
loginRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let users: Users[] = (await client.query(`SELECT * from users WHERE username = $1`,
        [username])).rows;

    const user = users[0];


    if (user && await checkPassword(password, user.password)) {
        req.session['user'] = user;
        console.log(req.session['user']);


        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, msg: "Invalid Username/Password. Please try again!" });
    }
});


// route of redirected from google and grant
loginRoutes.get('/login/google', async (req, res) => {
    const accessToken = req.session?.['grant'].response.access_token;
    console.log(accessToken);

    const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    const userInfo = await fetchRes.json();

    let sessionUsers = (await client.query(`SELECT * from users WHERE username = $1`,
        [userInfo.email])).rows;
    console.log(userInfo);

    let sessionUser = sessionUsers[0];
    console.log(sessionUser);

    if (!sessionUser) {
        const randomPassword = crypto.randomBytes(20).toString('hex');
        const result = await client.query('INSERT INTO users (username, password) VALUES ($1,$2) returning id',
            [userInfo.email, randomPassword]);
        sessionUser = {
            username: userInfo.email,
            password: randomPassword,
            id: result.rows[0].id,
        };
    }
    req.session['user'] = sessionUser;
    res.status(200).redirect('/home');
});

// logout
loginRoutes.get('/logout', async (req, res) => {
    delete req.session['user'];
    res.redirect('/');
});

// One Click Debug Login
loginRoutes.get('/devLogin', async (req, res) => {
    const username = req.query.u;
    const password = req.query.p;

    console.log(username, password);


    let users: Users[] = (await client.query(`SELECT * from users WHERE username = $1`,
        [username])).rows;

    const user = users[0];

    if (user && user.password === password) {
        req.session['user'] = user;
        console.log(req.session['user']);


        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, msg: "Invalid Username/Password. Please try again!" });
    }

})

loginRoutes.get('/userIcon', isLoggedInAPI,  function getUser(req, res) {
    let result =  req.session['user'];
    res.json({
        username: result.username,
        image: result.image
    });

    // console.log(result.username);
    // console.log(result.id);    
})
