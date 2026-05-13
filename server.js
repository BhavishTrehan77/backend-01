const express=require('express')
const { default: mongoose } = require('mongoose')
const router = require('./routes/user.routes')
const authorization = require('./middleware/auth')
const authentification = require('./middleware/authentification')
const {body}=require('express-validator')
const { timer } = require('./middleware/timer')
const User = require('./models/user.model')

const app=express()

app.use(express.json())



async function connectdb(){
    await mongoose.connect("mongodb://localhost:27017/bhtdinbad")
    console.log("connection done")
}
connectdb()
const validation=[
    body("email").isEmail().withMessage("enter an valid email address").custom((async(email)=>{
        const exist=await User.findOne({email})
        if(exist){
            throw new Error("email already exist")
        }
    })),
    body("password").isLength({min:8}).withMessage("enter an valid password"),
    body("confirmPassword").custom(value,{req}{
        
        
    })

]

app.use("/api/v1/result",validation,router)

app.get("/api/data",authentification,authorization,async(req,resp)=>{
    resp.json({
        id:1,
        age:23
    })
})




app.listen(3000)
