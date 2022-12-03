const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var subcategorySchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
  
    description:{
        type:String,
        required:true
        
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
    
});

//Export the model
module.exports = mongoose.model('Subcategory', subcategorySchema);