import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import {Link as router} from 'react-router-dom'
import { BsFillImageFill, BsTextCenter, BsTextarea } from 'react-icons/bs'
import { FaRegImage } from 'react-icons/fa'
const Actionmodel = ({action,length}) => {
  console.log(action)
  console.log(length)  

  return (
    <Flex as={router} 
    to={`/${action?.admin}/${action?._id}`}
     mx={{
      md:'none',
      lg:'none',
      sm:length%2 === 0 && 'auto',
      base:length%2 === 0 && 'auto'
     }} my={'3px'} border={'1px solid'}
    borderColor={'gray.dark'} width={{
        md:'192px',
        lg:'192px',
        base:'150px',
        sm:'140px'
    }}
    height={{
        md:'190px',
        lg:'190px',
        base:'140px',
        sm:'140px'
    }} position={'relative'}>
      {   action?.img &&( 
    <Box position={'absolute'} top={'2'} left={'1'}>
    {
        <BsFillImageFill color='gray' />
    }
    </Box> 
         )
         }
   { action?.text &&  !action?.img  ? ( 
    <Box position={'absolute'} top={'2'} left={'1'}>
    {
        <BsTextCenter/>
    }
    </Box> 
         ) : ""
         }
  
      {
        action?.img   &&
        <Image src={action?.img} 
        w={'full'}/>
      }
      
      {
         action?.text && !action?.img  ? 
       <Flex width={'full'} overflowY={'scroll'} mt={'10px'}
       ml={'5px'}> 
        <Text width={'full'}>
        {action?.text}
        </Text> 
       </Flex> : ''
      }

    </Flex>
  )
}

export default Actionmodel