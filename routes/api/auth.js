const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/users");

const {
  volidateBody,
  authenticate,
  upload,
} = require("../../middlewares/index");
const {
  registerSchema,
  loginShema,
  updateShema,
} = require("../../schemas/index");

router.post("/register", volidateBody(registerSchema), ctrl.register);
router.post("/login", volidateBody(loginShema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);
router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  volidateBody(updateShema),
  ctrl.update
);

module.exports = router;
