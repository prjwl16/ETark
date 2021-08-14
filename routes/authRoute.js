const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator');
const {signup,signin,signout,isSignedIn} = require("../controllers/auth")

router.post("/signup",[
    check("email","Enter Valide Email ID",).isEmail()
],signup)

router.post("/login",[
    check("email","Enter Valide Email ID",).isEmail()
],signin)

router.get("/signout",signout)

// router.get("/home",isSignedIn,(req,res)=>{
//     res.send("Success")
// })


module.exports = router