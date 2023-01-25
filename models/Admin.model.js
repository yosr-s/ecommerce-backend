const mongoose = require('mongoose'); // Erase if already required
//todo Admin est un fils de user donc il faut faire appel au model user
const UserModel = require("./User.Model")

// Declare the Schema of the Mongo model
var adminSchema = new mongoose.Schema({
   
    login:{
        type:String,
        required:true
 
    }
  
    
});

//todo heritag
UserModel.discriminator("Admin", adminSchema) 

//Export the model //todo heritage
module.exports = mongoose.model('Admin');