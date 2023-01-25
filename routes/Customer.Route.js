const CustomerController=require("../controllers/Customer.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",CustomerController.create)
Router.delete("/:id",CustomerController.delete) //ajouter le params
Router.put("/:id",CustomerController.update)
Router.get("/",CustomerController.read)
Router.get("/:id",CustomerController.findById)
module.exports=Router;