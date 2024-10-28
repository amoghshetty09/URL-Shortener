//   This is like a diary where you write teh id of users who are part of your website
// const sessionIdToUserMap=new Map();

// function setUser(id,user)
// {
//     return sessionIdToUserMap.set(id,user);
// }

// function getUser(id)
// {
//     return sessionIdToUserMap.get(id);
// }

// module.exports={
//     setUser,getUser // to the controller
// }


//  Stateless   //

const jwt=require("jsonwebtoken");
const secret="Piyush$123";  //  Acts as a stamp of ticket

function setUser(user)  // user ke liye token assignmnet
{
    const payload={
        
        _id:user._id,
        email:user.email,
    }

    return jwt.sign(payload,secret);
}

function getUser(token)
{
    if(!token)return null;
    try{                                    // try and catch is used bcz if we use wrong token then server won't crash instead go to previus page
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
  
}

module.exports={
    setUser,getUser // to the controller
}