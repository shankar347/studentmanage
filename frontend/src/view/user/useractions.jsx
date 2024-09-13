import { Avatar, Box, Button, Flex, FormControl,
    Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton,
     ModalContent, ModalFooter, ModalHeader, ModalOverlay
     , Portal, Text, background, border, color, useDisclosure, useToast } from '@chakra-ui/react'
 import React, { useEffect, useRef, useState } from 'react'
 import { useRecoilValue } from 'recoil'
 import { AiFillEdit, AiOutlineEdit }from 'react-icons/ai'
 import useratom from '../atom/useratom'
 import { FaCheck, FaTimes } from 'react-icons/fa'
 import { CgCross, CgMore, CgTikcode } from 'react-icons/cg'
 import {formatDistanceToNow} from 'date-fns'
 import Timecomponent from '../hooks/timecompnent'
 

 
 const Useractions = ({post,likedpostid}) => {
   
   const {isOpen,onClose,onOpen}=useDisclosure()
   const user1=useRecoilValue(useratom)
   let user=user1?.token
   const toast=useToast()
   const checklike=post?.likes?.find((like)=>
  like.user===user._id)
   const [replybox,setreplybox]=useState(false)
   const findreply=post?.replies?.find((reply)=>
   reply.user===user._id)
  const [reply,setreply]=useState('')
  const [updatereply,setupdatereply]=useState('')
  const [replies,setreplies]=useState(null)
  const [edit,setedit]=useState(false)
  const [like,setlike]=useState(false)
  const [likecount,setlikecount]=useState(post?.likes?.length)
  const [reviewcount,setreviewcount]=useState(post?.replies?.length)
  const [inputfoucs,setinputfocus]=useState(false)
 
  const inputref=useRef(null)
 
 
  useEffect(()=>{
    if(checklike)
     {
       setlike(true)
     }
     else
     {
       setlike(false)
     }
  },[checklike])
  
  useEffect(()=>{
      if(edit && findreply)
       {
         setinputfocus(true)
       }   
       else
      {
       setinputfocus(false)
      } 
  },[edit,findreply])
 
 
  useEffect(()=>{
    if(inputfoucs && inputref.current)
     {
       inputref.current.focus()
     }
  },[inputfoucs])
 
 const handleeditcancel=()=>
   {
     setedit(false)
   }
 
   const handlelike=async()=>{
      try
      {
       const res= await fetch(`/api/posts/likes/` + post._id,{
         method:'PUT',
         headers:{
           'Content-Type':'application/json'
         }
       })
       const data= await res.json()
 
        if(like === true)
        {
         setlike(false)
         setlikecount((prev)=>prev -1)
        } 
        else
        {
         setlike(true)
         setlikecount((prev) =>prev +1)
         likedpostid(post?._id)
        //  console.log(post)
        }
 
        
      }
      catch(err)
      {
       console.log(err)
      }
   }
 
  
 
 
   const handlereplychange=async(e)=>{
   e.preventDefault()
   try
   {
    if(findreply)
     {
       toast({
       description:'you are alredy reviewed',
       title:'Error',
       status:'error'
       })
     } 
 
     else
     {
    const res= await fetch(`/api/posts/reply/${post._id}`,{
    method:'POST',
    headers:{
     'content-Type':'application/json'
    },
    body:JSON.stringify({comment:reply})
    })
 
    if(res.ok)
       {
         const res2= await fetch(`/api/posts/reply/${post._id}`)
         const data= await res2.json()
         setreplies(data)
         setreply('')
         setreviewcount((prev) => prev+1)
         onClose()
       }
   }
   }
   catch(e)
   {
     console.log(e)
   }
   }
   const tooglereplybox=()=>
     {
       setreplybox(!replybox)
     }
   const getreply=async(e)=>{
     e.preventDefault()
     try
     {
      const res= await fetch(`/api/posts/reply/${post._id}`)
      const data=await res.json()
      setreplies(data)
      tooglereplybox()
     }
     catch(e)
     {
       console.log(e)
     }
 
   }
 
   const handledeletereply=async(e)=>{
     e.preventDefault()
     try
     {
       const res= await fetch(`/api/posts/reply/${post._id}`,{
         method:'DELETE',
         headers:{
           'Content-Type':'application/json'
         },
         body:JSON.stringify({reviewid: user._id})
       })
       
       if(res.ok)
         {
           const res2= await fetch(`/api/posts/reply/${post._id}`)
           const data=await res2.json()
           setreplies(data) 
           setreviewcount((preve)=>preve - 1)
         }
       else
       {
         console.log('Error in deleting repliy') 
       }
     }
     catch(e)
     {
       console.log(e)
     }
   }
 
   const handlereplyupdate=async(e)=>{
     e.preventDefault()
     try
     {
      const res=await fetch(`/api/posts/reply/${post._id}`,{
       method:'PUT',
       headers:
       {
         'Content-Type':'application/json'
       },    
       body:JSON.stringify({
         comment:updatereply,
        userid:user._id
       })
      })
      if(res.ok)
       {
         const res2= await fetch(`/api/posts/reply/${post._id}`)
         const data= await res2.json()
         setreplies(data)
         setedit(false)
         setupdatereply('')
       }
   
      
     }
     catch(e)
     {
       console.log(e)
     }
   }
 
 
   return (
     <>
 
     <Flex flexDirection={'column'} gap={'4px'} >
 
 
     <Flex gap={'8px'} 
     onClick={(e)=>e.preventDefault()}
     >
        <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" strokeWidth={1.5} 
       width={'22'} cursor="pointer"
       color={like ?  "rgb(237,73,86)" :"" }
       fill={like? "rgb(237,73,86)" : "transparent" }
       onClick={handlelike}
       stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
 </svg>
 
 
 
         {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         width={'22'}  cursor="pointer"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
             >
   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
 </svg>   */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none"
  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
   className="w-6 h-6" width={'22'} 
   cursor="pointer"
   onClick={onOpen}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
 </svg>  
 {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
 viewBox="0 0 24 24"
 width={'22'}  cursor="pointer"
  strokeWidth={1.5} stroke="currentColor"
 className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
 </svg> */}
 
   
   </Flex>
   <Flex gap={'2'} alignItems={'center'}>
   <Text color={'gray.light'}
   fontSize={'md'}>
       {likecount} likes</Text>
    <Box w='5px' h='5px' borderRadius={'50px'} bg={'gray.light'}></Box>
  <Text color={'gray.light'} cursor={'pointer'} 
  _hover={{color:'gray.600'}} onClick={getreply}>
  {reviewcount} replies  
  </Text>
  </Flex>
  </Flex>
  {
     replybox && (
       <Flex flexDirection={'column'} w={'full'} py={'8px'}>
          {
           replies?.map((reply1)=>( 
           <Flex flexDirection={'column'}
           onClick={(e)=>e.preventDefault()}
            my={'5px'} key={reply1._id}>
                <Flex w={'80%'}
                 justifyContent={'space-between'}
                 alignItems={'center'}>
                 <Avatar size={'xs'} maxW={'20px'} maxH={'20px'} name={reply1?.name}
                 src={reply1?.profilepic ? reply1?.profilepic :
                   reply1?.name
                 }>
                 </Avatar>
                <Flex gap={'5px'}>
              
                 {
                   reply1.user === user._id
                   &&
                    (
                     edit ?<Flex gap={'2'}> 
                         <FaTimes color='red'
                          width={'15px'}
                          cursor={'pointer'}
                          onClick={handleeditcancel}/>
                         <FaCheck color='green' 
                          width={'15px'} 
                          cursor={'pointer'}
                         onClick={handlereplyupdate}/>
                       </Flex>
                       :
                      (<Menu>
                    <MenuButton >
                             
                       <CgMore size={'20px'}   color={'gray'} />
               
                    </MenuButton>
                    <Portal>
                    <MenuList minWidth={'5rem'}
                    bg={'gray.dark'}>
 
                    { reply1.user === user._id &&
                     (<MenuItem color={'gray'}
                     bg={'gray.dark'} 
                     _hover={{backgroundColor:'gray.800'}}>
                   <Timecomponent time={post.createdAt}/>
                    </MenuItem>
                    )}
                    <MenuItem   
                     bg={'gray.dark'} 
                     _hover={{backgroundColor:'gray.800'}}
                     onClick={()=>{
                       setedit(true)
                       setupdatereply(reply1.comment)
                       setinputfocus(true)
                     } }>
                    Edit
                    </MenuItem>
                    <MenuItem color={'red'}
                       bg={'gray.dark'} 
                       _hover={{backgroundColor:'gray.800'}}
                       onClick={handledeletereply}
                        >
                    Delete
                    </MenuItem>
                    
                    </MenuList>       
                    </Portal>
                    </Menu>
                 ))}
                  {
                   reply1.user !==user._id &&
                    (
                     <Timecomponent time={post.createdAt}/>
                    )}
                 </Flex> 
                 </Flex>
                 {
                   edit && reply1.user === user._id ?
                    <input value={updatereply} 
                     className='commentinput1' ref={inputref}
                    onChange={(e)=>setupdatereply(e.target.value)}/> :
                   <Text fontSize={'sm'} my={'10px'}
                   ml={'12px'}
                    >
                     {reply1.comment}
                   </Text>
                 }
                
             </Flex>
           ))
          }
       </Flex>
     )
    
   }
  <Modal isOpen={isOpen}  onClose={onClose}>
   <ModalOverlay/>
   <ModalContent>
    <ModalHeader>
    
    </ModalHeader>
   <ModalCloseButton size={'sm'}/>
   <ModalBody pb={6}>
   <FormControl>
     <Input placeholder='Write your reply' value={reply} 
     onChange={(e)=>setreply(e.target.value)}/>
   </FormControl>
   </ModalBody>  
   <ModalFooter>
     <Button colorScheme='blue'  size={'sm'} 
     onClick={handlereplychange}>
         Reply
     </Button>
   </ModalFooter>
   </ModalContent>
  </Modal>
 
  </>
   )
 }
 
 export default Useractions