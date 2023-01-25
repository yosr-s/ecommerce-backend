const DeliveryController=require("../controllers/Delivery.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",DeliveryController.create)
Router.delete("/:id",DeliveryController.delete) //ajouter le params
Router.put("/:id",DeliveryController.update)
Router.get("/",DeliveryController.read)
Router.get("/:id",DeliveryController.findById)
module.exports=Router;