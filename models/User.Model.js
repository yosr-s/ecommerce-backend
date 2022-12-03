const mongoose = require('mongoose'); // Erase if already required

//todo heritage
const baseOptions = {
    discriminatorKey: 'itemtype', // our discriminator key, could be anything
    collection: 'items', // the name of our collection
};

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
}, baseOptions);

//Export the model
module.exports = mongoose.model('User', userSchema);