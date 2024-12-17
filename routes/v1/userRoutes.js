const { register, login, userProfile, userLogout, checkUser, userDeactivate, updateUser } = require('../../controllers/userController')
const { upload } = require('../../middlewares/multer')
const { userAuth } = require('../../middlewares/userAuth')

const userRouter = require('express').Router()


userRouter.post("/signup",upload.single("image"), register)
userRouter.post("/login", login)

userRouter.get("/profile", userAuth, userProfile)
userRouter.get("/logout", userLogout)

userRouter.put("/update-user",userAuth, updateUser)
userRouter.put("/deactivate",userAuth, userDeactivate)

userRouter.get("/check-user", userAuth, checkUser)

module.exports = userRouter