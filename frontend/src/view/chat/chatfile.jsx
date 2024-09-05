// import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Personalchat from './personalchat'
import Chatbox from './chatbox'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import chatatom from '../atom/chatatom'
import { FaSearch } from 'react-icons/fa'
import { GiConversation } from 'react-icons/gi'
import chatperson from '../atom/chatpersonatom'
import { usesocket } from '../socket/socketcontext'

const Chatfile = () => {

  const [loadinguser,setloadinguser]=useState(false)
  const [chatuser,setchatuser]=useRecoilState(chatatom)
  const [selectedcchat,setselectedchat]=useRecoilState(chatperson)
  const [searchbar,setsearchbar]=useState('')
  const [fetchinguser,setfetchinguser]=useState(false)
  const user=useRecoilValue(useratom)
  const toast=useToast()
  const {socket,onlineusers}=usesocket()
  console.log(selectedcchat)
  console.log( 'Chat user',chatuser)
  useEffect(()=>{
  const getchatpersons = async()=>{
    try
    {
      setloadinguser(true)
     const res=await fetch(`/api/message/conversation`)
     const data=await res.json()
     setchatuser(data)
    }
    catch(e)
    {
      console.log(e)
    }
    finally{
      setloadinguser(false)
    }
  }   
  getchatpersons()
  },[setchatuser])
 
  
  
  useEffect(()=>{
   
    socket?.on('messageseenbyuser',({conversationid})=>{
      setchatuser((chats)=>chats.map((chat)=>{
        if(chat._id === conversationid)
          {
            return {
              ...chat,
              lastmessage:{
                ...chat.lastmessage,
                isseen:true
              }
            }
          }
          return chat;
      }))
    })

  },[socket,setchatuser])
  
  const {colorMode} =useColorMode()

  const handleinputchange=async(e)=>{
    
    try
    {
    setfetchinguser(true)
     const res= await fetch(`/api/user/profilename/${searchbar}`)
     const searcheduser=await res.json()
      
     if(searcheduser.error)
      {
         toast({
          title:'Error',
          status:'error',
          description:searcheduser.error
         })
         return
      }
    
    if(searcheduser._id === user._id)
    {
     toast({
      status:'error',
      description:'Cannot message to yourself'
     })
     return;
    } 
     
    let existingchat=chatuser.find((chat)=>
    chat.chatpersons[0]._id === searcheduser._id) 
   
    if(existingchat)
      {
        setselectedchat({
          chatid:existingchat._id,
          userid:searcheduser._id,
          username:searcheduser.username,
          profilpic:searcheduser.profilpic
        })
        return
      }

     let newchat={
       newchatcheck:true,
       chatpersons:[{
        _id:searcheduser._id,
        name:searcheduser.username,
        profilpic:searcheduser.profilpic
       }],
       _id:Date.now(),
       lastmessage:{
        text:'',
        sender:''
       }
     }

       setchatuser((existingchat)=>[...existingchat,newchat])
    }
    catch(e)
    {
      console.log(e)
    }
    finally{
      setfetchinguser(false)
    }
  }

  return (
   <Box 
   position={'absolute'} w={{
    base:'100%',
    md:'80%',
    lg:'750px'
   }}
   left={'50%'}
   transform={'translateX(-50%)'}
   >
    <Flex 
    gap={'4'}
  // flexDir={'row'}
  flexDirection={{
    base:'column',
    md:'row'
}}
    maxW={{
        sm:'400px',
        md:'full'
    }}
    mx={'auto'}>
   <Flex flexDirection={'column'}
   gap={'2'} 
   maxW={{
    sm:'250px',
    md:'full'
   }} flex={30}
   mx={'auto'}
   >
    
   <Flex alignItems={'center'} gap={'5px'}>
   <Input placeholder='Search...' width={'full'}
   value={searchbar}
      
   onClick={()=>{
    setselectedchat({
      chatid:'',
      userid:'',
      username:'',
      profilpic:''
    })
   }}   onChange={(e)=>setsearchbar(e.target.value)}/>
   <Button 
   bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
   color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}>
    <FaSearch 
     onClick={handleinputchange}/>
   </Button>
   </Flex>
   {
    loadinguser &&(
     [0,1,2,3,4].map((_,i)=>(
      <Flex key={i} alignItems={'center'}
      gap={'17px'}>
       <Box>
        <SkeletonCircle size={'12'}/>
        </Box> 
        <Flex width={'full'} flexDirection={'column'} gap={'4'}>
         <Skeleton h={'7px'} w={'16'}/>
         <Skeleton h={'5px'} w={'full'}/>
         </Flex>
        </Flex>
     )) 
    )
   }

   {!loadinguser && (
    <Flex flexDirection={'column'}
    // height={'460px'}
    gap={'2px'} 
    maxH={'460px'}  overflowY={'auto'}>
       {chatuser?.map((chatuser)=>(
    <Personalchat
    isonline={onlineusers?.includes(chatuser?.chatpersons[0]._id)}
    key={chatuser?._id} 
    chatuser={chatuser}/> 
   )) 
   }
    </Flex>
   )  
  }
</Flex>
   {selectedcchat.userid === user._id 
   || selectedcchat.chatid.length === 0 ?
   <Flex 
   flex={70}
   height={'520px'}
   bg={useColorModeValue('gray.300','gray.dark')}
   borderRadius={'md'}
   alignItems={'center'}
   flexDirection={'column'}
   gap={'20px'}
   pt={'40px'}
   color='blue.300' 
   >
    <GiConversation size={'200'}/>
    <Text fontSize={'xl'}  
    color={colorMode === 'dark' ? 'white' : 'black'}>
      Select your friend to chat...
    </Text>
   </Flex> : ''
    }
    { selectedcchat.chatid.length !== 0  ?
   <Chatbox/> : ''
    }
   </Flex> 
   </Box>
   
  )
}

export default Chatfile