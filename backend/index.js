const express = require("express");
const cors = require("cors");
const users = require("./routes/index.js");


const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/v1", users);

app.get('/', (req, res) =>  {
 res.status(202).send("hi there")
}
    
)

app.listen("3000", () => {
    console.log("server is there");
})



