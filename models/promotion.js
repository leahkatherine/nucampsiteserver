const mongoose = require('mongoose');
const Schema = mongoose.Schema; //create a variable to hold a reference to the Mongoose schema constructor function

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true //this field must be unique
    },
    image:{
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false  
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
 //create a new Mongoose schema named promotionSchema

const Promotions = mongoose.model('Promotion', promotionSchema); //create a model named Partner from the promotionSchema


module.exports = Promotions; //export the Partner model from this module