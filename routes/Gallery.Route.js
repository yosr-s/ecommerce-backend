const GalleryController=require("../controllers/Gallery.Controller");
const express=require("express")
const Router=express.Router();
Router.post("/",GalleryController.create)
Router.delete("/:id",GalleryController.delete) //ajouter le params
Router.put("/:id",GalleryController.update)
Router.get("/",GalleryController.read)
module.exports=Router;