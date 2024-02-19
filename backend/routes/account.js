const express = require("express");
const router =  express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middleware");
const Account = require("../db");
const User = require("./user");

        router.get("/balance", authMiddleware, async(req, res) => {
            account = await Account.findOne({
                userId: req.body.userId
            });

           res.status(200).json({
            balance: account.balance
           })

        })

        router.post("/transfer", async (req, res) => {


            const session = await mongoose.startSession();

            session.startTransaction();

            body = req.body;
            amount = req.body.amount;
            ownerAccount = await Account.findOne({
                userId: req.body._userId
            }).session(session);

            bal_check = ownerAccount.balance < amount

            if(!bal_check || !ownerAccount) {
                await session.abortTransaction();
            res.status(400).json({
            message: "insufficient balance"
            })}

            accepterAccount = await Account.findOne({
                userId: req.body.to
            }).session(session)

            if(!accepterAccount){
                await session.abortTransaction();
            res.status(400).json({
        message: "Invalid Account"
             })}

             await Account.updateOne({
                userId: req.body.userId
             },
             {
                $inc: {
                    balance: -amount
                }
             }).session(session);

             await Account.updateOne({
                userId: req.body.to
             },
             {
                $inc: {
                    balance: amount
                }
             }).session(session);

             await session.commitTransaction();
             
                res.status(400).json({
                    message: "Transaction successful"
                })


        })
        module.exports = router;

