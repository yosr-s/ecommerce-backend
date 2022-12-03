const SubcategoryModel = require("../models/Subcategory.Model")

const SubcategoryController={
    create: function (req,res){
        SubcategoryModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Subcategory not created",data:null})
            }
            res.status(200).json({status:200,message:"created Subcategory",data:item})
        })

    },
    read: function (req,res){
        SubcategoryModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Subcategory not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created Subcategory", data: items })
            }
        })

    },
    update: function (req,res){
        SubcategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Subcategory not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created Subcategory", data: item })
        })

    },
    delete: function (req,res){
        SubcategoryModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Subcategory not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Subcategory", data: item })
        })
    },




}
module.exports = SubcategoryController