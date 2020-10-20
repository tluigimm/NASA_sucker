const express = require('express');
const mysql = require("mysql");
const fetch = require("node-fetch");

const API_KEY = "Y4puG7EP9MzY7JpYeOZKMTTJlzX5DMuSQdEbkL8r";

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'db2'
});
const app = express();

//app.get("/", (req, res) => {
//   conn.query('SELECT * FROM user', (err, results, fields) => {
//        if (err) throw err;
//        res.json(results);
//    });
//});

app.get('/fetch_image', async (req, res) => {
    const url = `https://api.nasa.gov/planetary/apod?date=2020-10-18&api_key=${API_KEY}`;
    const options = {
        "method": "GET",
    };
    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(e => {
          console.error({
            "message": ":(",
             error: e,
          });
        });
    console.log("RESPONSE: ", response);
    res.json(response);
});


app.listen(7000, () => {
        console.log("running on port 7000!");
});

