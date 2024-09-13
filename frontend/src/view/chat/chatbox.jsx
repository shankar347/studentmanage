import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
// import bluetick from '../assets/correct.png'
import Messagebox from './messagebox'
import Inputfile from './inputfile'
import { useRecoilState, useRecoilValue } from 'recoil'
import chatperson from '../atom/chatpersonatom'
import useratom from '../atom/useratom'
import { usesocket } from '../socket/socketcontext'
import chatatom from '../atom/chatatom'
import tone1 from '../notification/tone1.mp3'

const Chatbox = () => {

  const [chatinfo,setchatinfo]=useRecoilState(chatperson)
  const [messages,setmessages]=useState([])
  const [chat,setchat]=useRecoilState(chatatom)
  const [loading,setloading]=useState(false)
  const currentuser1=useRecoilValue(useratom)
  let currentuser=currentuser1?.token
  const toast=useToast()
  const {socket}=usesocket()
  const scrollmessageref=useRef(null)
  console.log(chatinfo)     
  
  const lastmessagebyother= messages.length &&
  messages[messages.length - 1 ].sender  !== currentuser._id
  console.log(lastmessagebyother)

  // useEffect(()=>{
  //   const getmessages=async()=>{
  //   try
  //   {
  //     setloading(true)
  //    const res = await fetch(`/api/message/${chatinfo.userid}`)
  //    const data=await res.json()
  //    console.log(data)
  //   }
  //   catch(e)
  //   {
  //     console.log(e)
  //   }
  //   finally{
  //     setloading(false) 
  //   }
  // }
  // getmessages()
  // },[chatinfo.userid])

  useEffect(()=>{
    
    const lastmessagebyother= messages.length &&
    messages[messages.length - 1 ].sender  !== currentuser._id

    
    if(lastmessagebyother)
      {
        socket.emit('makemessageasSeen',{
          conversationid:chatinfo.chatid,
          userid:chatinfo.userid
        })
      }
    
    socket.on('messageseenbyuser',({conversationid})=>{
      if(chatinfo.chatid === conversationid)
        {
         setmessages((messages)=>messages.map((message)=>{
            if(!message.isseen)
              {
                return {
                  ...message,
                  isseen:true
                }
              }
              return message;
         }
        ))
        }
    })

  },[chatinfo.chatid,socket,messages,chatinfo.userid])

 useEffect(()=>{

   scrollmessageref?.current?.scrollIntoView({behavior:'smooth'})
 
  },[messages])

  useEffect(()=>{

    socket.on('messages',(message)=>{

    if(message.conversationid === chatinfo.chatid )
    {
       setmessages((prevmessage)=>[...prevmessage,message])
    }
    
    if(!document.hasFocus()){
    const notification= new Audio(tone1)
    notification.play() 
    }
    
    setchat((chats)=>
      {
      const targetchat =  chats.map((eachchat)=>{
      if(eachchat._id === message.conversationid )
        {
          return {
            ...eachchat,
            lastmessage:{
              text:message.text,
              sender:message.sender
            }
          } 
      
        }
      return eachchat;
    })
    return targetchat;
   })
   })
   return () => socket.off('messages')
  },[socket,chatinfo,setchat])
  
  useEffect(()=>{
  const getmessages=async()=>{
    try
    { 
     if(chatinfo.newchatcheck) 
      {
        return;
      } 
      setloading(true)
      setmessages([])
     const res=await fetch(`/api/message/${chatinfo.userid}`)
     const data=await res.json()
     if(data.error)
      {
        toast({
          title:'error',
          status:'error',
          description:data.error
        })
        return;
      }

     setmessages(data)
    }
    catch(e)
    {
      console.log(e)
    }
    finally{
      setloading(false)
    }
  }

  getmessages()

  },[chatinfo.userid,chatinfo.newchatcheck])

  return (
   <Flex fontFamily={'sans-serif'}
    flex={70} 
    bg={useColorModeValue('gray.300','gray.dark')}
    borderRadius={'md'}
    flexDir={'column'}
     >
    <Flex p={'2'} gap={'2'} alignItems={'center'}>
     <Avatar name={chatinfo.username} 
     size={{
        base:'xs',
        sm:'sm',
        md:'sm'
     }}
     src={chatinfo.profilpic}/>
     <Flex  alignItems={'center'}>
     <Text 
     fontSize={{
        md:'md',
        base:'xs',
        sm:'sm'}}
      fontWeight={500}>
     {chatinfo.username}
     </Text>
     {/* <Image src={bluetick} w={4} 
     mt={'-6px'} h={4}/> */}
     </Flex>      
    </Flex>
    <Divider/>

  <Flex p={'1'} flexDirection={'column'}
    gap={'4'} my={'4'}
    overflowY={'auto'} height={'400px'} maxH={'400px'}>
     {loading && ([...Array(6)].map((_,i)=>(
      
        <Flex 
      key={i}
      gap={'3'}
       alignItems={'start'}
       my={'10px'}
       alignSelf={i % 2 ===0 ?'flex-start' : 'flex-end'}
       >
       {i % 2 ===0 && <SkeletonCircle size={'7'}/> }
       <Flex flexDirection={'column'} gap={'5px'}>

       <Skeleton h={'35px'} w={'250px'} borderRadius={'5px'}/>
       {/* <Skeleton h={'15px'} w={'250px'}/>     */}
       {/* <Skeleton h={'35px'} w={'250px'} borderRadius={'5px'}/>  */}
    
       
        </Flex>
       {i % 2 !==0 && <SkeletonCircle size={'7'}/> }
      </Flex>   
      )))}
      
    {  !loading && messages && messages?.map((message,index)=>(
     <Flex   key={message._id}
     ref={messages.length - 1 ===
       messages.indexOf(message) ?
        scrollmessageref : null}
     flexDirection={'column'}>
     <Messagebox 
      yourmessage={message.sender === currentuser._id }
      message={message}
      prevmessage={index >0 ? messages[index - 1] : null}/>
    </Flex>
    ))
      }
    </Flex>
     <Inputfile setmessages={setmessages}/>
   </Flex>
  )
}

export default Chatbox