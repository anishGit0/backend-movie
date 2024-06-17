const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("MY app is here");
})

const moviesRouter = require('./routes/movie.js');
const usersRouter = require('./routes/users.js');
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});