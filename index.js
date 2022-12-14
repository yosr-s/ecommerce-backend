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
app.use("/products", auth ,RouteProduct) //! route de product
app.use("/categories",auth, RouteCategory) //**creation de route de category
app.use("/customers",auth,upload.single('photo'), RouteCustomer) //todo route de customer 
app.use("/deliveries",auth,upload.single('photo'),RouteDelivery)
app.use("/providers",auth,upload.single('photo'), RouteProvider)
app.use("/galleries",auth,upload.single('url_photo'), RouteGallery)
app.use("/subcategories",auth, RouteSubcategory)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
