import { Box, Button, Flex, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useratom from '../atom/useratom'
import { useRecoilValue } from 'recoil'

const Postcomment = ({post,likecount,reviewcount,
  setlikecount,setreviewcount,replies,setreplies
}) => {
    const {isOpen,onClose,onOpen}=useDisclosure()
    const user=useRecoilValue(useratom)
    const toast=useToast()
    const [like,setlike]=useState(false)
    const [reply,setreply]=useState('')
    
//  const findreply=post?.replies?.find((reply)=>
//     reply.user===user._id)
//   console.log(findreply) 
   const checklike=post?.likes?.find((like)=>(
    like.user ===user._id
   )) 
useEffect(()=>{
   if(checklike)
    {
     setlike(true)
    }
},[checklike])

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
      }

     console.log(data) 
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
     
     const res= await fetch(`/api/posts/reply/${post._id}`,{
     method:'POST',
     headers:{
      'content-Type':'application/json'
     },
     body:JSON.stringify({comment:reply})
     })
     const data1= await res.json()

      if (data1.error)
      {
        toast({
          title:'Error',
          description:data1.error
        })
        setreply('')
        return;
      } 

     else if(res.ok)
        {
          const res2= await fetch(`/api/posts/reply/${post._id}`)
          const data= await res2.json()
          setreplies(data)
          console.log(data)
          setreply('')
          setreviewcount((prev) => prev+1)
          onClose()
        }
       
    }
    catch(e)
    {
      console.log(e)
    }
    }
  return (
     <>
     <Flex flexDirection={'column'}>
         <Flex gap={'8px'} >
       <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" strokeWidth={1.5} 
      width={'22'} cursor="pointer"
      color={like ?  "rgb(237,73,86)" :"" }
      fill={like? "rgb(237,73,86)" : "transparent" }
      onClick={handlelike}
      stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>



        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        width={'22'}  cursor="pointer"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            >
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
</svg>  
<svg xmlns="http://www.w3.org/2000/svg" fill="none"
 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
  className="w-6 h-6" width={'22'} 
  cursor="pointer"
  onClick={onOpen}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>  
<svg xmlns="http://www.w3.org/2000/svg" fill="none" 
viewBox="0 0 24 24"
width={'22'}  cursor="pointer"
 strokeWidth={1.5} stroke="currentColor"
className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
 
  </Flex>
  <Flex gap={'2'} alignItems={'center'}>
  <Text color={'gray.light'}
  fontSize={'md'}>
      {likecount} likes</Text>
   <Box w='5px' h='5px' borderRadius={'50px'} bg={'gray.light'}></Box>
 <Text color={'gray.light'} >
 {reviewcount} replies  
 </Text>
 </Flex>
 </Flex>
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

export default Postcomment