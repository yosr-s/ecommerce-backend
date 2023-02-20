const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
   
    contenu:{
        type:String,
    },
    prix:{
        type:String,
        required:true
    },
    qte:{
        type:String,
        required:true
        
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"         
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Delivery"
    }
    
});  
     
//Export the model
module.exports = mongoose.model('Order', orderSchema);    