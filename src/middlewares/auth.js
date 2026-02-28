 const adminAuth = (req,res,next)=>{
    console.log("Admin is getting checked")
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request")
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log("user uth is gettinf checked")
    const token ="xyzssss"
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized content")
    }else{
        next()
    }
}
module.exports = {
    adminAuth,userAuth,
}