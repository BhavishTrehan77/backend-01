const User = require("../models/user.model")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
const { validationResult } = require("express-validator")
const jwt=require("jsonwebtoken")
const getingData=async(req)=>{
    const{cursor,limit=5}=req.query
    if(cursor && mongoose.Schema.Types.ObjectId.isValid(cursor)){
        const que=new mongoose.Schema.Type.ObjectId(cursor)
    }
    const person=await User.find().sort({_id:-1}).limit(limit+1).lean()
    const hasMore=person.length>limit
    if(hasMore){
        person.pop()
    }
    const hasNext=hasMore && person.length>0
    const nextCurst=hasNext?person[person.length-1]._id:null
    return{
        person,
        hasNext,
        nextCurst
    }
}
const postingData=async(req,Data)=>{
   
    
    return User.create(Data)
}
const updatingData=async(id,Data)=>{
    return User.findByIdAndUpdate(id,Data)
}
const deletingData=async(id)=>{
    return await User.findByIdAndDelete(id)
}
const Signup=async(Data)=>{
    return await User.create(Data)
}
const Login=async(req)=>{
    const{email,password}=req.body
    const person=await User.findOne({email})
    if(!person){
         throw new Error("person didnt exists")
    }
    const isMatch=await bcrypt.compare(password,person.password)
    if(!isMatch){
        throw new Error("password didnt match or incorrect credentials for login")
    }
    const token=jwt.sign({id:person._id},"secret")
    return{person,token}
}
const forgot=async(email)=>{
    const person=await User.findOne({email})
    if(!person){
        throw new Error("person didnt exists")
    }
    const resetToken=crypto.randomBytes(32).toString("hex")
    const hashedToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    person.resetPasswordToken=hashedToken
    person.resetPasswordExpire=Date.now()+1000*60*10
     await person.save()
    return{resetToken}
   
}
const resetPassword=async(req)=>{
    const {newPassword,email}=req.body
    const person=await User.findOne({email})
    if(!person){
        throw new Error("person didnt exists")
    }
    const hashedToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
    const member=await User.find({
        resetPasswordToken:hashedToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    person.password=newPassword
    person.resetPasswordToken=undefined
    person.resetPasswordExpire=undefined
    await person.save()
    return({message:"user is successfully able to change the password"})
    
}
module.exports={
    getingData,
    postingData,
    updatingData,
    deletingData,
    Signup,
    Login,
    forgot,
    resetPassword
}