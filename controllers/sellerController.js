const sellerModel = require("../model/sellerModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")

const sellerRegister = async (req, res) =>{
    try {
       
        const { name, email, password, address} = req.body

        console.log(req.body,"===")
       
        
        if (!name || !email || !password || !address) {
            return res.status(400).json({ error: "All fields are required"})
        }

        const sellerAlreadyExist =await sellerModel.findOne({email}).select("-password")
       
        if(sellerAlreadyExist){
            return res.status(400).json({ error: "seller already exists"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)


        


        const newSeller = new sellerModel({
            name, email,  password: hashedPassword, address,
        })
        
      
        const {_doc:seller} = await newSeller.save();

        const {password: pwd, ...savedSeller} = seller

        
        res.status(200).json({ message: "Seller created successfully",data: savedSeller})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const sellerLogin = async (req, res) =>{
    try {
        const { email, password } = req.body

        if ( !email || !password) {
            res.status(400).json({ error: "All fields are required"})
        }

        const seller = await sellerModel.findOne({email})

        if(!seller){
            return res.status(400).json({ error: "Seller does not exist"})
        }

        const passwordMatch = await bcrypt.compare(password, seller.password)

        if(!passwordMatch) {
          return res.status(400).json({error: " Incorrect Password"})
        }

        if(!seller.isActive){
            return res.status(400).json({error: "Seller profile is deactivated, please contact Admin"})
        }

        const token = generateToken(seller, "seller")
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,})
        
        const { password: _, ...sellerWithOutPassword } = seller._doc;

        
        res.status(200).json({ message: "Login successfull", data: sellerWithOutPassword})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const sellerProfile = async (req, res) =>{
    try {

        const sellerId = req.seller.id
        console.log(sellerId)
        const sellerData = await sellerModel.findById(sellerId).select("-password")

        res.status(200).json({message: "Fetched Seller Profile", data: sellerData})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const sellerLogout = async (req, res) =>{
    try {


        res.clearCookie("token")

        res.status(200).json({message: "Seller logout Success"})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {sellerLogin,sellerRegister,sellerProfile,sellerLogout}