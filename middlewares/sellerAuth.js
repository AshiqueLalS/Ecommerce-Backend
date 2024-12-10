const jwt = require("jsonwebtoken");



const sellerAuth = (req, res, next) =>{
    try {

        const { token } = req.cookies

        if(!token){
            return res.status(401).json({ message: "Authentication Error(token missing)"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({ message: "Authentication Error (improper token)"})
        }

        if(decoded.role !== "seller" && decoded.role !== "admin"){
            return res.status(401).json({message: "Unautherized User"})
        }

        req.user = decoded
        next()
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}


module.exports = { sellerAuth }