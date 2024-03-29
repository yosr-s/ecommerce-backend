const mongoose = require('mongoose'); // Erase if already required

//! bcrypt
const bcrypt = require('bcrypt');

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
        index:true,
    },  
    email:{
        type:String,
        unique:true,  
        required:true

    },
    mobile:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
 
    },
    photo:{
        type:String,    
    }
}, baseOptions);         
 
//! bcrypt hash user password before saving into database
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

//Export the model
module.exports = mongoose.model('User', userSchema);   