import { Avatar, Flex, Skeleton, SkeletonCircle, Text, useColorMode } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import {  Link as router,  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { searchcontext } from '../components/searchcontext';



const Userfollower = ({userid}) => {

  
   const [user,setuser]=useState(null)
   const navigate=useNavigate()
   const {loading,setloading} =useContext(searchcontext)
   const {profilepage,setprofilepage}=useContext(searchcontext)
   const {colorMode,toggleColorMode}=useColorMode();
   useEffect(()=>{
    const getuserprofile=async()=>{
    try
    {
     setloading(true)
     const res=await fetch(`/api/user/profile/${userid}`)
     const data=await res.json()
     setuser(data)
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
   getuserprofile()
   },[])


  return (
   <>
    
    {
      loading && <Flex
      
      mx={'auto'}
      gap={{
         md:'15px',
         lg:'15px',
         base:'0px',
         sm:'0px'
        }}
        pl={'2px'}
        height={'80px'} width={{
         md:'80%',
         base:'100%',
         lg:'75%',
         sm:'100%'}} 
      alignItems={'center'}>
         <SkeletonCircle  width={{
        md: '40px',
        lg:'40px',
        base:'30px'}}
         height={{
         md:'40px',
         base:'30px'}}/>
       <Flex flexDir={'column'} 
        ml={{md:'0',
         lg:'0',
         base:'10px',
         sm:'10px'
       }} gap={'10px'}>
      <Skeleton width={'130px'} 
      height={'20px'}  />
       
       <Skeleton width={'130px'} 
        height={'20px'}/>
        </Flex> 
      
        <Skeleton width={'90px'}     display={{
         md:'block',
         lg:'block',
         base:'none',
         sm:'none'
      }}  height={'20px'}/>
         
         <Skeleton 
          ml={{
            md:'10px',
            lg:'10px',
            base:'20px'}} 
         width={'90px'} 
         height={'30px'} />

      </Flex>
    }


    {!loading && <Flex  fontFamily={'sans-serif'}
    alignItems={'center'}  
    gap={{
     md:'15px',
     lg:'15px',
     base:'0px',
     sm:'0px'
    }}
    pl={'5px'}
    height={'80px'} width={{
     md:'80%',
     base:'100%',
     lg:'75%',
     sm:'100%'}}
     borderRadius={'5px'}
   
     border={'1px solid transparent'}
     _hover={{
         border:'1px solid',
         borderColor:colorMode=== "dark" ? 'gray.dark' :'gray.400'
     }}
     mx={'auto'}>
      <Avatar src={user?.profilepic} 
      name={user?.username} width={{
        md: '40px',
        lg:'40px',
        base:'30px'}} height={{
         md:'40px',
         base:'30px'}}/>   
       <Flex flexDirection={'column'}
       ml={{md:'0',
         lg:'0',
         base:'10px',
         sm:'10px'
       }} width={'130px'}>
        <Text fontSize={{
         md:'19px',
         lg:'19px',
         sm:'17px',
         base:'17px'
        }}>
         {user?.username}
         </Text>
        <Text  
        fontSize={{
         md:'18px',
         lg:'18px',
         sm:'16px',
         base:'16px'
        }} color={'gray.light'}>
         {user?.name}
         </Text> 
      </Flex>
      <Text width={'90px'} 
      display={{
         md:'block',
         lg:'block',
         base:'none',
         sm:'none'
      }}>
         {user?.followers?.length} followers
      </Text>    
      <Text borderRadius={'5px'} 
      // background={'gray.800'}
      py={'8px'} 
      px={'8px'} alignSelf={'center'}
      justifySelf={'center'}
      fontSize={'15px'}
      // _hover={{background:'gray.600'}}
      bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
      color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}
      cursor={'pointer'} 
      onClick={()=>{
        const newpath=`/${user?._id}`
         setprofilepage('posts')
        if(window.location.pathname !== newpath)
        {
        navigate(newpath) 
      //   window.location.reload()   
        }
        else
        {
         window.location.reload()
        }
     }}
      ml={{
         md:'10px',
         lg:'10px',
         base:'0px'}}>
         View profile
      </Text>  
     </Flex>
}
     </>
  )
}

export default Userfollower