const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send("No token provided");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).send("Invalid token");
        }
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;