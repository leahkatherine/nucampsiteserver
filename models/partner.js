const mongoose = require('mongoose');
const Schema = mongoose.Schema; //create a variable to hold a reference to the Mongoose schema constructor function

const partnerSchema = new Schema({
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
 //create a new Mongoose schema named partnerSchema

const Partner = mongoose.model('Partner', partnerSchema); //create a model named Partner from the partnerSchema


module.exports = Partner; //export the Partner model from this module