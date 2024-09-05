
import mongoose  from "mongoose";

const messageschema=new mongoose.Schema({
    conversationid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'conversation'
    },  
    sender:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'   
    },
    text:String,
    isseen:{
        type:Boolean,
        default:false
    },
    file:{
      type:String
    },
    img:{
        type:String,
        default:''
    }
},{timestamps:true})

const messagemodel=mongoose.model('message',messageschema)

export default messagemodel;