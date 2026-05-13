const authorization=async(req,resp,next)=>{
      if (!req.user) {
        return resp.status(401).json({ message: "Not authenticated" });
    }
    if(req.user.role==="admin"){

        return next()
    }
    else{
        resp.status(403).json({message:"you are not authorized to access this route"})
        return
    }
}
module.exports=authorization