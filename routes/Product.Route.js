const ProductController=require("../controllers/Product.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",ProductController.create)
Router.delete("/:id",ProductController.delete) //ajouter le params
Router.put("/:id",ProductController.update)
Router.get("/",ProductController.read)
module.exports=Router;