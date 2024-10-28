const mongoose=require("mongoose");

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
    craetedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
},{timestamp:true});

const URL=mongoose.model("amogh",urlSchema);

module.exports=URL;