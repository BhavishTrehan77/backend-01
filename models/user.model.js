const mongoose=require('mongoose')
const bcrypt=require("bcrypt") 
const { resetPassword } = require('../services/user.services')
const Schemadata=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["user","moderator"],
        default:"user"
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
})
Schemadata.pre("save",async function(){
    const hashedPassword=await bcrypt.hash(this.password,10)
    this.password=hashedPassword
})
const User= mongoose.model('User',Schemadata)
module.exports=User