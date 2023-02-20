const jwt = require("jsonwebtoken")
module.exports= (req, res, next) => {
    jwt.verify(req.headers['x_access_token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.status(401).json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.userId = decoded.id; //
            next();
        }
    });
}
