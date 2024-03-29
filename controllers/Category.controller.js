const CategoryModel = require("../models/Category.Model")

const CategoryController={
    create: function (req,res){
        CategoryModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Category not created",data:null})
            }
            res.status(200).json({status:200,message:"created Category",data:item})
        })

    },
    read: function (req,res){
        CategoryModel.find({},function(err,items){
            if(err){
                res.json(err);
            }
            res.json(items)
        }).select("-__v").populate("subcategories","-__v")

    },
    update: function (req,res){
        CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Category not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created Category", data: item })
        })

    },
    delete: function (req,res){
        CategoryModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Category not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Category", data: item })
        })
    },
    findById: function (req,res){
       CategoryModel.findOne({_id:req.params.id},function(err,item){
        if(err){
            res.json(err);
        }
        res.json(item)
       })
    }
    




}
module.exports = CategoryController