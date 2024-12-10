const { register, login, userProfile, userLogout, checkUser } = require('../../controllers/userController')
const { userAuth } = require('../../middlewares/userAuth')

const userRouter = require('express').Router()


userRouter.post("/signup", register)
userRouter.post("/login", login)

userRouter.get("/profile", userAuth, userProfile)
userRouter.get("/logout", userLogout)

userRouter.put("/update")
userRouter.put("/forgot-password")
userRouter.put("/deactivate")

userRouter.get("/check-user", userAuth, checkUser)

module.exports = userRouter