const userModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")
const { cloudinaryInstance } = require("../config/cloudinaryConfig")
const sellerModel = require("../model/sellerModel")

const register = async (req, res) =>{
    try {
       
        const { name, email, phone, password, address, image } = req.body

        console.log(req.body)
        console.log(image)
        
        if (!name || !email || !phone || !password || !address) {
            return res.status(400).json({ error: "All fields are required"})
        }

        const userAlreadyExist =await userModel.findOne({email}).select("-password")
       
        if(userAlreadyExist){
            return res.status(400).json({ error: "User already exists"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const uploadResult = await cloudinaryInstance.uploader.upload(req?.file?.path)

        console.log(uploadResult);

        


        const newUser = new userModel({
            name, email, phone, password: hashedPassword, address, image: uploadResult.url
        })
        
        const {_doc:user} = await newUser.save();

        const {password: pwd, ...savedUser} = user
        
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
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,})
        
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
        const userId = req.user.id
        const userData = await userModel.findById(userId).select("-password")

        let sellerData
        if(!userData){
            sellerData = await sellerModel.findById(userId).select("-password")
        }

       
        
        
        res.status(200).json({message: "Autherized User",data: userData|| sellerData})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const userDeactivate = async (req, res) =>{
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required, please login" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isActive = false
        await user.save() 

        res.status(200).json({message: "user Deactivated successfully, please contact admin", data: user})

        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const updateUser = async (req,res)=>{
    try {
    const userId = req.user.id;
    const { name, email, phone, image, address} = req.body;
    if (!name && !email && !phone && !address) {
        return res.status(400).json({ message: "No fields to update provided" });
    }

    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({message: " User not found"})
    }

    const userAlreadyExist =await userModel.findOne({email}).select("-password")
       
    if(userAlreadyExist){
         return res.status(400).json({ error: "User already exists, please try different"})
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (phone) user.address = address;


    await user.save();


    res.status(200).json({ message: 'User details updated successfully', data: user });
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {register, login, userProfile, userLogout, checkUser, userDeactivate, updateUser}