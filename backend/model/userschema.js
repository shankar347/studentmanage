import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
 
 username:{
    type:String,
    required:true,
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:true,
    minLength:6
 },
 profilepic:{
    type:String,
    default:""
 },
 followers:
 {
  type:[String],
  default:[]
 },
 following:
 {
    type:[String],
    default:[]
 },
 bio:{
    type:String,
    default:""
 },
 college:{
    type:String,
    default:''
 },
 department:{
    type:String,
    default:''
 },
 isfa:{
    type:Boolean,
    default:false
 }
},
{
   timestamps:true
})

const Usermodel=mongoose.model('user',UserSchema);

export default Usermodel;