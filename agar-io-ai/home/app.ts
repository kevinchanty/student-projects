import express from 'express';
import expressSession from 'express-session';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/home', function (req, res) {
    res.end('Don Don Don Donki!!')
})

app.use(expressSession({
    secret: "Donkintelligence",
    resave: true,
    saveUninitialized: true
}))

app.post('home', (req, res) => {
    res.redirect('/home/public/index.html')
})

app.use(express.static('./public'));

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
})