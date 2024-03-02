const { FoodItems } = require('../model/model');
const axios = require('axios');

exports.addItem = async (req, res) => {
    try {
        const lastItem = await FoodItems.findOne().sort({ ID: -1 });
        const ID = lastItem ? lastItem.ID + 1 : 1;

        const {
            name,
            foodGroup,
            description,
            calories,
            macronutrients,
            micronutrients,
            fiber,
            sodium,
            cholesterol,
            servingSize,
            allergens,
            ingredients,
            preparationMethods,
            certifications,
            countryOfOrigin,
            brandManufacturer,
            dietaryRestrictions,
            healthBenefits,
            bestPractices
        } = req.body;

        const food = new FoodItems({
            ID,
            name,
            foodGroup,
            description,
            calories,
            macronutrients,
            micronutrients,
            fiber,
            sodium,
            cholesterol,
            servingSize,
            allergens,
            ingredients,
            preparationMethods,
            certifications,
            countryOfOrigin,
            brandManufacturer,
            dietaryRestrictions,
            healthBenefits,
            bestPractices
        });

        console.log("Food-->", food);

        const savedFood = await food.save();

        console.log("Food Saved Successfully-->", savedFood);

        res.redirect('/');
    } catch (error) {
        console.error("Error saving food--->", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.fetchData = async (req,res) =>{
    try {
        const response = await axios.get('https://api.npoint.io/65508205158218eced15');
        const foods = response.data; 
    
        await FoodItems.insertMany(foods);
        
        console.log('Data is fetched inserted into MongoDB successfully!');
        res.render('/');
      } catch (error) {
        console.error('Error fetching or storing data:', error.message);
      } 
}

exports.updateItem = async (req, res) => {
    try {
        const { ID } = req.params;
        const existingFoodItem = await FoodItems.findOne({ ID: ID });

        if (!existingFoodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        const allowedFields = [
            'name',
            'foodGroup',
            'description',
            'calories',
            'macronutrients',
            'micronutrients',
            'fiber',
            'sodium',
            'cholesterol',
            'servingSize',
            'allergens',
            'ingredients',
            'preparationMethods',
            'certifications',
            'countryOfOrigin',
            'brandManufacturer',
            'dietaryRestrictions',
            'healthBenefits',
            'bestPractices'
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== "" && req.body[field] != undefined ) {
                existingFoodItem[field] = req.body[field];
            }
        });

        const updatedFoodItem = await existingFoodItem.save();

        console.log("Food Updated Successfully-->", updatedFoodItem);

        res.redirect('/');
    } catch (error) {
        console.error("Error updating food item--->", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.deleteItem = async (req,res)=>{
    try {
        const {ID} = req.params;

        const  existingFoodItem = await FoodItems.findOneAndDelete({ID:ID});
        if (!existingFoodItem){
            return res.status(404).json({ error: 'Food item not found' });
        }
        
        console.log("Food Item  Deleted Successfully",existingFoodItem);
        await reorganizeIDs();
        res.redirect('/')
    } catch (error) {
        console.log("Error deleting item--->", error);
        res.status(500).json({error:"Internal Server Error"});
    }
      
}


const reorganizeIDs = async () => {
    try {
     
        const allFoodItems = await FoodItems.find().sort({ ID: 1 });

        for (let i = 0; i < allFoodItems.length; i++) {
            const currentID = i + 1;
            const foodItem = allFoodItems[i];

            if (foodItem.ID !== currentID) {
                foodItem.ID = currentID;
                await foodItem.save();
            }
        }

        console.log("IDs Reorganized Successfully");
    } catch (error) {
        console.error("Error reorganizing IDs--->", error);
        throw error;
    }
};