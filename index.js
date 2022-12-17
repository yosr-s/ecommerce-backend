const express = require('express')
const RouteUser=require("./routes/User.Route") //**import de route (user) dans index
const RouteOrder=require("./routes/Order.Route") //TODO import de route (order) dans index
const RouteProduct=require("./routes/Product.Route") //! import de route (product) dans index
const RouteCategory=require("./routes/Category.Route") //**import de route (category) dans index
const RouteCustomer=require("./routes/Customer.Route") //TODO import de route (customer) dans index
const RouteDelivery=require("./routes/Delivery.Route")
const RouteProvider=require("./routes/Provider.Route")
const RouteGallery=require("./routes/Gallery.Route")
const RouteSubcategory=require("./routes/Subcategory.Route")
//todo mailer
const nodemailer=require('nodemailer')
//todo middleware
const auth=require("./middleware/auth")
const upload=require("./middleware/uploads")
//! swagger autogenerate
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');




const db=require("./config/db") //appel de la base 
var jwt = require('jsonwebtoken'); //! jwt
const bodyParser = require('body-parser')
const app = express()

app.set('secretKey', 'nodeRestApi'); //! jwt secret token 
//todo body parser for file limit 
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(bodyParser.json());
 
app.use(express.json()) //pour l'envoie de données sous forme de données json
const port = 3000
app.use("/users", RouteUser) //**creation de route de users nb:c'est la meme de l'import en dessus
app.use("/orders",auth, RouteOrder) //todo route de order
app.use("/products", auth,upload.array("files") ,RouteProduct) //! route de product
app.use("/categories",auth, RouteCategory) //**creation de route de category
app.use("/customers",auth,upload.single('file'), RouteCustomer) //todo route de customer 
app.use("/deliveries",auth,upload.single('file'),RouteDelivery)
app.use("/providers",auth,upload.single('file'), RouteProvider)
app.use("/galleries",auth,upload.single('file'), RouteGallery)   
app.use("/subcategories",auth, RouteSubcategory)

//todo route de lecture de fichier
app.get("/file/:img",function(req,res) {
  res.sendFile(__dirname+"/uploads/"+req.params.img)
})

//todo swagger
//const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//!swagger autogenerate
/*const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Amazing Developer'
},
      servers: ["http://localhost:3000"]
}},
  apis: ["index.js","./routes/*.js"]};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));*/


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'yosrsaidi24@outlook.com',
    pass: 'Yosrinfinity'
  }
});
/*var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fc8d9cfb9565e9",
    pass: "875bdfca22e31c"
  }
});*/

var mailOptions = {
  from: 'yosrsaidi24@outlook.com',
  to: 'yosrsaidi1@gmail.com',
  subject: 'sending email from nodejs',
  text: 'that was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});