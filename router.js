const express = require("express");
const userController = require("./controllers/user");
const homeController = require("./controllers/home");
const orderController = require("./controllers/order");
const router = express.Router();

router.get("/", userController.checkUser, homeController.homePage);
router.get("/dashboard", userController.verifyToken, userController.dashboard);
router.get("/logout", userController.logout);

// test-otp-page
router.get("/otp", userController.otp);

router.post("/cnfotp", userController.cnfotp);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/sendOrder", orderController.sendOrder);
router.post("/", userController.register);

module.exports = router;
