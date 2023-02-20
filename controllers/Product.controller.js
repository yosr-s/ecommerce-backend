const ProductModel = require("../models/Product.Model")
const GalleryModel=require("../models/Gallery.Model")
const SubcategoryModel=require("../models/Subcategory.Model")
const CategoryModel=require("../models/Category.Model")
const ProviderModel=require("../models/Provider.model")

const ProductController={
    create: function (req, res) {
        const Product = ProductModel(req.body);
        console.log('files',req.files);
        Product.save(async function (err, item) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            req.files.forEach(async element => {
                const Gallery = GalleryModel({ url_photo: element.filename, product: item._id });
                await Gallery.save(async function (err, result) {
                    console.log("res of gallery ", result)
                    await ProductModel.update({ _id: item._id }, { $push: { galleries: result._id } }, { new: true });
                })
            });
            const category = await CategoryModel.findOneAndUpdate(
                {_id: req.body.category},
                {$push: {products: item._id}},
                {new: true}
            );
            if (!category) {
                return res.status(406).json({status:406,message:"Category not found",data:null})
            } ;
            const subcategory = await SubcategoryModel.findOneAndUpdate(
                {_id: req.body.subcategory},
                {$push: {products: item._id}},
                {new: true}
            );
            if (!subcategory) {
                return res.status(406).json({status:406,message:"subategory not found",data:null})
            };
            const provider = await ProviderModel.findOneAndUpdate(
                {_id: req.body.provider},
                {$push: {products: item._id}},
                {new: true}
            );
            if (!provider) {
                return res.status(406).json({status:406,message:"Provider not found",data:null})
            } ;  
            res.json(item)        
        })    
    },
   
            
    read: function (req,res) {
        ProductModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created product", data: items })
            }
        }).select("-__v").populate("subcategory","-__v").populate("galleries","-__v").populate("provider","-__v").populate("orders","-__v").populate("category","-__v");

    },
    update: function (req,res){
        const Product = ProductModel(req.body);
        ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true},async function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not updated"+err, data: null })
            } 
            req.files.forEach(async element => {
                const Gallery = GalleryModel({ url_photo: element.filename, product: item._id });
                await Gallery.save(async function (err, result) {
                    console.log("res of gallery ", result)
                    await ProductModel.update({ _id: item._id }, { $push: { galleries: result._id } }, { new: true });
                })
            });
            const category = await CategoryModel.findOneAndUpdate(
                {_id: req.body.category},
                {$push: {products: item._id}},
                {new: true}
            );
            if (!category) {
                return res.status(406).json({status:406,message:"Category not found",data:null})
            } ;
            const subcategory = await SubcategoryModel.findOneAndUpdate(
                {_id: req.body.subcategory},
                {$push: {products: item._id}},
                {new: true}
            );
            if (!subcategory) {
                return res.status(406).json({status:406,message:"subategory not found",data:null})
            };
            const provider = await ProviderModel.findOneAndUpdate(
                {_id: req.body.provider},
                {$push: {products: item._id}},
                {new: true}
            );
            if (!provider) {
                return res.status(406).json({status:406,message:"Provider not found",data:null})
            } ;  
            res.status(200).json({ status: 200, message: "updated product", data: item })
 
        })

    },
    delete: function (req,res){
        ProductModel.findByIdAndDelete(req.params.id, async function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created", data: null })
            }
            CategoryModel.findOneAndUpdate(
                {_id: req.body.category},
                {$pull: {products: item._id}},
                {new: true}
            );
            SubcategoryModel.findOneAndUpdate(
                {_id: req.body.subcategory},
                {$pull: {products: item._id}},
                {new: true}
            );
            ProviderModel.findOneAndUpdate(
                {_id: req.body.provider},
                {$pull: {products: item._id}},
                {new: true}
            );
            res.status(200).json({ status: 200, message: "created product", data: item })
        })
    },
    findById: function (req,res){
        ProductModel.findOne({_id:req.params.id},function(err,item){
         if(err){
             res.json(err);
         }
         res.json(item)
        }).select("-__v").populate("subcategory","-__v").populate("galleries","-__v").populate("provider","-__v").populate("orders","-__v").populate("category","-__v");
     },
   
     /* getProductsByCategoryAndSubcategoryName: async function (req, res) {
        try {
        const categoryName = req.params.categoryName;
        const subcategoryName = req.params.subcategoryName;
        const products = await ProductModel.find({}).
        populate('category',"name").
        populate('subcategory',"name").
        where('category.name').equals(categoryName).
        where('subcategory.name').equals(subcategoryName)
        console.log(products)
        console.log(categoryName)
        console.log(subcategoryName)
        res.status(200).json({
            status: 200,
            message: "Products by category and subcategory name..",
            data: products
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Error getting products", data: null });
        }
    },
   /* getProductsBySubcategoryName: async function (req, res) {
        try {
        const subcategoryName = req.params.subcategoryName;
        const products = await ProductModel.find({}).
        where('subcategory.name').equals(subcategoryName).
        populate('subcategory',"name").
        console.log(products)
        console.log(subcategoryName)
        res.status(200).json({
            status: 200,
            message: "Products by subcategory name..",
            data: products
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Error getting products", data: null });
        }
    },
   /* getProductsBySub: function (req,res){
        const subcategoryName = req.params.subcategoryName;
        console.log(subcategoryName)
        ProductModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created product", data: items })
            }
        }).select("-__v").populate("subcategory","-__v").
        where('subcategory.name').equals(subcategoryName)

    },*/
    getProductsBySubcategoryName: async function (req, res) {
        try {
            const subcategoryName = req.params.subcategoryName;
    
            // Find the subcategory by name
            const subcategory = await SubcategoryModel.findOne({ name: subcategoryName });
    
            // If no subcategory is found, return an error response
            if (!subcategory) {
                return res.status(404).json({ status: 404, message: "Subcategory not found", data: null });
            }
    
            // Find the products that have the subcategory id
            const products = await ProductModel.find({ subcategory: subcategory._id });
    
            res.status(200).json({
                status: 200,
                message: "Products by subcategory name..",
                data: products
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Error getting products", data: null });
        }
    }  ,
    getProductsByCategoryAndSubcategoryName: async function (req, res) {
        try {
            const subcategoryName = req.params.subcategoryName;
            const CategoryName = req.params.categoryName;

    
            // Find the subcategory by name
            const subcategory = await SubcategoryModel.findOne({ name: subcategoryName });
            const category = await CategoryModel.findOne({ name: CategoryName });
    
            // If no subcategory is found, return an error response
            if (!subcategory) {
                return res.status(404).json({ status: 404, message: "Subcategory not found", data: null });
            }
            if (!category) {
                return res.status(404).json({ status: 404, message: "category not found", data: null });
            }
    
            // Find the products that have the subcategory id
            const products = await ProductModel.find({ subcategory: subcategory._id , category: category._id }).select("-__v").populate("subcategory","-__v").populate("galleries","-__v").populate("provider","-__v").populate("orders","-__v").populate("category","-__v") ;
    
            res.status(200).json({
                status: 200,
                message: "Products by subcategory and category name..",
                data: products
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Error getting products", data: null });
        }
    } 

   
    
      
    
    
    
    
      
      
      
    
      
}
   




module.exports = ProductController