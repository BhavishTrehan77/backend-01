const timer=async(req,resp,next)=>{
    resp.send(`the req method is ${req.method} and the url is ${req.url}`)
    next()
}
module.exports={
    timer
}