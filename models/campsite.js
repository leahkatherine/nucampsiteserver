const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); //load the currency type into mongoose
const Currency = mongoose.Types.Currency;//create a constant for the currency type

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //this will store a reference to a user document in the User collection
        ref:'User'
    }
}, {
    timestamps: true
});

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    elevation : {
        type: Number,
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false  
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;