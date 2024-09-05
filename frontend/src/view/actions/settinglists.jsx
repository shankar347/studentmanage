import { Avatar, Box, Button, CloseButton, Flex, FormControl, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, Textarea, useColorMode, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import { FaAngleRight, FaArrowAltCircleRight, FaArrowCircleRight, FaArrowRight, FaComment, FaHeart, FaPlus, FaUser ,
    FaPlusSquare
} from 'react-icons/fa'
import { RxArrowBottomRight, RxHeart, RxPinRight, RxTriangleRight } from 'react-icons/rx'
import {Link as router} from 'react-router-dom'
// import { AddIcon } from '@chakra-ui/icons'
import changeimage from '../hooks/changeimage'
import { BsFile, BsFileCode, BsFileEarmarkPdf, BsFillSendCheckFill, BsImageFill } from 'react-icons/bs'

import { usepostcontext } from '../components/postcontext'
import Changefile from '../hooks/changefile'

const Settinglists = () => {
  const [user,setuser]=useRecoilState(useratom)
  const {isOpen,onClose,onOpen} =useDisclosure()
  const [posttext,setposttext]=useState('')
  const {imgurl,setimgurl,handleimagchange}=changeimage()
  const [loading,setloading]=useState(false)
  const fileref=useRef(null)
  const fileref1=useRef(null)
  const toast=useToast()
  const [maxval,setmaxval]=useState(500)
  const [remaingchar,setremainingchar]=useState(maxval)
 const {handlepost} =usepostcontext()
 const {colorMode} =useColorMode()
 const {handlechangefile,filetype,fileurl
  ,seturl,filename,file1,setfil1}=Changefile()
//  console.log(fileurl)
 console.log(file1)   
 const fileExtension = filename ? filename.split('.').pop() : ''
  const handlecomment=(e)=>{
    
    const inputvalue=e.target.value;

    if(inputvalue.length > maxval)
      {
        const truncatedtext=inputvalue.slice(0,500)
        setposttext(truncatedtext)
        setremainingchar(0)
      }

   else
   {
    setposttext(inputvalue)
    setremainingchar(maxval - inputvalue.length)
   } 
  }
  
  const  handlecreate=async()=>{
     try
     {
      setloading(true)
      const formdata=new FormData()
    formdata.append('admin',user._id)
    if (posttext)  formdata.append('text',posttext)
    if (imgurl)  formdata.append('img',imgurl)
    if (file1) formdata.append('file',file1)
    if (file1) formdata.append('filename',file1.name)
    formdata.append('adminname',user.username)
    if (user?.adminprofilepic)
    {
      formdata.append('adminprofilepic',user.adminprofilepic)
    }
    console.log('formdata' ,formdata)
       const res=await fetch('/api/posts/create',{
        method:'POST',
        // headers:{
        //   'Content-Type':'application/json',
        // },
        // body:JSON.stringify({
        //   admin:user._id,
        //   text:posttext,
        //   img:imgurl,
        //   file:formdata,
        //   adminname:user.username,
        //   adminprofilepic:user.adminprofilepic
        // })
        body:formdata
       })
       if(res.ok)
        {
           const res2= await fetch(`/api/posts/user/${user._id}`)
           const data= await res2.json()
           handlepost(data)
           onClose()
           toast({
            description:'Post Uploaded',
            title:'Success'
           })
           setposttext('')
           setimgurl('')
           seturl('')
           setfil1('')
           setmaxval(500)
           setremainingchar(500)
           }
     }
     catch(e)
     {
      console.log(e)
     }
     finally
     {
      setloading(false)
     }
  }
  const handlelogout=async()=>{
    try
    {
      if(!window.confirm('Are you want to logout your account')) return ;
      
      const res= await fetch('/api/user/logout')
      const data=await res.json()
      localStorage.removeItem('token')
      setuser(null) 
    }
    catch(e)
    {
      console.log(e)
    }
  }
  return (
  <Flex flexDir={'column'}
  fontFamily={'sans-serif'}>
   <Flex alignItems={'flex-end'} gap={'2'}>
  <Text fontSize={'22'}>
  Hi !!
  </Text>
   <Text mb={'2px'} fontSize={'18'}>
     {user.username}  
   </Text>
   </Flex>
   <Flex flexDir={{}} mt={5} gap={'4'}>
    <Text fontWeight={'700'}
    fontSize={'medium'} 
    width={'100px'}>
      College
    </Text>
    <Text>
      {user?.college}
    </Text>
   </Flex>
   <Flex mt={3} gap={'4'}>
    <Text fontWeight={'700'}
    fontSize={'medium'}
    width={'100px'}>
      Department
    </Text>
    <Text>
      {user?.department}
    </Text>
   </Flex>
   <Flex mt={3} gap={'4'}>
    <Text fontWeight={'700'}
    fontSize={'medium'}
    width={'90px'}>
      Email
    </Text>
    <Text>
      {user?.email}
    </Text>
   </Flex>
   <Flex mt={3} gap={'4'}>
    <Text fontWeight={'700'}
    fontSize={'medium'}
    width={'90px'}>
      Bio
    </Text>
    <Text>
      {user?.bio}
    </Text>
   </Flex>
   <Flex gap={'2'} mt={'10px'}>
   <Text fontSize={
    {
      md:'17',
      lg:'17',
      sm:'14',
      base:'14'}}>
    Welcome to the Sociap app 
    </Text>
    <Text fontSize={
    {
      md:'17',
      lg:'17',
      sm:'14',
      base:'14'}} color={'gray.light'}>
      version 0.1
    </Text>
    </Flex>
    <Flex mt={{
     md:'20px',
     lg:'20px',
     sm:'20px',
     base:'20px'  
    }} 
    gap={'2'}>
      <FaUser size={'16'}/>
      <Text fontSize={
    {
      md:'17',
      lg:'17',
      sm:'15',
      base:'15'}}>
        Your Actions
      </Text>
    </Flex>
    <Flex flexDirection={{
      md:'row',
      lg:'row',
      sm:'column',
      base:"column"
    }} mt={'2'} ml={'0'} gap={'2'}>
    <Text fontSize={
    {
      md:'19',
      lg:'19',
      sm:'17',
      base:'17'}}>
        Liked and commented posts by
        </Text> 
        <Flex gap={'1'} alignItems={'center'}>
      <Avatar src={user?.profilepic}

      h={'7'} borderRadius={'50%'} w={'7'}
      name={user?.username}/>
        <Text fontSize={
    {
      md:'19',
      lg:'19',
      sm:'17',
      base:'17'}}
        >
            {user?.username}
        </Text>
        </Flex>
      </Flex>
      <Link as={router} 
      style={{textDecorationLine:'none'}}  
      to={`/${user._id}/settings/likes`}>
   <Flex mt={'4'} 
   gap={'2'} cursor={'pointer'}>
    <RxHeart size={'20'}/>
    <Text fontSize={
    {
      md:'18',
      lg:'18',
      sm:'15',
      base:'15'}}
    >
      Liked posts
    </Text>
    <Box alignSelf={'center'}  fontWeight={'50'}>
    <FaAngleRight width={'7'}/>
    </Box >
   </Flex>
   </Link>
   <Box w={'full'} h={'2px'} 
   mt={'2'} bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}></Box>
     <Link as={router} 
      style={{textDecorationLine:'none'}}  
      to={`/${user._id}/settings/comments`}>
    <Flex mt={'4'} 
   gap={'2'} cursor={'pointer'}>
    <FaComment size={'18'}/>
    <Text fontSize={
    {
      md:'18',
      lg:'18',
      sm:'15',
      base:'15'}}
    >
      Commented posts
    </Text>
    <Box alignSelf={'center'}  fontWeight={'50'}>
    <FaAngleRight width={'7'}/>
    </Box >
   </Flex>
   </Link>
   <Flex mt={{
    base:'50px',
    sm:'50px',
    lg:'130px',
    md:'130px'}}
 
    alignItems={'center' }
    justifyContent={'space-between'}>
 <Text 
   color={'red.600'} 
   cursor={'pointer'} onClick={handlelogout}
   _hover={{color:'red.400'}} 
   >
    Logout
   </Text>
   <Button  onClick={onOpen}  bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
   width={'50px'}> 
      <FaPlus/>
   </Button>
   </Flex>
   <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay/>
        <ModalContent>
        <ModalHeader fontSize={'16'}>
            Create Post
        </ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        <ModalBody pb={'3'} >
            <FormControl>
                <Textarea
                value={posttext}
                onChange={handlecomment} 
                placeholder='Write about your post'/>
                <Text fontSize={'xs'}
                fontWeight={'bold'}
                textAlign={'right'}
                m={'1'}
                color={'gray.800'}>
                    {remaingchar}/{maxval}
                </Text>
              <Input type='file' ref={fileref} hidden
              onChange={handleimagchange} />
              <Input type='file' ref={fileref1} hidden 
              onChange={handlechangefile}/>
              <Flex>
              <BsImageFill
               cursor={'pointer'}
               size={16} 
               style={{marginLeft:'5px'}}
               onClick={()=>fileref.current.click()}/>  
             <BsFileEarmarkPdf 
              cursor={'pointer'}
              size={16} 
              style={{marginLeft:'5px'}}
              onClick={()=>fileref1.current.click()}/>      
              </Flex>
            </FormControl>
            <Flex my={'10px'} flexDir={'column'}
             gap={'2'} position={'relative'}>
            {
                imgurl && (
                    <Image border={'1px'}
                     src={imgurl} 
                    />
                )
               }
               {
                imgurl && (
                   <CloseButton 
                   position={'absolute'}
                   top={'2'}
                   bg={'gray.600'}
                   right={'2'}
                   fontSize={'10px'}
                   fontWeight={'29px'}
                   onClick={()=>
                setimgurl('')}/>
                
                )
               }
               <Flex position={'relative'}>
               {
                file1 && (
                  <Box  alignSelf={'center'}
                  justifySelf={'center'}
                   w={'fulll'}
                  mx={'auto'} 
                  textAlign={'center'}>
                  <BsFileEarmarkPdf color='rgb(88, 164, 197)' 
                  size="120px" />
                  <Text color={'gray.light'}>
                    {filename}
                  </Text>
                  <Button mt={'2'} colorScheme='blue' mr={'0'}
          //  onClick={handlecreate} 
          //  isLoading={loading}
           >
                  <a href={fileurl}  target="_blank"  rel="noopener noreferrer">
                View {fileExtension}
                 </a>
                 </Button>
                  </Box>
                )
               }
               {
                fileurl && (
                  <CloseButton 
                  position={'absolute'}
                  top={'5'}
                  bg={'gray.600'}
                  right={'2'}
                  fontSize={'10px'}
                  fontWeight={'29px'}
                  onClick={()=>{
                    seturl('')
                    setfil1('')
                  }
              }/>
               )
               }
               </Flex>
            </Flex>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={'3'}
           onClick={handlecreate} 
           isLoading={loading}>
              {
                loading ? <Spinner/> : 'Create'
              }
            </Button>
        </ModalFooter>
        </ModalContent>  
     </Modal>
  </Flex>
  )
}

export default Settinglists