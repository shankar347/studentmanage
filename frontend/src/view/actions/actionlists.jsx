import { Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Actionmodel from './actionmodel'

const Actionlists = () => {
  
    const {category} =useParams()
   const [loading,setloading]=useState(false)
   const [actions,setactions]=useState(null)
  

    useEffect(()=>{
      const getuseractions=async()=>{
        setloading(true)
        try
        {
        
         const res= await  fetch(`/api/posts/${category}`)
         const data=await res.json()
        setactions(data)      
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
      getuseractions()
    },[category])
  
    if(loading && !actions)
        {
            return (
         <Flex w={'full'} justifyContent={'center'}>
         <Spinner size={'xl'}/>
         </Flex>
            )
        }    

  return (
    <Flex flexDirection={'column'}>
        <Text fontSize={{
            md:'18',
            lg:'18',
            sm:'16',
            base:'16'}}>
             {
            category === "likes" ? 
            "Liked " : "Commented" 
            } Posts 
            </Text>
         <Flex width={'full'} mt={{
            md:'18px',
            sm:'10px',
            lg:'18px',
            base:'10px'}}
            flexWrap={'wrap'} justifySelf={'center'} >
          {
            actions?.map((action)=>(
                <Actionmodel key={action._id}
                 action={action} length={actions?.length}/>
            ))
          }  
        </Flex>   
    </Flex>
  )
}

export default Actionlists