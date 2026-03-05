   const express = require("express");
   
// // app.use("/user",(req,res)=>{
// //     res.send("hahahahah")
// // })
// // app.get("/user",(req,res)=>{
// //     res.send({firstName:"akhshat",
// //         lastname:"singh"
// //     })
// // })
// app.post("/user",(req,res)=>{
//     res.send("user is resent")
// })
// app.put("/user",(req,res)=>{
//     res.send("putted the user")
// })
// app.patch("/hello",(req,res)=>{
//     res.send("user has been patched")
// })
// app.delete("/user",(rq,res)=>{
//     res.send("user has been deleted")
// })
//     app.use("/hello",(req,res)=>{
//         res.send("Hello hello hello")
//     });
//     app.head("/user",(req,res)=>{
//         res.send("user result has been headed")
//     })
//     app.options("/user",(req,res)=>{
//         res.send("user has options")
//     })

//     // app.use("/test",(req,res)=>{
//     //     res.send("llo from the dashboardr")
//     // })
// //  app.use("/",(req,res)=>{
// //         res.send("Hello from the dashboard")
// // //     });


// // // app.get("/a/",(req,res)=>{
// // //     res.send({firstName:"Akshay",lastName:"shaini"})
// // // // })
// // // app.get(/.*fly$/,(req,res)=>{
// // //     console.log(req.query(req,res))
// // //     res.send("getting data")
// // // } ) 



// // app.get("/user/:userId/:name/:password",(req,res)=>{
// // console.log(req.params);
// // res.send({firstName:"Akshay",lastName:"Saini"})
// // })

// //  app.use("/route",rH,[rh2,rh3],rh4,rh5)

//  // GET /users => miidleware chain => requeat haandler

// // app.use("/",(req,res,next)=>{
// //     // res.send("Handling / route")
// //     next()
// // })
// // app.get( 
// //     "/user",
    
// //     (req,res,next)=>{
// //     // Route handler 
// //     // res.send("Route handler 1")
// //     res.send("2nd route hanser")
// //     // console.log(" handling the route user")
// //      next()
    
    
// // },
// // (req,res,next)=>{
// //     // console.log("sending the res")
// //     res.send(" 2nd response")
// //     next()
   
// // } ,
// // //     ],
// // (req,res,next)=>{
// //     // console.log("sending the res")
// //     res.send("2nd route handler response")
// //     // next()
// // } 
// // // (req,res,next)=>{
// // //     console.log("sending the res")
// // //     res.send(" 4th response")
     
// // // }   
// // )
// app.get("/admin/getAllData",(req,res)=>{
//     // Logic of chunking the request ia authorised
//     const token = "xyzjkjk"
//     const isAdminAuthorized = token === "xyz";
//     if(isAdminAuthorized){
//         res.send("Alldata SENT")
//     }
//     else{
//         res.status(401).send("unathourized")
//     }
// })
// app.get("/admin/deleteUser",(req,res)=>{
//     // logic of checking if adin is authorized
//     res.send("Delete a user")
// })

// const { adminAuth,userAuth }
// = require("./middlewares/auth");
// app.use(" /admin",adminAuth); 

// app.post("/user/login",(req,res)=>{
//     res.send("logged in successfully")
// })
// app.get("/user",userAuth,(req,res)=>{
//     res.send("User data sent")
// })
// app.get("/admin/getAllData",(req,res)=>{
//     res.send("user data sent")
// })
// app.get("/admin/deleteData",(req,res)=>{
//     res.send("data deleted")
// })
//    app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("something went wrong")
//     }
//    })
//    app.get("/getUserData",(req,res)=>{
// try{
//     // logic of db call and getuser data

//     throw new Error("dvbzhjf");
//         res.send("User Data Sent")
//     }
//     catch(err){
//         res.status(500).send("some error occured")
//     }
// })
    
const connectDB =  require("./config/database")
 const app = express();  
 const User = require("./models/user")
app.use(express.json())
 app.post("/signup",async(req,res)=>{
   // Creating a new insatnce of the use model
    const user = new User(req.body)
 
     
   
   try{
     await user.save()
     res.send("user added successfully")
   }catch(err){
     res.status(400).send("Error saving the user:"+ err.message)
   }
  
  
 })

 app.get("/user",async(req,res)=>{
  const  userEmail = req.body.emailId;
  
  try{
    const users = await User.find({emailId:userEmail});
    if(users.length === 0){
      res.status(404).send("User not found");
    }else{
      res.send(users);
    }
  }catch(err){
    res.status(400).send("Something went wrong")
  }
 })
app.get("/feed",async(req,res)=>{

  try{
    const users = await User.find({});
    res.send(users)
  }
  catch(err){
    res.status(400).send("Something went wrong")
  }
})

app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId;

  try{
  const user = await User.findOne({emailId:userEmail});
  res.send(user)
  }catch(err){
    res.status(400).send("Something went wrong")
  }
})

app.delete("/user",async(req,res) => {
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully")
  }catch(err){
    res.status(400).send("something went wrong")
  }
})

app.patch("/user",async(req,res)=>{
  const userId= req.body.userId;
  const data = req.body;
  console.log("data")
  try{
    const user = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true})
   console.log(user)
    res.status(400).send("user update successfully")
  
  }catch(err){
    res.status(400).send("something went wrong"+ err.message)
  }
})

 connectDB().then(()=>{
 console.log("Database connection established")
  app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777.....")
    })   
}).catch(err=>{ 
console.log("Database cannot be connected")
})
  