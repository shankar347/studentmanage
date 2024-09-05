import { Button, Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Postmodel from './postmodel'
// import Userpost from '../user/userpost'
import { useRecoilState } from 'recoil'
import useratom from '../atom/useratom'
import RecomandedUsers from './recendusers'
import { searchcontext } from './searchcontext'
import Searchinfo from './searchinfo'
// import Poscontext from './postcontext'

const Homepage = () => {
  const [posts,setposts]=useState([])
  const [loading,setloading]=useState(false)
  const toast=useToast()
  const {profileloading,setprofileloading}=useContext(searchcontext)
  const user=useRecoilState(useratom)
  const {search,searchusers,searchtext} =useContext(searchcontext)
  // console.log(posts)




  useEffect(()=>{
    const getfeed=async()=>{
      setloading(true)
      try
      {
      
        const classres=await fetch('/api/posts/classfeed')
        const classdata=await classres.json()

       const followres=await fetch('/api/posts/feed')
       const followdata=await followres.json()
      //  console.log(data)
       setposts([...classdata,...followdata])
      // posts.push(data)
      // posts.concat(data)
      }
      catch(e)  
      {
        console.log(e)
      }
      finally{
        setloading(false)
      }
    }
    getfeed()        
  },[])
   
   
  console.log(posts)

 
  
  return (
    <Flex w={'full'}>
     { search ?
     ( searchtext?.length === 0 ?
      (
      <Flex width={'full'}
      alignItems={'center'}
      justifyContent={'center'} height={'300px'}>
       <Text >
          Search your favourites and friends ...
       </Text>
      </Flex>
     )
      :
     (
      searchusers?.length === 0 ? 
       (
       <Flex width={'full'}
       alignItems={'center'}
       justifyContent={'center'} height={'300px'}
       >
        <Text>
          User is not found
        </Text>
        </Flex>
        ) :(
      <Flex flexDirection={'column'}
      w={'full'} justifySelf={'center'} mx={'auto'}>
        {searchusers?.map(
          (user)=>
          <Searchinfo key={user._id} user={user}/> )}
      </Flex>
)
     ))  :(
    <Flex width={'full'} gap={'8'}>
   <Flex flex={70} flexDirection={'column'}>
    {
      !loading &&   posts?.length===0 && (
        <Flex fontSize={'sm'}
        fontWeight={'600'} w={'full'} h={'10rem'} alignItems={'center'}
         justifyContent={'center'}>
          <h1>
            Follow some users to get feed posts
          </h1>
        </Flex>
      )
    }
     {loading ?
   <Flex w={'full'} justifyContent={'center'}>
      <Spinner size={'xl'}/>
   </Flex> : ''
     }
   {
 posts? posts?.map((post)=>{
 return <Postmodel post={post} key={post._id}
  postadmin={post?.admin}/>
}) : []
   }
   </Flex>
   <Flex alignSelf={'flex-start'} 
   flex={30}
   display={{
    base:'none',
    md:'block'
   }}>
   <RecomandedUsers/>
   </Flex>
   </Flex>
)}
   </Flex>
  )
}

export default Homepage