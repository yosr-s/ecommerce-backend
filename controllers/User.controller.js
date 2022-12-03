const UserModel = require("../models/User.Model")

const UserController={
    create: function (req,res){
        UserModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"user not created",data:null})
            }
            res.status(200).json({status:200,message:"created user",data:item})
        })

    },
    read: function (req,res){
        UserModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "user not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "create user", data: items })
            }
        })

    },
    update: function (req,res){
        UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "user not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "create user", data: item })
        })

    },
    delete: function (req,res){
        UserModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "user not created", data: null })
            }
            res.status(200).json({ status: 200, message: "create user", data: item })
        })
    },




}
module.exports = UserController