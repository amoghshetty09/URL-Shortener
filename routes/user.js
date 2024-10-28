const express=require("express");
const router=express.Router();
const {signup,userlogin}=require("../controllers/user");


router.post("/",signup);
router.post("/login",userlogin);

module.exports=router;