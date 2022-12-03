const GalleryModel = require("../models/Gallery.Model")

const GalleryController={
    create: function (req,res){
        GalleryModel.create(req.body,function(err,item){
            if (err){
                res.status(406).json({status:406,message:"Gallery not created",data:null})
            }
            res.status(200).json({status:200,message:"created Gallery",data:item})
        })

    },
    read: function (req,res){
        GalleryModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "Gallery not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created Gallery", data: items })
            }
        })

    },
    update: function (req,res){
        GalleryModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Gallery not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created Gallery", data: item })
        })

    },
    delete: function (req,res){
        GalleryModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "Gallery not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created Gallery", data: item })
        })
    },




}
module.exports = GalleryController