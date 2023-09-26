const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ //simple schema for user 
    admin: {
        type: Boolean, 
        default: false
    }
});

userSchema.plugin(passportLocalMongoose); //this will automatically add a username and hashed password field to the schema
module.exports = mongoose.model('User', userSchema);