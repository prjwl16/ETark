require('dotenv').config() //environment variable
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const coockieParser = require('cookie-parser')


//middlewares
app.use(express.json())
app.use(coockieParser());

//databse connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
})

app.get("/",(req,res)=>{
    res.send("hii")
})

//routes
const authRoute = require("./routes/authRoute")
app.use("/api",authRoute)

//server
const port = process.env.PORT || 5000
app.listen(port,()=>{console.log(`Online on ${port}`)})