const AdminController=require("../controllers/Admin.Controller");
const express=require("express");
const upload = require("../middleware/uploads");

const Router=express.Router();
Router.post("/",upload.single('file'),AdminController.create)
Router.delete("/:id",AdminController.delete) //ajouter le params
Router.put("/:id",upload.single('file'),AdminController.update)
Router.get("/",AdminController.read)
Router.get("/:id",AdminController.findById)
module.exports=Router;