  const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://namaste:AcsTC2sf5Ny1qe6Q@namastenode.ndnjmam.mongodb.net/devTinder"
    )
}


module.exports = connectDB; 

// connectDB().then(()=>{
//  console.log("Database connection established")
// }).catch(err=>{
// console.log("Database cannot be connected")
// })