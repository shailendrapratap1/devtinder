   const express = require("express");
    const app = express();
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
// //     });


// // app.get("/a/",(req,res)=>{
// //     res.send({firstName:"Akshay",lastName:"shaini"})
// // // })
// // app.get(/.*fly$/,(req,res)=>{
// //     console.log(req.query(req,res))
// //     res.send("getting data")
// // } ) 



// app.get("/user/:userId/:name/:password",(req,res)=>{
// console.log(req.params);
// res.send({firstName:"Akshay",lastName:"Saini"})
// })

//  app.use("/route",rH,[rh2,rh3],rh4,rh5)

 // GET /users => miidleware chain => requeat haandler

// app.use("/",(req,res,next)=>{
//     // res.send("Handling / route")
//     next()
// })
// app.get( 
//     "/user",
    
//     (req,res,next)=>{
//     // Route handler 
//     // res.send("Route handler 1")
//     res.send("2nd route hanser")
//     // console.log(" handling the route user")
//      next()
    
    
// },
// (req,res,next)=>{
//     // console.log("sending the res")
//     res.send(" 2nd response")
//     next()
   
// } ,
// //     ],
// (req,res,next)=>{
//     // console.log("sending the res")
//     res.send("2nd route handler response")
//     // next()
// } 
// // (req,res,next)=>{
// //     console.log("sending the res")
// //     res.send(" 4th response")
     
// // }   
// )
app.get("/admin/getAllData",(req,res)=>{
    // Logic of chunking the request ia authorised
    const token = "xyzjkjk"
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        res.send("Alldata SENT")
    }
    else{
        res.status(401).send("unathourized")
    }
})
app.get("/admin/deleteUser",(req,res)=>{
    // logic of checking if adin is authorized
    res.send("Delete a user")
})


    app.listen(7777,()=>{
        console.log("Seer is successfully listening on port 7777.....")
    })  

