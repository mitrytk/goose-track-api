const Review = require("../models/review");
const { HttpError, ctrlWrapper } = require("../helpers/index");
require("dotenv").config();

const getReviews = async (req, res, next) => {
    const {page = 1, limit = 1} = req.query;
    const skip = (page - 1) * limit;

    const result = await Review.find({}, "", {skip, limit});
    res.status(200).json({result});
}

const getReview = async (req, res, next) => {
    const {id} = req.params;
    const result = await Review.find(id);

    if(!result) {
        throw HttpError(404, "Not found")
      }

    res.status(200).json({result});
}

const addReview = async (req, res, next) => {
    const {name, avatarURL, _id} = req.user;
    const owner = {name, avatarURL, id: _id};

    const result = await Review.create({...req.body, _id, owner});

    res.status(200).json({result});
}

const editReview = async (req, res, next) => {
    const {id} = req.params;
    const result = await Review.findByIdAndUpdate(id, req.body, {new: true});

    if(!result) {
        throw HttpError(404, "Not found")
      }

    res.status(200).json({result});
}

const deleteReview = async (req, res, next) => {
    const {id} = req.params;
    const result = await Review.findByIdAndDelete(id);

    if(!result) {
        throw HttpError(404, "Not found")
      }

    res.json({
        message: "review deleted"
    });
}

module.exports = {
    addReview: ctrlWrapper(addReview),
    editReview: ctrlWrapper(editReview),
    deleteReview: ctrlWrapper(deleteReview),
    getReviews: ctrlWrapper(getReviews),
    getReview: ctrlWrapper(getReview)
};