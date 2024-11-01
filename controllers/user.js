// const User=require("../models/user");
// const {v4:uuidv4}=require("uuid");
// const {setUser}=require("../service/auth");

// async function signup(req,res){
//     const{name,email,password}=req.body;
//     await User.create({
//         name,
//         email,
//         password,
//     });
//     return res.render("login");  // after u click signup u will be displayed home page directly 
// }

// async function userlogin(req,res){
//     const{email,password}=req.body;
//     const user=await User.findOne({email,password});
//     if(!user)
//         return res.render("login",{
//             error:"Invalid Username or Password"
//         });
//         const sessionId=uuidv4();
//         setUser(sessionId,user);
//         res.cookie("uid",sessionId);    // uid here is the name of the cookie
//         return res.redirect("/");
// }

// module.exports={
//     signup,userlogin,
// }


//   STATE LESS //

const User=require("../models/user");
const {v4:uuidv4}=require("uuid");
const {setUser}=require("../service/auth");

async function signup(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("login");  // after u click signup u will be displayed home page directly 
}

async function userlogin(req,res){
    const{email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user)
        return res.render("login",{
            error:"Invalid Username or Password"
        });

       const token= setUser(user);
        res.cookie("uid",token);    // uid here is the name of the cookie
        return res.redirect("/");
}

module.exports={
    signup,userlogin,
}