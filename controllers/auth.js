const User = require("../models/user")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
var expressJwt = require("express-jwt")

exports.signup=(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg //see the documentation
        })
    }
    const user = new User (req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"This Email Id is already in use"
                
            })
        }else{
            return res.json({
                name: user.name,
                email: user.email,
                id: user._id
            })
        }
    })

}

exports.signin=(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.json({
                error:"User Not Found"
            })
        }
        if(!user.authenticate(password)){
            return res.json({
                error:"User Not Found"
            })
        }
        const token = jwt.sign({_id:user._id},"secretkeyforwebtoken",{ expiresIn: 60 * 60 * 60 })
        res.cookie("token",token)

        return res.status(200).json({
            token,
            name: user.name,
            email: user.email
        })
    })
}

exports.signout=(req,res)=>{
    res.clearCookie("token")
    res.json({      
        message:"Sign Out success"
    })   
}

// exports.isSignedIn=expressJwt({
//     secret:"secretkeyforwebtoken",
//     algorithms: ['HS256'],
//     userProperty:"auth"
// })
