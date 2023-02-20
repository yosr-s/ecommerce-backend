const SubcategoryController=require("../controllers/Subcategory.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",SubcategoryController.create)
Router.delete("/:id",SubcategoryController.delete) //ajouter le params
Router.put("/:id",SubcategoryController.update)
Router.get("/",SubcategoryController.read)
Router.get("/:id",SubcategoryController.findById)
Router.get("/category/:categoryName",SubcategoryController.getSubcategoriesByCategoryName)

module.exports=Router;