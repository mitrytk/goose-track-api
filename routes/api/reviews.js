const express = require('express');
const Review = require("../../models/review");
const {reviewSchema} = require("../../schemas/reviews");
const { isValidId, volidateBody, authenticate } = require("../../middlewares/index");
const ctrl = require("../../controllers/reviews");

const router = express.Router();

router.get('/', ctrl.getReviews);
router.get('/:id', authenticate, isValidId, ctrl.getReview);
router.post("/", authenticate, volidateBody(reviewSchema), ctrl.addReview);
router.patch("/:id", authenticate, isValidId, volidateBody(reviewSchema), ctrl.editReview);
router.delete("/:id", authenticate, isValidId, ctrl.deleteReview);

module.exports = router;