import mongoose  from "mongoose";

const converschema=new mongoose.Schema({
    chatpersons:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
  }],
   lastmessage:{
      text:'String',
      sender:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'user'
      },
      isseen:{
          type:Boolean,
          default:false
      }
   }
},{timestamps:true})

const conversation=mongoose.model('conversation',converschema)

export default conversation;