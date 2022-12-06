const UserController=require("../controllers/User.Controller");
const express=require("express")
const Router=express.Router();
//! authentification route
Router.post('/authenticate', UserController.authenticate);
Router.post('/logout', UserController.logout);
Router.post('/refresh', UserController.refresh);

module.exports=Router;  