const AdminModel = require("../models/Admin.Model")

const AdminController={
    create: function (req,res){
        req.body["photo"] = req.file.filename;
        AdminModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Admin not created" +err,data:null})
            }
            res.status(200).json({status:200,message:"created Admin",data:item})
        })

    },
    read: function (req,res){        
        AdminModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Admin not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created Admin", data: items })
            }
        }).select("-__v")

    },
    update: function (req,res){
        AdminModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Admin not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created Admin", data: item })
        })

    },
    delete: function (req,res){
        AdminModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Admin not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Admin", data: item })
        })
    },
    findById: function (req,res){
        AdminModel.findOne({__id:req.params.id},function(err,item){
         if(err){
             res.json(err);
         }
         res.json(item)
        })
     }




}
module.exports = AdminController