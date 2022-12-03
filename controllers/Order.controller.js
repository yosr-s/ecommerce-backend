const OrderModel = require("../models/Order.Model")

const OrderController={
    create: function (req,res){
        OrderModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"order not created",data:null})
            }
            res.status(200).json({status:200,message:"created order",data:item})
        })

    },
    read: function (req,res){
        OrderModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "order not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created order", data: items })
            }
        }).select("-__v").populate("products","-__v").populate("customer","-__v").populate("delivery","-__v")

    },
    update: function (req,res){
        OrderModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "order not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "create order", data: item })
        })

    },
    delete: function (req,res){
        OrderModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "order not created", data: null })
            }
            res.status(200).json({ status: 200, message: "create order", data: item })
        })
    },




}
module.exports = OrderController