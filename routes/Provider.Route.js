const ProviderController=require("../controllers/Provider.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",ProviderController.create)
Router.delete("/:id",ProviderController.delete) //ajouter le params
Router.put("/:id",ProviderController.update)
Router.get("/",ProviderController.read)
Router.get("/:id",ProviderController.findById)
module.exports=Router;