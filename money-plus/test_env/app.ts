import express from 'express';

const PORT = 4200;
const app = express();

//Static
app.use(express.static('public'));

app.listen(PORT);
// Group Project📁🗃🗞📰