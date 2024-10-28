const express=require("express");
const router=express.Router();

const{getshorturl,getanalytics}=require("../controllers/url");

router.post("/",getshorturl);   // here "/"" means("/url") and this router is linked with the form in home page where action="/url" so action in form and 1st para in post should be same 

router.get('/analytics/:shortId',getanalytics);
module.exports=router;

