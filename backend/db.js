const mongoose = require("mongoose");
const { number } = require("zod");


 mongoose.connect("mongodb+srv://adityabietj:iUYlDzJnDC2sTYQh@cluster1.nadjswi.mongodb.net/paytm-datah");

const schema1 = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
   },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const schema2 = mongoose.Schema({
    userId:  {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true

    },
    balance: {
        type: Number,
     required: true
    }
    
})



User  = mongoose.model( "User", schema1);
Account = mongoose.model( "Account", schema2 );

module.exports = {
    User,
    Account
}




