const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        description: "Food ID",
        unique: true 
    },
    name: {
        type: String,
        required: true,
        description: "Food Name"
    },
    foodGroup: {
        type: String,
        description: "Food Group or Category"
    },
    description: {
        type: String,
        description: "Description"
    },
    calories: {
        type: Number,
        description: "Calories"
    },
    macronutrients: {
        type: String,
        description: "Macronutrients"
    },
    micronutrients: {
        type: String,
        description: "Micronutrients"
    },
    fiber: {
        type: String,
        description: "Fiber"
    },
    sodium: {
        type: String,
        description: "Sodium"
    },
    cholesterol: {
        type: String,
        description: "Cholesterol"
    },
    servingSize: {
        type: String,
        description: "Serving Size"
    },
    allergens: {
        type: String,
        description: "Allergens"
    },
    ingredients: {
        type: String,
        description: "Ingredients"
    },
    preparationMethods: {
        type: String,
        description: "Preparation Methods"
    },
    certifications: {
        type: String,
        description: "Certifications"
    },
    countryOfOrigin: {
        type: String,
        description: "Country of Origin"
    },
    brandManufacturer: {
        type: String,
        description: "Brand or Manufacturer"
    },
    dietaryRestrictions: {
        type: String,
        description: "Dietary Restrictions"
    },
    healthBenefits: {
        type: String,
        description: "Health Benefits"
    },
    bestPractices: {
        type: String,
        description: "Best Practices"
    }
});

const FoodItems = mongoose.model('FoodItems', FoodItemSchema);

module.exports = { FoodItems };
