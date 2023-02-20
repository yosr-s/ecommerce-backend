const GalleryModel = require("../models/Gallery.Model")
const ProductModel=require("../models/Product.Model")

const GalleryController={
    create:  function (req,res){
        console.log(req.body)
        req.body["url_photo"] = req.file.filename;
        
        GalleryModel.create(req.body,async function(err,item){
            if (err){    
                res.status(406).json({status:406,message:"Gallery not created",data:null})
            }
            const product = await ProductModel.findOneAndUpdate(
                {_id: req.body.product},
                {$push: {galleries: item._id}},
                {new: true}
            );
            if (!product) {
                return res.status(406).json({status:406,message:"Product not found",data:null})
            }
            res.status(200).json({status:200,message:"created Gallery",data:item})
        })
    
    },  
    
    read: function (req,res){
        GalleryModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Gallery not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: " Gallery list", data: items })
            }
        }).select("-__v").populate("product","-__v")

    },
    update: function (req,res){
        req.body["url_photo"] = req.file.filename;
        if (!req.file) { 
            return res.status(400).json({
                status: 400,
                message: "No photo provided",
                data: null,
            });
        }
        GalleryModel.findByIdAndUpdate(req.params.id,req.body,{new:true},async function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Gallery not created"+err, data: null })
            } 
            const product = await ProductModel.findOneAndUpdate(
                {_id: req.body.product},
                {$push: {galleries: item._id}},
                {new: true}
            );
            if (!product) {
                return res.status(406).json({status:406,message:"Product not found",data:null})
            }
            res.status(200).json({ status: 200, message: "created Gallery", data: item })
        })

    },
    delete: function (req,res){
        GalleryModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Gallery not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Gallery", data: item })
        })
    },
    




}
module.exports = GalleryController