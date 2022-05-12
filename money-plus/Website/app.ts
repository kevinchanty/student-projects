import express from 'express';
import expressSession from 'express-session';
import { format } from 'date-fns';
import ip from 'ip';
import dotenv from 'dotenv';
import {Client} from 'pg';
import grant from 'grant';
import { isLoggedIn } from './guard';
import { journalsRoutes } from './journalsRoutes'
import { notiRoutes } from './notiRoutes';
import {transactionsRoutes} from './transactionsRoutes';
import { userInfoRoutes } from './userInfoRoutes';
import { categoriesRoutes } from './categoriesRoute';
import multer from 'multer';
import path from 'path';

// import { Categories } from "./models";


// Constant
dotenv.config();
const PORT = 8080;
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/src/profile-pic'));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
})
export const upload = multer({storage});
import { loginRoutes } from './loginRoutes';

// Database Setup
export const client = new Client({
    database: process.env.DB_NAME,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
});
client.connect();

// Json,Form Set Up
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Session setup
app.use(expressSession({
    secret: "aestroid",
    resave: true,
    saveUninitialized: true,
}));

// PREPROCESS : Counter, Server Log
app.use((req, res, next) => {

    if (!req.session['counter']) {
        req.session['counter'] = 1
    } else {
        req.session['counter']++
    }
    // console.log(req);
    let stamp = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    console.log(`[${stamp}] Request ${req.path} | Session counter is ${req.session['counter']}`);
    next()
});

// Login with Google
const grantExpress = grant.express({
    "defaults":{
        "origin": "http://localhost:8080",
        "transport": "session",
        "state": true,
    },
    "google":{
        "key": process.env.GOOGLE_CLIENT_ID || "",
        "secret": process.env.GOOGLE_CLIENT_SECRET || "",
        "scope": ["profile","email"],
        "callback": "/login/google"
    }
});
app.use(grantExpress);

// Website Icon
app.use('*/favicon.ico',express.static('public/favicon.ico'))

// Login Routes
app.use ('/', loginRoutes);

//Users Info Routes
app.use('/', userInfoRoutes)

// Journals Routes
app.use ('/', journalsRoutes);

// Transactions Routes
app.use('/', transactionsRoutes);

// Notification Routes
app.use ('/', notiRoutes);

// Categories Route
app.use ('/', categoriesRoutes)

// Static Content
app.use(express.static('public'));
app.use(isLoggedIn,express.static('protected'));

app.listen(PORT, () =>{
    console.log(`Listening at http://${ip.address()}:${PORT}`);
});

