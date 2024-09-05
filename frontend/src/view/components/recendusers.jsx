import { Flex, Skeleton, SkeletonCircle, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import RecomandedUser from './recenuser'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'

const RecomandedUsers = () => {
  
  const [loading,setloading]=useState(false)
  const [sugestusers,setsugestusers]=useState(null)
  const currentuser=useRecoilValue(useratom)
  const sugestUsersWithoutcurrentUser=sugestusers?.filter((user)=>(
   user._id !== currentuser._id
  ))
      
  useEffect(()=>{
    const getrandomusers=async()=>{
      try
      {
        setloading(true)
       const users=await fetch('api/user/randomusers')
       const data=await users.json()
       setsugestusers(data) 
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
    getrandomusers()
  },[])

    return (
    <Flex maxH={'800px'} gap={'5px'} flexDirection={'column'}>
        <Text ml={'8px'} fontSize={'17'} fontWeight={'600'}>
            Suggested Users 
        </Text>
     {
        !loading && (
             sugestUsersWithoutcurrentUser?.map((user)=>(
              <RecomandedUser 
              key={user._id} user={user}/>
            )).splice(0,7)
        )
     } 

     {
       loading && (
        [0,1,2,3,4,5].map((value,i)=>(
         <Flex key={i} w={'full'} alignItems={'center'} gap={'10px'}>
          <SkeletonCircle height={'50px'} width={'80px'}
           borderRadius={'50%'}/>
          <Flex w={'full'} flexDirection={'column'}
          ml={'0px'} gap={'10px'}>
        <Skeleton width={'90px'}  height={'8px'} />
        <Skeleton width={'100px'} height={'8px'}/>
        </Flex>
         <Flex ml={'-30px'}>
         <Skeleton width={'90px'} height={'28px'}/>
         </Flex>
         </Flex>   
        ))
       )
     }
    </Flex>
  )
}

export default RecomandedUsers