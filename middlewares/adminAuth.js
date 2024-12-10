const jwt = require("jsonwebtoken");



const adminAuth = (req, res, next) =>{
    try {

        const { token } = req.cookies

        if(!token){
            return res.status(401).json({ message: "Authentication Error(token missing)"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({ message: "Authentication Error (improper token)"})
        }

        if(decoded !== "admin"){
            return res.status(401).json({message: "Access Denied"})
        }

        req.user = decoded
        next()
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}


module.exports = { adminAuth }