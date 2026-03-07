const mongoose = require("mongoose")
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true  ,
        minLength:5,
        maxLength:50
    },
    lastName:{
        type: String,

    },
    emailId:{
        type:String,
          lowercase:true,
        required:true,
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
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
      
    },
    photoUrl:{
        type:String,
        default:"https://www.bing.com/images/search?view=detailV2&ccid=i%2f1HL4I1&id=36293A16CA5963514E1D4AC288D98B55CC1135F0&thid=OIP.i_1HL4I1H9SznR11omKPFwHaHo&mediaurl=https%3a%2f%2fcanto-wp-media.s3.amazonaws.com%2fapp%2fuploads%2f2019%2f08%2f19194138%2fimage-url-3.jpg&exph=824&expw=800&q=image+url+free&FORM=IRPRST&ck=D83B0DEB3D6E8839583550834CB38EAD&selectedIndex=12&itb=0"
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