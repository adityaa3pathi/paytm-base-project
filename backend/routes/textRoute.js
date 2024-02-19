const express = require("express");
const router1 = express.Router();


router1.get("/text1", (req, res ) => {
        res.status(200).json({
        message: "started"})

})

module.exports = router1;