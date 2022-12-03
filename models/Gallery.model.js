const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var gallerySchema = new mongoose.Schema({
   
    url_photo:{
        type:String,
        required:true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
 
    
});

//Export the model
module.exports = mongoose.model('Gallery', gallerySchema);