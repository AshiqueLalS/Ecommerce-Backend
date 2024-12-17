const { addReview, getReview, deleteReview, getAverageRating } = require("../../controllers/reviewController")
const { userAuth } = require("../../middlewares/userAuth")

const reviewRouter = require("express").Router()

reviewRouter.get("/get-reviews/:productId",userAuth, getReview)
reviewRouter.post("/add-review",userAuth, addReview)

reviewRouter.delete("/delete-review/:reviewId",userAuth, deleteReview)
reviewRouter.get("/get-average-rating/:productId",userAuth, getAverageRating)

module.exports = reviewRouter