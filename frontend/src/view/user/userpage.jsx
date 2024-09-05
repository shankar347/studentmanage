import React, { useContext, useEffect, useState } from 'react'
import Userheader from './userheader'
// import Userpost from './userpost'
// import post from '../assets/aladin.jpg'
// import post1 from '../assets/arjun reddy.jpg'
// import post2 from '../assets/avengers.jpg'
import { useParams } from 'react-router-dom'
import { Button, Flex, Image, Spinner, Text, useToast } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import darklogo from '../../assets/logodark.png'
import useratom from '../atom/useratom'
import { CgInstagram } from 'react-icons/cg'
import { BsThreads } from 'react-icons/bs'
import Postmodel from '../components/postmodel'
import getUserInfo from '../hooks/handleuser'
import { usepostcontext } from '../components/postcontext'
import { searchcontext } from '../components/searchcontext'
import Userfollower from './userfollower'

const Userpage = () => {
   const {id}=useParams()
  const {user:param,loading2}=getUserInfo()
  const user=useRecoilValue(useratom)
  console.log(param )
  const {post:post1,handlepost}=usepostcontext()
  const [loading1,setloading1]=useState(false)
  const {profilepage,setprofilepage}=useContext(searchcontext)
  const {loading,setloading} =useContext(searchcontext)

  

   useEffect(()=>{    
    const getadminposts=async()=>
      {
       
        try
        {
          setloading1(true)
           const res1= await fetch(`/api/posts/user/${id}`)
           const data1=await res1.json()
           handlepost(data1)
        }
        catch(err)
        {
          console.log(err)
        }
        finally
        {
          setloading1(false)
        }
      };  

    getadminposts();
   },[id])
    

   const handledeletepost=async(postid)=>{
    try
    {
      if(!post1)
       {
        console.log("Post is not avilable yet")
        return;
       } 
      else{

     const res=await fetch(`/api/posts/${postid}`,{
      method:'DELETE'
     })
     if(res.ok)
      {
        const res2=await fetch(`/api/posts/currentuser/${user._id}`)
        const data2=await res2.json()
        handlepost(data2)
      }
      else
      {
        console.log( res.status,res.statusText)
      }
    }
  }
    catch(e)
    {
      console.log(e)
    }
  }   
   
   
  //  if(!param) return null;

  
  
  // if(!param && !loading) 
  // {
  //  return (
  //    <h1>User not found</h1>  
  //  )
  // }

//  if (loading1)
//   {
//   return  <Flex alignItems={'center'} justifyContent={'center'}>
//     <Spinner size={'xl'}/>
//   </Flex>
//   }

  return (
   
    <div>
        {
          loading1 && <Flex w={'full'} justifyContent={'center'}>
          <Spinner size={'xl'}/>
       </Flex> 
        }
     {!loading1 && <Userheader data={param} />}
    
    {profilepage === "posts"  &&<div>
  
   { !loading1 && post1?.length === 0 &&
     <Flex flexDirection={'column'} mt={'10'} 
     alignItems={'center'}>
      <Image src={darklogo} width={'40px'} height={'40px'}/>  
     <Text fontFamily={'sans-serif'}
     fontSize={'18'} mt={'13px'}>No posts are uploaded</Text>
   </Flex>
     }
    {
      !loading1 && post1?.length !== 0 && (
        post1?.map((post)=>(
        <Postmodel key={post._id} user1={param} post={post}
         handledeletepost={()=>handledeletepost(post._id)} postadmin={post.admin}/>
        ))
      )
      
    }
      </div> }

   {
    profilepage === 'followers' && 
    <div>
     {
     !loading1 && param?.followers.length !== 0 && (
        param?.followers?.map((follower)=>(
          <Userfollower key={follower} userid={follower}/>
        ))
      )
     } 
    


    {
      !loading1 && param?.followers.length === 0 && (
        <Flex width={'full'}  flexDir={'column'}
         alignItems={'center'} mt={'10'}>
          <Image src={darklogo} width={'40px'} 
          height={'30px'} justifySelf={'center'}/>
          <Text fontWeight={'500'} mt={'13px'} fontSize={'18'}>
            No followers yet
          </Text>  
        </Flex>
       )
    }

    </div>
   }


    </div>
  )
}

export default Userpage