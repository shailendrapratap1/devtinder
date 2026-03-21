const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true  ,
        ref:"User",
        minLength:5,
        maxLength:50
    },
    lastName:{
        type: String,
        ref:"User",

    },
    emailId:{
        type:String,
          lowercase:true,
        required:true,
        ref:"User",
        unique:true,
      trim:true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email address: " + value);
        }
      }
    },
    password: {
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is too weak: " + value)
            }
        }
    },
   age: {
type:   Number,
min:18
    },
    gender:{
        type:String,
        enum:{
            values:["Male","Female","others"],
            message:`{VALUE} is incorrect  gender`
        },
        ref:"User",
        // validate(value){
        //     if(!['male','female','others'].includes(value)){
        //         throw new Error("Gender data is not valid")
        //     }
        // }
      
    },
    photoUrl:{
        type:String,
        ref:"User",
        default:"./img/pexels-artem-yellow-422929671-36532019.jpg"
    ,     validate(value){
        if(!validator.isURL){
            throw new Error("url is not written correctly or it is too long")
        }
    }},
    about:{
        type:String,
        default:"this is default about user"
    },  
    skills:{
        type :[String],

    },
   


},{timestamps:true})

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id: user._id},"DEV@TNDER$8578",{
        expiresIn:"7d",
    })
    return token
}
userSchema.index({firstName:1})

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )
    return isPasswordValid
}

module.exports = mongoose.model("User",userSchema) 