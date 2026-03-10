const express = require("express")
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")

const USER_SAFEDATA =["firstName,lastName,emailId,skills"]

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
              }).populate("fromUserId")
            res.json({
                message:"Data fetched successfully",
                data: connectionRequests,
            })
                
    }
            catch(err){
                req.statusCode(400).send("Error :"+err.message)
            }
  
})
userRouter.get("/user/connections",userAuth,async(req,res)=>{
   try{
       const loggedInUser = req.user
   
    const connectionRequests = await ConnectionRequest.find({
        $:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"},
          
        ],
    }).populate("fromUserId",USER_SAFEDATA).populate("toUserId",USER_SAFEDATA)
    const data= connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
    })
res.json({data})
   }
   
    catch(err){
        res.status(400).json({message:"invalid request"})
    }

   
})

module.exports = userRouter