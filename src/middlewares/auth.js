//  const adminAuth = (req,res,next)=>{
//     console.log("Admin is getting checked")
//     const token = "xyz"
//     const isAdminAuthorized = token === "xyz"
//     if(!isAdminAuthorized){
//         res.status(401).send("unauthorized request")
//     }else{
//         next();
//     }
// }

// const userAuth = (req,res,next)=>{
//     console.log("user uth is gettinf checked")
//     const token ="xyzssss"
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized content")
//     }else{
//         next()
//     }
// }
// module.exports = {
//     adminAuth,userAuth,
// }

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req,res,next)=>{
  
    try{

    const { token } =  req.cookies;
      if(!token){
        throw new Error("token is invalid")
    } 
const decodedObj = await jwt.verify(token,"DEV@TNDER$8578");

const { _id} = decodedObj;

const user = await User.findById(_id);
if(!user){
    throw new Error("User not found")
}
req.user = user
next()
}   
catch(err){
    res.status(400).send("Error: " + err.message)
}

}


module.exports ={
    userAuth,
}