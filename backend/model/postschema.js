import mongoose from "mongoose";


const likeschmea=new mongoose.Schema({
    name:{
        type:String
    },
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    }
},{timestamps:true})

const replyschma=new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    comment:
    {
        type:String,
        required:true,
    },
    profilepic:
    {
        type:String
    },
    name:{
        type:String,
    }
},{timestamps:true})

const PostSchema=new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    adminname:{
        type:String
    },
    adminprofilepic:{
        type:String
    },
    text:{
        type:String,
        maxLength:500,
    },
    img:{
        type:String
    },
    file:{
     type:String
    },
    filename:{
        type:String
    },
    likes:[likeschmea],
    replies:[replyschma]
},
{
    timestamps:true
})

const Postmodel=mongoose.model('Post',PostSchema)

export default Postmodel;