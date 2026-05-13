const jwt=require("jsonwebtoken")
const User = require("../models/user.model")
const authentification=async(req,resp,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,"secret")
        const user=await User.findById(decoded.id)
        req.user=user
        return next()
    }
     return resp.status(401).json({ message: "No token, authorization denied" });
   
}
module.exports=authentification