const ProductController=require("../controllers/Product.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",ProductController.create)
Router.delete("/:id",ProductController.delete) //ajouter le params
Router.put("/:id",ProductController.update)
Router.get("/",ProductController.read)
Router.get("/:id",ProductController.findById)
Router.get("/category/:categoryName/subcategory/:subcategoryName",ProductController.getProductsByCategoryAndSubcategoryName)
Router.get("/subcategory/:subcategoryName",ProductController.getProductsBySubcategoryName)
//Router.get("/subcategory/:subcategoryName",ProductController.getProductsBySub)


module.exports=Router;  