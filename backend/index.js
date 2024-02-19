const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const users = require("./routes/index.js");
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/v1", users);

app.get('/', (req, res) =>  {
 res.status(202).send("hi there")
}
    
)

app.listen(PORT, () => {
    console.log("server is there");
})



