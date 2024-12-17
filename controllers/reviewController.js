const { Product } = require("../model/productModel");
const { Review } = require("../model/reviewModel");

const addReview = async (req, res) =>{
    try {
        const {productId, rating, comment } = req.body
        const userId = req.user.id

        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        if(rating > 5 || rating < 0){
            return res.status(400).json({message: "Provide a proper rating"})
        }

        const review = await Review.findOneAndUpdate({userId, productId},{rating, comment}, {new: true, upsert: true})

        res.status(200).json({ message: "Review created successfully", data: review})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const getReview = async (req, res) =>{
    try {
        const { productId } = req.params

        const review = await Review.find({productId}).populate("userId","name").sort({createdAt: -1})

        if(!review.length){
            return res.status(404).json({message: "No reviews found"})
        }

        res.status(200).json({ message: "Reviews fetched successfully", data: review})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const deleteReview = async (req, res) =>{
    try {
        const {reviewId} = req.params

        const userId = req.user.id

        const review = await Review.findOneAndDelete({_id: reviewId, userId})

        if(!review){
            return res.status(404).json({message: "Review not found or no reviews"}) 
        }

        res.status(200).json({ message: "Reviews deleted successfully", data: review})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const getAverageRating = async (req, res) =>{
    try {
        const {productId} = req.params
        const review = await Review.find({productId})

        if(!review){
            return res.status(404).json({message: "No reviews found for this course"}) 
        }

        const averageRating = review.reduce((sum, review) => sum + review.rating, 0)/review.length

        res.status(200).json({ message: "The average rating fetched", data: averageRating})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {addReview, getReview, deleteReview, getAverageRating}