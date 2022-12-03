const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var providerSchema = new mongoose.Schema({
   
    company:{
        type:String,
        required:true
    },
    
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
 
    
});

//Export the model
module.exports = mongoose.model('Provider', providerSchema);