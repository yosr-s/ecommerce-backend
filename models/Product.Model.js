const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },ref:{
        type:String,
    },
    price:{
        type:String,
    },
    qte:{
        type:String,
    },   
    description:{  
        type:String,
            
    },  
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subcategory"
    },
    galleries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Gallery"
    }], 
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Provider"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"   
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]

    
    
});
           
//Export the model
module.exports = mongoose.model('Product', productSchema);          