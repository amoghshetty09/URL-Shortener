const {getUser}=require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next)
{
    const userUid=req.cookies?.uid; // ? if u get error as properties of undefined pointing on req.cookie.....
    if(!userUid) return res.redirect("/login");
    const user=getUser(userUid);

    if(!user) return res.redirect("/login");
    req.user=user;
    next();
}

async function checkAuth(req,res,next)
{
    const userUid=req.cookies?.uid; // ? if u get error as properties of undefined pointing on req.cookie.....
  
    const user=getUser(userUid);


    req.user=user;
    next();
}

module.exports={
    restrictToLoggedinUserOnly,checkAuth,
}