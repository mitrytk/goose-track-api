const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
   owner : {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 5,
        required: true,
     },
     review: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300,
     }
}, { versionKey: false, timestamps: true });

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;