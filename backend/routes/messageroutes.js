import conversation from "../model/converschema.js"
import messagemodel from "../model/messageschema.js"
import { getUserid, io } from "../socket/socketserver.js";
import {v2 as cloudinary} from 'cloudinary'



const createmessage=async(req,res)=>{
    try{
        const {recevierid,text} = req.body
        const sender=req?.user?._id 
        let {img} =req.body

        let conservation=await conversation.findOne({
            chatpersons:{$all :[recevierid,sender]}
        })
        
        if (!conservation)
        {
            conservation = new conversation({
              chatpersons:[sender,recevierid],
              lastmessage:{
                text:text,
                sender:sender
              } 
            })
           await conservation.save()
        }
        if(img)
            {
             const uploadedimg= await cloudinary.uploader.upload(img)
             img=uploadedimg.secure_url
           }
        
           const message=new messagemodel({
            conversationid:conservation._id,
            sender:sender,
            text:text,
            img:img || ''
           })
           
           await Promise.all([
            message.save(),
            conservation.updateOne({
             lastmessage:{
                text:text,
                sender:sender,
             } 
            })
        ])

        const Userid=getUserid(recevierid)
    
     if(Userid)
      {
       io.to(Userid).emit('messages',message)
      }
       res.status(201).json(message)
    }
    catch(err)
    {
        console.log(err)
    }
}


const getmessage=async(req,res)=>{
    try   
    {
     const userid=req.user._id;
     const {chatid}=req.params;
  
     const conervation= await conversation.findOne({
      chatpersons:{$all:[chatid,userid]}
     })
   
     if(!conervation)
      {
        return   res.json({error:'conservation is not created'})
      }
  
     const message= await messagemodel.find({
      conversationid:conervation._id,
     }).sort({createdAt:1}) 
     
     res.json(message)
  
    }
    catch(e)
    {
        console.log(e)
    }
  }

  const getchatinfo=async(req,res)=>{
    try
    {
     const userid=req.user._id
  
   
     let conversations = await  conversation.find(
      {chatpersons:userid})
     .populate({
      path:"chatpersons",
      select:"username profilepic" 
     })
      
     conversations.forEach((conversation)=>{
     conversation.chatpersons 
     = conversation.chatpersons.filter((person)=>
      person._id.toString() !== userid.toString()) 
     })
     res.status(200).json(conversations)
   
    }
    catch(e)
    {
     res.status(500).json({error:e.message});
    }
  }

  
  export {
      createmessage,
      getmessage,
      getchatinfo
  }

  
