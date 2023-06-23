"use strict";

const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());
app.use(express.static("public"));
app.use(express.json());
const fsp = require("fs/promises");

app.get("/data", async (req, res) => {
    try {
        let resp = await fsp.readFile("data/data.json", "utf8");
        resp = await JSON.parse(resp);
        res.type("json");
        res.send(resp);
    }
    catch(error) {
        res.status(500).send("Error in fetching data.");
    }
});

app.get("/cart", async (req, res) => {
    try {
        let resp = await fsp.readFile("data/cart.json", "utf8");
        resp = await JSON.parse(resp);
        res.type("json");
        res.send(resp);
    }
    catch(error) {
        res.status(500).send("Error in fetching data.");
    }
});
app.get("/review", async (req, res) => {
    try {
        let resp = await fsp.readFile("data/review.json", "utf8");
        resp = await JSON.parse(resp);
        res.type("json");
        res.send(resp);
    }
    catch(error) {
        res.status(500).send("Error in fetching data.");
    }
});

app.post("/addToCart", async (req, res) => {
    let product_name = req.body.name;
    let product_size = req.body.size;
    let product_color = req.body.color;
    let product_image = req.body.image;
    let product_price = req.body.price;
    if (!(product_name && product_size && product_color && product_image && product_price)) {
        res.type("text");
        res.status(400).send("Did not pass in product information.");
        return;
    }
    try {
        let resp = await fsp.readFile("data/cart.json", "utf8");
        resp = JSON.parse(resp);
        let data = {"name": product_name, "size": product_size, "color": product_color,
                    "image": product_image, "price": product_price};
        resp.push(data);
        await fsp.writeFile("data/cart.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been added to cart!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});

app.post("/addToContact", async (req, res) => {
    let contact_name = req.body.name;
    let contact_date = req.body.date;
    let contact_info = req.body.info;
    if (!(contact_name && contact_date && contact_info)) {
        res.type("text");
        res.status(400).send("Did not pass in contact information.");
        return;
    }
    try {
        let resp = await fsp.readFile("data/contact.json", "utf8");
        resp = JSON.parse(resp);
        let data = {"name": contact_name, "date": contact_date, "info": contact_info};
        resp.push(data);
        await fsp.writeFile("data/contact.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Your information has been sent!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});

app.post("/removeCart", async (req, res) => {
    let product_name = req.body.name;
    let product_color = req.body.color;
    let product_size = req.body.size;

    if (!(product_name && product_size && product_color)) {
        res.type("text");
        res.status(400).send("Did not pass in product information.");
        return;
    }
    try {
        let resp = await fsp.readFile("data/cart.json", "utf8");
        resp = JSON.parse(resp);
        let data = [product_name, product_size, product_color];
        for (let i = 0; i < resp.length; i++) {
            if(resp[i]["name"] == data[0] && resp[i]["size"] == data[1] && resp[i]["color"] == data[2]) {
                resp.splice(i, 1);
            }
        }
        await fsp.writeFile("data/cart.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been removed from cart!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});

app.post("/addToReviews", async (req, res) => {
    let review_name = req.body.name;
    let review_clothing = req.body.clothing;
    let review_desc = req.body.review;
    if (!(review_name && review_clothing && review_desc)) {
        res.type("text");
        res.status(400).send("Did not pass in review information.");
    }
    try {
        let resp = await fsp.readFile("data/review.json", "utf8");
        resp = await JSON.parse(resp);
        resp.push({"name": review_name, "clothing": review_clothing, "review": review_desc});
        await fsp.writeFile("data/review.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been added to review page!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});


const PORT = process.env.PORT || 8000;
app.listen(PORT);