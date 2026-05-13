const serviceData=require('../services/user.services')

const getData=async(req,resp)=>{
    const value=await serviceData.getingData(req)
    resp.json(value)
}
const postData=async(req,resp)=>{
    const value=await serviceData.postingData(req,req.body)
    resp.json(value)
}
const patchData=async(req,resp)=>{
    const id=req.params.id
    const value=await await serviceData.updatingData(id,req.body)
    resp.json(value)
}
const deleteData=async(req,resp)=>{
    const id=req.params.id
    const value=await serviceData.deletingData(id)
    resp.json(value)
}
const signup=async(req,resp)=>{
    const value=await serviceData.Signup(req.body)
    resp.json(value)
}
const login=async(req,resp)=>{
    const value=await serviceData.Login(req)
    resp.json(value)
}
const forgoten=async(req,resp)=>{
    const value=await serviceData.forgot(req.body.email)
    resp.json(value)
}
const reset=async(req,resp)=>{
    const value=await serviceData.resetPassword(req)
    resp.json(value)
}
module.exports={getData,postData,patchData,deleteData,signup,login,forgoten,reset}

