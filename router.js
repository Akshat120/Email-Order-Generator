const express = require("express");
const userController = require("./controllers/user");
const homeController = require("./controllers/home");
const router = express.Router();

router.get("/", homeController.homePage);
router.get("/login", userController.LoginPage);
router.post("/login", userController.dashboard);

module.exports = router;
