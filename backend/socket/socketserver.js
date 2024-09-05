import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
import messagemodel from '../model/messageschema.js'
import conversation from '../model/converschema.js'


const app=express()

const server=http.createServer(app)

const io = new Server(server,{
    cors: {
    origin:'http://localhost:3000',
    methods:["GET","POST"]
    }
})

// console.log(io)


export const getUserid=(userid)=>{
    return usersocketarray[userid]
}

const usersocketarray={}

io.on("connection",(server)=>{

    console.log('connected with',server.id);
    
    const userId=server.handshake.query.userId;
    
    if(userId != 'undefined') usersocketarray[userId]=server.id
        
    
    
     io.emit('getOnlineUsers',Object.keys(usersocketarray))


     server.on('makemessageasSeen',async({conversationid,userid})=>{
     try
     {
      await messagemodel.updateMany({conversationid:conversationid,
        isseen:false},{$set:{isseen: true}})
      await conversation.updateOne({_id:conversationid},
        {$set :{"lastmessage.isseen" : true}}
      )  
      io.to(usersocketarray[userid]).emit('messageseenbyuser',
      {conversationid}) 
    }
     catch(e)
     {
        console.log(e)
     }  

     })

      server.on('disconnect',()=>{
        console.log('user disconnected',server.id )
        
        delete usersocketarray[userId]

        io.emit('getOnlineUsers',Object.keys(usersocketarray))
        
       
    })
})


export {
    server,
    app,
    io
}