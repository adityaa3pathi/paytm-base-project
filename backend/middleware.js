const express = require("express");
const jwt = require("jsonwebtoken")
const {secret } = require("./config")

const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization;


   if((!authHeader || !authHeader.startsWith("Bearer " ) )){

    res.status(403).json({
        message: "invalid token"
    })
}


        const token = authHeader.substring(7, authHeader.length);

        verifiedUser = jwt.verify(token, secret);

        res.json({
            message: verifiedUser
        })

        if(verifiedUser._id){
            req.body._id = verifiedStatus._id;
           next();
}
         else
         res.status(403).json({
        message: "invalid token"
    })
};

            module.exports = authMiddleware;
            

   

