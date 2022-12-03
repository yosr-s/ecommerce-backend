const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var deliverySchema = new mongoose.Schema({
   
    adress:{
        type:String,
        required:true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]

 
    
});

//Export the model
module.exports = mongoose.model('Delivery', deliverySchema);