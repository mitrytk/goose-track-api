const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/users");

const { volidateBody, authenticate } = require("../../middlewares/index");
const { registerSchema, loginShema } = require("../../schemas/index");

router.post("/register", volidateBody(registerSchema), ctrl.register);
router.post("/login", volidateBody(loginShema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;