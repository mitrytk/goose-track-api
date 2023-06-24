const Review = require("../../models/review");
const { HttpError, ctrlWrapper } = require("../helpers/index");
require("dotenv").config();

const addReview = async (req, res, next) => {
    const {name, avatarUrl, _id} = req.user;
    const owner = {name, avatarUrl, id: _id};

    const result = await Review.create({...req.body, owner});

    res.status(200).json({result});
}

const editReview = async (req, res, next) => {
    const {name, avatarUrl, _id} = req.user;
    const result = await Review.findByIdAndUpdate(_id, req.body, {new: true});

    if(!result) {
        throw HttpError(404, "Not found")
      }

    res.status(200).json({result});
}

module.exports = {
    addReview: ctrlWrapper(addReview),
    editReview: ctrlWrapper(editReview),
};