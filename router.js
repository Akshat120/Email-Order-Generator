const express = require("express");
const router = express.Router();

const loginRoutes = require("./");

router.use("/", loginRoutes);

module.exports = router;
