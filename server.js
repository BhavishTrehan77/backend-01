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
    await mongoose.connect("mongodb+srv://beatHubUser:Guruji%40707@beathubuser.yi1fp0a.mongodb.net/?appName=beatHubUser")
    console.log("connection done")
}
connectdb()


app.use("/api/v1/result",router)

app.get("/api/data",authentification,authorization,async(req,resp)=>{
    resp.json({
        id:1,
        age:23
    })
})




app.listen(3000)
