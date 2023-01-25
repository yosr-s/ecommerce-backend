const AdminController=require("../controllers/Admin.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",AdminController.create)
Router.delete("/:id",AdminController.delete) //ajouter le params
Router.put("/:id",AdminController.update)
Router.get("/",AdminController.read)
Router.get("/:id",AdminController.findById)
module.exports=Router;