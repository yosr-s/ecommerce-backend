const SubcategoryModel = require("../models/Subcategory.Model")
const CategoryModel=require("../models/Category.Model")

const SubcategoryController={
    /*create: function (req,res){

        console.log(req.body)
        SubcategoryModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Subcategory not created",data:null})
            }
            res.status(200).json({status:200,message:"created Subcategory",data:item})
        })

    },*/
  
    create: function (req,res){
        console.log(req.body)
        SubcategoryModel.create(req.body, async function(err,subcategory){
            if (err){
                res.status(406).json({status:406,message:"Subcategory not created",data:null})
            }
            const category = await CategoryModel.findOneAndUpdate(
                {_id: req.body.category},
                {$push: {subcategories: subcategory._id}},
                {new: true}
            );
            if (!category) {
                return res.status(406).json({status:406,message:"Category not found",data:null})
            }
            res.status(200).json({status:200,message:"created Subcategory",data:subcategory})
        })
    
    },
    
    
    read: function (req,res){
        SubcategoryModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Subcategory not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created Subcategory", data: items })
            }
        }).select("-__v").populate("category","-__v").populate("products","-__v")

    },
    update: function (req,res){
        SubcategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true},async function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Subcategory not created"+err, data: null })
            } 
            const category = await CategoryModel.findOneAndUpdate(
                {_id: req.body.category},
                {$push: {subcategories: subcategory._id}},
                {new: true}
            );
            if (!category) {
                return res.status(406).json({status:406,message:"Category not found",data:null})
            }
            res.status(200).json({ status: 200, message: "created Subcategory", data: item })
        })

    },
    delete: function (req,res){
        SubcategoryModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Subcategory not deleted", data: null })
            }
            CategoryModel.findOneAndUpdate(
                {_id: req.body.category},
                {$pull: {subcategories: item._id}},
                {new: true}
            );
            res.status(200).json({ status: 200, message: "deleted Subcategory", data: item })
        })
    },
    findById: function (req,res){
        SubcategoryModel.findOne({_id:req.params.id},function(err,item){
         if(err){
             res.json(err);
         }
         res.json(item)
        })
     },
     getSubcategoriesByCategoryName: async function (req, res) {
        try {
            const categoryName = req.params.categoryName;
    
            // Find the subcategory by name
            const category = await CategoryModel.findOne({ name: categoryName });
    
            // If no subcategory is found, return an error response
            if (!category) {
                return res.status(404).json({ status: 404, message: "category not found", data: null });
            }
    
            // Find the products that have the subcategory id
            const subcategories = await SubcategoryModel.find({ category: category._id });
    
            res.status(200).json({
                status: 200,
                message: "Subcategories by category name..",
                data: subcategories
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Error getting subcategories", data: null });
        }
    }  
    




}
module.exports = SubcategoryController