const CustomerModel = require("../models/Customer.Model")

const CustomerController={
    create: function (req,res){
        req.body["photo"] = req.file.filename;
        CustomerModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Customer not created" +err,data:null})
            }
            res.status(200).json({status:200,message:"created Customer",data:item})
        })

    },
    read: function (req,res){
        
        CustomerModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Customer not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created Customer", data: items })
            }
        }).select("-__v").populate("orders","-__v")

    },
    update: function (req,res){
        req.body["photo"] = req.file.filename;
        if(!req.file){return res.status(400).json({status:400,message:"No photo provided",data:null})}
        CustomerModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Customer not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created Customer", data: item })
        })

    },
    delete: function (req,res){
        CustomerModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Customer not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Customer", data: item })
        })
    },
    findById: function (req,res){
        CustomerModel.findOne({_id:req.params.id},function(err,item){
         if(err){
             res.json(err);
         }
         res.json(item)
        })
     }




}
module.exports = CustomerController