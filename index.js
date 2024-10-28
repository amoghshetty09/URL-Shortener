const express=require("express");
const path=require("path"); //  for ejs 
const {restrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth");
const {connectmongodb}=require("./connection");
const URL=require("./models/url");

// getting the cookies  //
const cookieParser=require("cookie-parser");
//
const app=express();

//   ROUTES     //  
const urlRoute=require("./routes/url");
const staticrouter=require("./routes/staticrouter");
const userRoute=require("./routes/user");
//

//         CONNECTION       //
connectmongodb("mongodb://localhost:27017/URL-SHORTENER")
.then(()=>console.log("MongoDB connected"));
//

// EJS TEMPLATE ENGINE  //
app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));
//

//  MIDDLEWARES //  
app.use(express.json());
app.use(express.urlencoded({extended:false}));  // for form data
app.use(cookieParser());    // necessary to use cookies

app.use("/url",restrictToLoggedinUserOnly,urlRoute);    // means if u want to use "/url" then must be logged in // IT IS A INLINE MIDDLEWARE    //
app.use("/",checkAuth,staticrouter);
app.use("/user",userRoute);


//

// app.get('/test',async(req,res)=>{
//     const allurls=await URL.find({});
//     return res.end(`
//         <html>
//         <head></head>
//         <body>
//         <ol>
//         ${allurls.map(url=>`<li>${url.shortId}-${url.redirectURL}-${url.visitHistory.length}</li>`).join('')}
//         </ol>
//         </body>
//         </html>
//         `)
// });

app.get('/test',async (req,res)=>{
    const allurls=await URL.find({});
    return res.render("home",{
        urls:allurls,                   // we can send parameter in render for home/html page and gave to use the same name that is urls
    })
})

app.get('/url/:shortId',async(req,res)=>
    {
        const shortId=req.params.shortId;
       const entry= await URL.findOneAndUpdate({
            shortId
        },{
            $push:{
                visitHistory:{
                    timestamp:Date.now(),
                },
            },
        });
    res.redirect(entry.redirectURL);
    });

app.listen(8000);
