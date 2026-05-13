const express=require('express')
const { getData, postData, patchData, deleteData, login, signup, forgoten, reset } = require('../controllers/user.controller')
const router=express.Router()

router.get("/",getData)
router.post("/",postData)
router.patch("/:id",patchData)
router.delete("/:id",deleteData)
router.post("/login",login)
router.post("/signup",signup)
router.post("/forgot",forgoten)
router.post("/reset/:token",reset)
module.exports=router