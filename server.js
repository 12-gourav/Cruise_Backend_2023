import mongoose from "mongoose";
import express from "express";
import Cruise from "./schema/cruiseSchema.js"
import cors from "cors";
import Review from "./schema/reviewSchema.js";
import User from "./schema/user.js";
import Login from "./schema/login.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


mongoose.connect(
  "mongodb+srv://yug:9826112003@cluster0.1lluo.mongodb.net/?retryWrites=true&w=majority"
).then(()=>{
  console.log("database connected successfully :)")
})
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname,'../client/dist')));

// app.get('*',function(req,res){
//   res.sendFile(path.join(__dirname,'../client/dist/index.html'));
// });

const port = process.env.PORT || 3000;

app.post("/cruise/create",async (req, res) => {
try {
  const {name,dis,date,start,end,banner,names} = req.body
  const cruise = await Cruise.create({name:name, 
    description:dis,date:date,startLocation:start,endLocation:end,BannerLink:banner,
    SomeMoreImages:names});
    res.status(200).json(cruise);
} catch (error) {
  res.status(400).json({message:error});
}

    
});


app.post("/cruise/delete", async (req, res) => {
  const cruise = await Cruise.findByIdAndDelete(req.body.id);
  res.status(200).json(cruise);
});

app.get("/cruise/get", async (req, res) => {
  const cruise = await Cruise.find().sort({createdAt:-1});
  res.status(200).json(cruise);
});
app.get("/cruise/get2", async (req, res) => {
  const cruise = await Cruise.find().sort({createdAt:-1}).limit(9);
  res.status(200).json({data:cruise});
});
app.post("/cruise/get2", async (req, res) => {
  console.log(req.body._id);
  const cruise = await Cruise.findById({_id:req.body._id});
  res.status(200).json(cruise);
});

app.put("/cruise/update", async(req, res) => {
  const {namew,dis,datew,start,end,banner,names,id} = req.body
    const cruise = await Cruise.findByIdAndUpdate({_id:id},{name:namew, 
      description:dis,date:datew,startLocation:start,endLocation:end,BannerLink:banner,
      SomeMoreImages:names});
    res.status(200).json(cruise);
});

app.post("/user/create",async(req,res)=>{
  const {name,email,msg} = req.body;
  const data = await User.create({name:name,email:email,msg:msg})
  res.status(201).json({message:"data saved",data:data});
})

app.get("/user/get",async(req,res)=>{

  const data = await User.find().sort({createdAt:-1});
  res.status(201).json({message:"data saved",data:data});
})


// Review
app.post("/review/create",async (req, res) => {
  const {  name,
    review,
    date,
    star,
    cid,
    imgLink,} = req.body;
    const cruise = await Review.create({name:name,review:review,
      date:date,star:star,cruiseSlug:cid,imageLink:imgLink});
    res.status(200).json(cruise);
});

app.post("/login",async (req, res) => {
  const {  email,password} = req.body;
    const user = await Login.findOne({$and:[{email:email,password:password}]});
    if(user){
      return  res.status(200).json({success:true,user:user});
    }
    res.status(200).json({success:false});
});



app.post("/review/delete", async (req, res) => {
  const cruise = await Review.findByIdAndDelete(req.body.id);
  res.status(200).json(cruise);
});

app.get("/review/get", async (req, res) => {
  const cruise = await Review.find();
  res.status(200).json(cruise);
});

app.get("/",(req,res)=>{
  res.status(200).json({message:"server is running perfect"});
});






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
