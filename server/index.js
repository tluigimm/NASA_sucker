const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");
const fetch = require("node-fetch");
const morgan = require("morgan");
const helmet = require("helmet");

const API_KEY = "Y4puG7EP9MzY7JpYeOZKMTTJlzX5DMuSQdEbkL8r";

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'db2'
});
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/login", (req, res) => {
    const u = req.body.u; 
    const p = req.body.p;
    conn.query(`SELECT * FROM user WHERE (name,pswd)=(${u},${p});`, (err, results, fields) => {
         if (err) throw err;
         res.json(results);
    });
});

app.post('/send_date', async (req, res) => {
    try{
        const d = req.body.d;
        const url = `https://api.nasa.gov/planetary/apod?date=${d}&api_key=${API_KEY}`;
        const options = {
            "method": "GET",
        };

        const respond = await fetch(url, options)
            .then(res => res.json())
            .catch(e => {
              console.error({
                "message": ":(",
                 error: e,
              });
            });
        console.log("RESPONSE: ", response)
        res.json(res);
    } catch (err) {
        console.log(err);
    }

});


app.listen(7002, async () => {
        console.log("running on port 7002!");
});

