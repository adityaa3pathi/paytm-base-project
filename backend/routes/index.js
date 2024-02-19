const express = require("express");
const cors = require('cors')
const userRouter = require("./user.js");
const accountRouter = require("./account.js")
const testRoute = require("./textRoute.js")

const router = express.Router();

router.use("/testRoute", testRoute);


router.use("/user", userRouter);
router.use("/account", accountRouter);
 
module.exports = router;
 