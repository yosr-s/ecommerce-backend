const ProductModel = require("../models/Product.Model")

const ProductController={
    create: function (req,res){
        ProductModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"product not created",data:null})
            }
            res.status(200).json({status:200,message:"created product",data:item})
        })

    },
    read: function (req,res){
        ProductModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created product", data: items })
            }
        }).select("-__v").populate("subcategory","-__v").populate("galleries","-__v").populate("provider","-__v").populate("orders","-__v")

    },
    update: function (req,res){
        ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created product", data: item })
        })

    },
    delete: function (req,res){
        ProductModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created product", data: item })
        })
    },




}
module.exports = ProductController