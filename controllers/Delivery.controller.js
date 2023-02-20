const DeliveryModel = require("../models/Delivery.Model")

const DeliveryController={
    create: function (req,res){
        req.body["photo"] = req.file.filename;
        DeliveryModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Delivery not created",data:null})
            }
            res.status(200).json({status:200,message:"created Delivery",data:item})
        })

    },
    read: function (req,res){
        DeliveryModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Delivery not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created Delivery", data: items })
            }
        }).select("-__v").populate("orders","-__v")

    },
    update: function (req,res){
        req.body["photo"] = req.file.filename;
        if(!req.file){return res.status(400).json({status:400,message:"No photo provided",data:null})}
        DeliveryModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Delivery not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created Delivery", data: item })
        })

    },
    delete: function (req,res){
        DeliveryModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Delivery not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Delivery", data: item })
        })
    },
    findById: function (req,res){
        DeliveryModel.findOne({_id:req.params.id},function(err,item){
         if(err){
             res.json(err);
         }
         res.json(item)
        })
     }




}
module.exports = DeliveryController