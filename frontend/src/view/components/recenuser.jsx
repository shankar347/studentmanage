
import { Avatar, Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'

const RecomandedUser = ({user}) => {
 
    const currentuser1=useRecoilValue(useratom)
    let currentuser=currentuser1?.token
     const toast=useToast()
    const [following,setfollowing]=useState(false)

    useEffect(()=>{
    if(user?.followers?.includes(currentuser._id))
        {
            setfollowing(true)
        }
    },[])
    
    const handlefollowuser=async(e)=>{
        e.preventDefault()
        try{
          const res=await fetch(`/api/user/follow/${user._id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
          })
          if(res.ok)
            {
                const res2=await fetch(`/api/user/profile/${user._id}`)
                const data=await res2.json()
                console.log(data)
                toast({
                    title:'success',
                    status:'success',
                    description:following ? 'Unfollowed' + " " + data.username :
                    'Followed' + " " + data.username
                })
                setfollowing(!following)
            }
           else
           {
            toast({
             title:'error',
             status:'error',
             description:'Error'
            })
           }  
        }
        catch(e)
        {
            console.log(e)
        }
    }
    return (
      <Flex w={'100%'} gap={'10px'} 
      marginTop={'5px'}
      justifyContent={'space-between'} 
      fontFamily={'sans-serif'}>
        <Flex gap={'5px'} alignItems={'center'}>
        <Box as={Link} to={`/${user?._id}`}>
         <Avatar width={'40px'} height={'40px'}
             src={user?.profilepic} name={user.username}/>   
        </Box>    
         <Flex flexDirection={'column'} 
         ml={'2px'} width={'90px'} my={'-2px'} gap={'0px'}>
           <Text fontSize={'md'} >
            {user?.username}
           </Text>
           <Text fontSize={'md'} color={'gray.light'}>
            {user?.name}
           </Text>
         </Flex>
         <Button
         ml={'20px'}
         width={'100px'}
         height={'40px'}
         bgColor={following ? 'white' : 'rgb(14, 163, 277)'  }
         color={following ? 'black' : 'white'}
         cursor={'pointer'}
         fontSize={'sm'}
         _hover={
            following ? {bgColor: 'gray.300'} 
            : {bgColor : 'rgb(14,123,200)'}
         }
         
         _focus={
            following ? {bgColor: 'gray.300'} 
            : {bgColor : 'rgb(14,123,200)'}
         }
         onClick={handlefollowuser}>
         {
            following ? 'Unfollow' 
            : 'Follow'
         }
         </Button>
        </Flex>
        </Flex>  
  )
}

export default RecomandedUser