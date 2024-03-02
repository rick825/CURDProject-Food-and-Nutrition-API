const express = require("express");
const controller = require("../controller/controller");
const route = express.Router();
const { FoodItems } = require("../model/model");

//index
route.get("/", (req, res) => {
    console.log("Home page");
    res.render("index.html");
});

//add-food
route.get("/addfood", (req, res) => {
    console.log("Add Food Page");
    res.redirect("addfood.html");
});

//update-food
route.get("/updateFood/:ID:name", async(req,res)=>{
     const { ID,name } = req.params;
     let foodItem= await FoodItems.findOne({ID:ID});
     if(!foodItem){
        return res.send('No such item found');
     }

     res.redirect(`/updatefood.html?ID=${ID}&Name=${encodeURIComponent(name)}`);
});

//delete-food
route.get("/api/deleteitem/:ID",controller.deleteItem);

//get specific items
route.get("/food/:ID",(req,res)=>{
    const { ID } = req.params;
    console.log("Getting a Specific Food Item",ID);
})

//get all items
route.get("/api/foods", async (req, res) => {
    try {
        const food = await FoodItems.find().sort({ ID: 1 });
        console.log(food);
        res.json(food);
    } catch (error) {
        console.log(`Error while getting`, error);
        res.status(500).json({ error: "Internal Server error" });
    }
});

// post
route.post("/api/addnewitem", controller.addItem);
route.post("/api/updateitem/:ID",controller.updateItem);
route.get("/api/fetchJson",controller.fetchData);


module.exports = route;
