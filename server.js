const port = 3000;
const url = "http://localhost:" + port;

const path = require("path");
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, "app")));
app.use("/", express.static(path.join(__dirname, "app/views")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const router = require('./app/controllers/router');

app.use(router);

app.listen(port, () => {
    console.log('Practice #4');
});
