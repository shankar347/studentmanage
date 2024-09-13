import { Box, Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, 
    ModalCloseButton, ModalContent, ModalFooter,
     ModalHeader, ModalOverlay, Text, Textarea, 
     useColorMode, useColorModeValue, useDisclosure, 
     useToast}
      from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
// import { AddIcon } from '@chakra-ui/icons'
import changeimage from '../hooks/changeimage'
import { BsFileEarmarkPdf, BsImageFill, BsX } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import { usepostcontext } from './postcontext'
import { FaPlus } from 'react-icons/fa'
import Changefile from '../hooks/changefile'



const Createpost = () => {
    const {isOpen,onOpen,onClose}=useDisclosure()
   const user1=useRecoilValue(useratom)
   let user=user1?.token
   const [posttext,setposttext]=useState('')
   const {imgurl,setimgurl,handleimagchange}=changeimage()
  //  const maxval=500; 
  const [maxval,setmaxval]=useState(500)
   const [remaingchar,setremainingchar]=useState(maxval)
   const [loading,setloading]=useState(false)
   const [domains,setdomains]=useState([])
   const fileref=useRef()
   const fileref1=useRef(null)
   const toast=useToast()
   const {handlepost}=usepostcontext()
   const {handlechangefile,fileurl,seturl,file1,setfil1,
    filetype,filename
   }=
   Changefile()
   const fileExtension = filename ? filename.split('.').pop() : ''
   const handlecomment=(e)=>{
     const inputtext=e.target.value;

     if(inputtext.length > maxval)
     {
        const truncatedtext=inputtext.slice(0,500)
        setposttext(truncatedtext)
        setremainingchar(0)
        const textparts=finddomainintext(truncatedtext)
        const findhash=textparts.slice(1) 
        console.log(findhash)
        setdomains(findhash)
     }
     else
     {
        setposttext(inputtext)
        setremainingchar(maxval - inputtext.length)
        const textparts=finddomainintext(inputvalue)
        const findhash=textparts.slice(1) 
        console.log(findhash)
        setdomains(findhash)
     }
}

const finddomainintext=(posttext)=>{
  if (!posttext) return []

  const parts=posttext.split(/(#[^\s#]+)/g)

  const cleanedParts = parts.map(part => part.startsWith('#') ? part.slice(1).trim(): part);
  return cleanedParts.filter((part)=>part.trim() !== '')
  }

  const textparts=finddomainintext(posttext)
  const checkemptydomain=domains?.findIndex((domain)=>domain !== '')  

const handlecreate=async(e)=>{

    e.preventDefault()
    setloading(true)
    try
    {
      const formdata=new FormData()
      formdata.append('admin',user._id)
      if (posttext)  formdata.append('text',textparts[0].replace(/\r?\n|\r/g,'').trim())
      if (imgurl)  formdata.append('img',imgurl)
      if (checkemptydomain !== -1 ){
        domains.forEach((domain)=>(
        formdata.append('domains[]',domain)
        ))
      }
      if (file1) formdata.append('file',file1)
      if (file1) formdata.append('filename',file1.name)
      formdata.append('adminname',user.username)
      if (user?.adminprofilepic)
      {
        formdata.append('adminprofilepic',user.adminprofilepic)
      }
      console.log('formdata' ,formdata)
       const res= await fetch('/api/posts/create',{
        method:'POST',
        // headers:{
        //     'Content-Type':'application/json'
        // },
        // body:JSON.stringify({
        //     admin:user._id,
        //     text:posttext,
        //     img:imgurl,
        //     adminname:user?.username,
        //     adminprofilepic:user?.profilepic
        // })
        body:formdata
       })   
       
       if(res.ok)
        {
          const errdata=await res.json()
          if (errdata?.error)
            {
              console.log(errdata)
              return toast({
                status:'error',
                description:errdata?.error,
                duration:3000
              })
            } 
          const res2=await fetch(`/api/posts/user/${user._id}`)
          const data2=await res2.json() 
       handlepost(data2)           
       onClose()
       toast({
        description:'Post Uploaded',
        title:'Success'
       })
       setposttext('')
       setimgurl('')
       setfil1('')
       setmaxval(500)
       setremainingchar(500)
    }
    else{
      // const errdata=await res.json()
      toast({
        description:"Error in uploading post",
        status:'error',
        duration:3000
      })
    }  
    }
    catch(err)
    {
        console.log(err)
    }
    finally
    {
        setloading(false)
    }
}

  return (
    <>
     <Button 
     position={'fixed'}
     bottom={'20px'}
     right={'20px'}
     display={{
        md:'block',
        lg:'block',
        sm:'none',
        base:'none'
     }}
     leftIcon={<FaPlus width={'15px'} 
     mt={'2px'}/>}
     bg={useColorModeValue('gray.300','gray.dark')}
     onClick={onOpen}
   >
        
     </Button>
     <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
        <ModalContent>
        <ModalHeader>
            Create Post
        </ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        <ModalBody pb={'3'}>
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
              onChange={handlechangefile} />
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
                  <Box  
                  // alignSelf={'center'}
                  // justifySelf={'center'}
                   w={'full'}
                  mx={'auto'} 
                  // alignItems={'center'}
                  // justifyItems={'center'}
                  // textAlign={'center'}
                  >
                 <Flex mt={''}
                  width={'full'}
                  alignItems={'center'}
                  flexDir={'column'}
                  alignSelf={'center'}
                  justifyItems={'center'}>
                 <BsFileEarmarkPdf  
                  color='rgb(88, 164, 197)' 
                  size="120px" 
                  style={{alignSelf:'center',width:'full'}}/>
                  <Text color={'gray.light'}
                  textAlign={'center'}
                  width={'80%'}>
                    {filename}
                  </Text>
                  <Button mt={'2'} colorScheme='blue' mr={'0'}
          //  onClick={handlecreate} 
          //  isLoading={loading}
           >
                  <a href={fileurl}  target="_blank"  
                  rel="noopener noreferrer">
                View {fileExtension}
                 </a>
                 </Button>
                 </Flex>
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
                Create
            </Button>
        </ModalFooter>
        </ModalContent>  
     </Modal>
     </>
  )
}

export default Createpost