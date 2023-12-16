"use strict";

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());
const fsp = require("fs/promises");

app.get("/data", async (req, res) => {
    try {
        let resp = await fsp.readFile("public/data.json", "utf8");
        resp = await JSON.parse(resp);
        res.type("json");
        res.send(resp);
    }
    catch(error) {
        res.status(500).send("Error in fetching data.");
    }
});

app.get("/info", async (req, res) => {
    try {
        res.type("text");
        res.send("For more information on Caltech Houses, click here to visit the Caltech Housing website.");
    }
    catch(error) {
        res.status(400).send("Error in fetching data.");
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);