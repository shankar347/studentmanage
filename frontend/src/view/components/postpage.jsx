import { Avatar, Box, Button, Divider, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {CgMore} from 'react-icons/cg'
// import myimage from '../assets/my image.jpg'
// import bluetick from '../assets/correct.png'
// import post from '../assets/avengers.jpg'
import Useractions from '../user/useractions'
import Usercomments from '../user/usercomments'
import getUserInfo from '../hooks/handleuser'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import Postcomment from './postcomment'
import { AiFillDelete, AiOutlineDelete, AiOutlineDeleteRow } from 'react-icons/ai'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import Timecomponent from '../hooks/timecompnent'
import { searchcontext } from './searchcontext'
import { BsFileEarmarkPdf } from 'react-icons/bs'
const Postpage = () => {

  const [like,setlike]=useState(false)
  const {user:user1,loading}=getUserInfo()
  let user=user1?.token 
  const currentuser=useRecoilValue(useratom)
  const [post,setpost]=useState(null)
  const {postid}=useParams()
  const [likecount,setlikecount]=useState(0)
  const [reviewcount,setreviewcount]=useState(0)
  const [replies,setreplies]=useState(null)
  const [updatecomment,setupdatecomment]=useState('')
  const [edit,setedit]=useState(false)
  const { profileloading,setprofileloading}=useContext(searchcontext)
  const [loading1,setloading1]=useState(false)
  const navigate=useNavigate()
  console.log(replies)
  console.log(user)
  

  useEffect(()=>{
   const getpost=async()=>{
     try
     {
     setloading1(true)
      const res= await fetch(`/api/posts/${postid}`)
      const data= await res.json()
      setpost(data)
     }
    catch(e)
    {
      console.log(e)
    }
    finally{
      setloading1(false)
    }
   }

  const getreplies=async()=>{
    try
    {
     const res=await fetch(`/api/posts/reply/${postid}`)
     const data= await res.json()
     setreplies(data)
    }
    catch(e)
    {
      console.log(e)
    }
  } 


   getpost();
   getreplies();

  },[postid])
 
  useEffect(()=>{
    if(post)
      {
        setlikecount(post?.likes?.length)
        setreviewcount(post?.replies?.length)
      } 
  },[post])


  const handledeletereply=async(e)=>{
    e.preventDefault()
    try
    {
    const res=await fetch(`/api/posts/reply/${post._id}`,
      {
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({reviewid:currentuser._id})
      }
    )
    if(res.ok)
      {
        const res2=await fetch(`/api/posts/reply/${post._id}`)
        const data=await res2.json()
        setreplies(data)
        console.log(data)
        setreviewcount((prev)=>prev - 1)
      }
    }
    catch(e)
    {
      console.log(e)
    }
  }

  const handleditreply=async()=>{
    try
    {
     const res= await fetch(`/api/posts/reply/${post._id}`,
      {
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          userid:currentuser._id,
          comment:updatecomment})
      }
     )

     if(res.ok)
      {
        const res2=await fetch(`/api/posts/reply/${post._id}`)
        const data2= await res2.json()
        setreplies(data2)
        setedit(false)
        setupdatecomment('')   
      } 
    }
    catch(e)
    {
    console.log(e)
    }
  }
  
  if(loading1 && !post)
    {
        return (
     <Flex w={'full'} justifyContent={'center'}>
     <Spinner size={'xl'}/>
     </Flex>
        )
    }    

    if(profileloading)
      {
          return (
       <Flex w={'full'} justifyContent={'center'}>
       <Spinner size={'xl'}/>
       </Flex>
          )
      }    
  return (
    <>
  
    <Flex fontFamily='sans-serif' >
      <Flex w={'full'} gap={'3'} alignItems={'center'}>
     <Avatar name={user?.username} src={user?.profilepic} 
     size={{
      base:"sm",
      md:"lg",
      lg:"lg",
      sm:'sm'
     }}/>
     <Flex gap={'1'}>
    <Text fontSize={'xl'} mt={'3px'}>{user?.username}</Text>
    {/* <Image src={bluetick} mt={'5px'} w={'15px'} h={'15px'} 
    borderRadius={'50%'}/> */}
     </Flex>
      </Flex>
      <Flex alignItems={'center'} width={'60px'} gap={'5px'}>
        <Timecomponent time={post?.createdAt}/>
      </Flex>
    </Flex>
    <Text mt={'8px'} fontSize={'md'} 
    fontFamily={'sans-serif'}>{post?.text}</Text>

{
      post?.file && (
      <Box mt={'10px'}>
         <BsFileEarmarkPdf color='rgb(88, 164, 197)' 
                  size="100px" />
      <Text>
      {post?.filename}
      </Text>
      <Button mt={'1'} colorScheme='blue' mr={'7'}
    //  onClick={handlecreate} 
          >
                  <a href={post?.file} 
                  //  target="_blank"  
                  download={post?.filename}
                   rel="noopener noreferrer">
                 Download
                 </a>
                 </Button>
      </Box>
      )
     }

     { post?.img &&
    <Box  
    mt={'10px'}
    overflow={'hidden'}
     border={"2px solid "}
     borderColor={'gray.light'} 
     borderRadius={'5px'} >
      <Image width={'full'} src={post?.img}/>
     </Box>
    }<Flex my={'10px'}>
   <Postcomment post={post} 
    replies={replies}
    setreplies={setreplies}
    likecount={likecount} 
   reviewcount={reviewcount}
   setlikecount={setlikecount}
   setreviewcount={setreviewcount} />
    </Flex>
   
    <Divider my={'4'} w={'full'} h={'0.3px'} bg={'gray.light'}/>
    <Flex justifyContent={'space-between'} 
    alignItems={'center'}>
     <Flex gap={'10px'}>
     <Text fontFamily={'sans-serif'} fontSize={'sm'}>
      Get the app to like,reply and post
     </Text>
     </Flex>
     <Button>
      Get
     </Button>
    </Flex>
    <Divider my={'4'} w={'full'} h={'0.3px'} bg={'gray.light'}/>
    {
      
      replies?.map((reply)=>( 
        <Usercomments 
        key={reply._id}
        updatecomment={updatecomment}
        setupdatecomment={setupdatecomment}
        edit={edit}
        setedit={setedit}
        handledeletereply={handledeletereply}
        handleditreply={handleditreply}
     replyid={reply.user}
    usercomment={reply.comment}
    username={reply.name} 
    agaodate={reply.createdAt}/>
      ))
    }
    </>
  )
}

export default Postpage