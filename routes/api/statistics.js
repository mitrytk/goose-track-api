const express = require("express");
const { getTasksStatistics } = require("../../controllers/statistics");

const { statisticsSchema } = require("../../schemas");
const { volidateBody, authenticate } = require("../../middlewares/index");

const router = express.Router();

router.use(authenticate);

router.route("/").get(volidateBody(statisticsSchema), getTasksStatistics);

module.exports = router;
