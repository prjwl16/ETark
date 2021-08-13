const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const crypto = require('crypto')


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    salt: String,
    encry_password: {
        type: String,
        required: true
    },
},{ timestamp: true })

userSchema.virtual("password")
    .set(function(passsword){
        this._password=passsword
        this.salt=uuidv4()
        this.encry_password=this.securePassword(passsword)
    })
    .get(function(){
        return this._password
    })


userSchema.methods={

    authenticate: function(plainpassword){
        return  this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){

        if(!plainpassword) return ""

        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex')
        } catch (error) {
            
        }
    }
}
module.exports = mongoose.model("User",userSchema)