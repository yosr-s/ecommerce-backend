const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({

    ref:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    qte:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
        
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
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"   
    }

    
    
});

//Export the model
module.exports = mongoose.model('Product', productSchema);