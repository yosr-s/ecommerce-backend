const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true

    },
  
    description:{
        type:String,
        required:true

        
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subcategory"
    }],
    
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
    
});

//Export the model
module.exports = mongoose.model('Category', categorySchema);