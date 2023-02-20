const ProviderModel = require("../models/Provider.model")

const ProviderController={
    create: function (req,res){
        req.body["photo"] = req.file.filename;
        ProviderModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Provider not created",data:null})
            }
            res.status(200).json({status:200,message:"created Provider",data:item})
        })

    },
    read: function (req,res){
        ProviderModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Provider not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created Provider", data: items })
            }
        }).select("-__v").populate("products","-__v")

    },
    update: function (req,res){
        req.body["photo"] = req.file.filename;
        if (!req.file) {
            return res.status(400).json({
                status: 400,
                message: "No photo provided",
                data: null,
            });
        }
        ProviderModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Provider not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created Provider", data: item })
        })

    },
    delete: function (req,res){
        ProviderModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Provider not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Provider", data: item })
        })
    },
    findById: function (req,res){
        ProviderModel.findOne({_id:req.params.id},function(err,item){
         if(err){
             res.json(err);
         }
         res.json(item)
        })
     }




}
module.exports = ProviderController