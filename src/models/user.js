const mongoose = require("mongoose")

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
    },
    password: {
        type:String,
        required:true
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
    },
    about:{
        type:String,
        default:"this is default about user"
    },  
    skills:{
        type :[String],

    },
   


},{timestamps:true})
module.exports = mongoose.model("User",userSchema)