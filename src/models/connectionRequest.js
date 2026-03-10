const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{Value}  is incorrect status type`,
        },
    },

},
{timestamps:true})


connectionRequestSchema.index({fromUserIf:1,toUserId:1}); 


connectionRequestSchema.pre("save",function(){
    const connectionRequest  = this;
// check if the fromuserid is same as toUserid
if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new  Error("Cannot send connection request to yourself")
}
next();   

}) 


 const connectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
 )

 module.exports = connectionRequestModel



