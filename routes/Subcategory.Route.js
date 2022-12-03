const SubcategoryController=require("../controllers/Subcategory.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",SubcategoryController.create)
Router.delete("/:id",SubcategoryController.delete) //ajouter le params
Router.put("/:id",SubcategoryController.update)
Router.get("/",SubcategoryController.read)
module.exports=Router;