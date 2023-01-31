const ProductModel = require("../models/Product.Model")
const GalleryModel=require("../models/Gallery.Model")

const ProductController={
    create: function (req, res) {
        const Product = ProductModel(req.body);
        Product.save(function (err, item) {
            if (err) {
                console.log(err)
                res.json(err)
            }
            req.files.forEach(async element => {
                const Gallery = GalleryModel({ url_photo: element.filename, product: item._id });
                await Gallery.save(async function (err, result) {
                    console.log("res of gallery ", result)
                    await ProductModel.update({ _id: item._id }, { $push: { galleries: result._id } }, { new: true });
                })
            });
            res.json(item)
        })
    },
    read: function (req,res){
        ProductModel.find({}, function (err, items) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created", data: null })
            } else {
            res.status(200).json({ status: 200, message: "created product", data: items })
            }
        }).select("-__v").populate("subcategory","-__v").populate("galleries","-__v").populate("provider","-__v").populate("orders","-__v")

    },
    update: function (req,res){
        ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true}, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created"+err, data: null })
            } else
            res.status(200).json({ status: 200, message: "created product", data: item })
        })

    },
    delete: function (req,res){
        ProductModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "product not created", data: null })
            }
            res.status(200).json({ status: 200, message: "created product", data: item })
        })
    },
    findById: function (req,res){
        ProductModel.findOne({_id:req.params.id},function(err,item){
         if(err){
             res.json(err);
         }
         res.json(item)
        })
     }
}
   




module.exports = ProductController