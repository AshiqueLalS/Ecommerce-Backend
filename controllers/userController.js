const userModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")

const register = async (req, res) =>{
    try {

        const { name, email, phone, password } = req.body
        
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: "All fields are required"})
        }

        const userAlreadyExist =await userModel.findOne({email}).select("-password")
       
        if(userAlreadyExist){
            return res.status(400).json({ error: "User already exists"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name, email, phone, password: hashedPassword
        })
        
        const savedUser = await newUser.save();

        
        res.status(200).json({ message: "User created successfully",data: savedUser})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const login = async (req, res) =>{
    try {
        const { email, password } = req.body

        if ( !email || !password) {
            res.status(400).json({ error: "All fields are required"})
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({ error: "User does not exist"})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
          return res.status(400).json({error: " Incorrect Password"})
        }

        if(!user.isActive){
            return res.status(400).json({error: "User profile is deactivated, please contact Admin"})
        }

        const token = generateToken(user, "user")
        res.cookie("token", token)
        
        const { password: _, ...userWithOutPassword } = user._doc;

        
        res.status(200).json({ message: "Login successfull", data: userWithOutPassword})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}


const userProfile = async (req, res) =>{
    try {

        const userId = req.user.id
        const userData = await userModel.findById(userId).select("-password")

        res.status(200).json({message: "Fetched User Profile", data: userData})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}


const userLogout = async (req, res) =>{
    try {


        res.clearCookie("token")

        res.status(200).json({message: "User logout Success"})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}
const checkUser = async (req, res) =>{
    try {
        res.status(200).json({message: "Autherized User"})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {register, login, userProfile, userLogout, checkUser}