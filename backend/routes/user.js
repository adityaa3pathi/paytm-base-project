const express = require("express");
const z = require("zod");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {secret} = require("../config")
const router = express.Router();
const {User} =  require("../db");
const {Account} = require("../db")
const authMiddleware = require("../middleware")



const update_user = z.object({

    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.optional(z.string().min(6))

})

const signup_user = z.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    password: z.string().min(6)
})

const signin_user = z.object({
    username: z.string(),
    password: z.string()
})


router.post("/signup", async (req, res) => {
       
          body = req.body;
          response = signup_user.safeParse(body);
            if(!response.success){
             return   res.status(411).json({
                        message: "Invalid inputs"
                    })
            }
            
            
        
                username = body.username;
              const user =  await User.findOne({username: username})

                    if(user){
                        
                      return  res.status(411).json({
                            message: "already exists"
                        })
                    }
                     
                      const dbUser = await User.create(body)
                     

                        

                         await Account.create({
                            userId: dbUser._id,
                            balance: 1 + Math.random()*10000
                         })


                         token = jwt.sign({ userId : dbUser._id,   }, secret)


                        res.status(201).json({
                            message: "user created",
                            token: token
                        })
                    
                
            
          

})


router.post("/signin", async (req, res) => {

         body = req.body;
    

        const {success} = signin_user.safeParse(body);

        if(!success) {
          return  res.status(411).json({
                message: "invalid details"
            })
        }

        const username =  req.body.username;
       const  password = req.body.password;

        const user = await User.findOne({username: username,
        password: password})

        if(user) {
                 // code to send jwt along with appropriate status codes
            const token = jwt.sign({
                userid: user._id
            }, secret)
            return res.status(201).json({
                    token: token
                })

            }
            else {
               return res.status(201).json({
                    message: "invalid password"
                })
            }
        




})

router.put("/", authMiddleware, async (req, res) => {

       body = req.body;

       if(!body) {
      return  res.status(411).json({
            message: "send something to update"
        })
       }
    
      const {success} = update_user.safeParse(body);

      if(!success){
       return res.status(411).json({
            message: "password too small"
        })
        
      }


        updated_user = await User.updateOne({_id: req.body.userid }, body)
        
        try{
           return res.status(201).json({
                message:"user created successfully",
            })
        }
        catch(err) {
            console.log(err)
            res.status(411).json({
                message: "error while updating user."
            })
        }


})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

module.exports = router;