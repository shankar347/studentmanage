import { Avatar, AvatarGroup, Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import useratom from '../atom/useratom'
import { useRecoilValue } from 'recoil'
import chatperson from '../atom/chatpersonatom'
import { BsCheck2All } from 'react-icons/bs'
// import bluetick from '../assets/correct.png'

const Messagebox = ({yourmessage,message,prevmessage}) => {
  const currentuser=useRecoilValue(useratom)
  const chatperson1=useRecoilValue(chatperson)
  const checkprevious= !prevmessage ||
   prevmessage.sender !== message.sender
  
  return (
    <>
    {
      yourmessage ? (
        <Flex gap={'2'}
        alignItems={'start'}
        my={'1px'}
        mx={'2px'}
        alignSelf={'flex-end'}>
         {
        message.text &&
        (
       <Flex
        fontSize={{
          base:'xs',
          sm:'sm',
          md:'md'
       }}
       backgroundColor={useColorModeValue('gray.400','gray.light')}
        maxW={'350px'}
        borderRadius={'md'}
        p={'10px'}
        gap={'5px'}>

          <Text>
          {message.text}
          </Text>
 
     
  
      <Flex alignSelf={'flex-end'} 
      color={message.isseen ? 'blue.400'
        :  ''
      } fontWeight={'bold'}>
      <BsCheck2All size={'18'} />
          </Flex>
    
          </Flex>
           )
          } 
    {
        message.img && (
          <Flex position={'relative'}>
           <Box  maxW={'200px'} border={'2px solid gray '}
           borderRadius={'5px'}>
           <Image src={message.img} />
           </Box> 
           <Flex alignSelf={'flex-end'} 
           color={message.isseen ? 'blue.400'
             :  ''
           } fontWeight={'bold'}
           position={'absolute'} right={'2'}
           bottom={'1'}>
           <BsCheck2All size={'18'} />
               </Flex>  
          </Flex>
        )
      } 

    {checkprevious && <Avatar 
        src={currentuser.profilepic}
        name={currentuser.username}
        size={{
        base:'xs',
        sm:'sm',
        md:'sm'
     }}/>
     }
      </Flex>
      ):
      <Flex gap={'3'}
      alignItems={'start'}
      my={'5px'}
      alignSelf={'flex-start'}>
     
      {checkprevious && <Avatar 
      name={chatperson1.username}   
     size={{
        base:'xs',
        sm:'sm',
        md:'sm'
     }}
     src={chatperson1.profilpic}
     />
            }
           {
            message.text && (
              <Flex fontSize={{
                base:'xs',
                sm:'sm',
                md:'md'
             }}
             maxW={'350px'}
             p={'10px'}
             backgroundColor={useColorModeValue('gray.300','rgba(51, 51, 51, 0.673)')}
             borderRadius={'md'}>      
                     <Text >
                   {message.text}
                </Text>
                </Flex> 
            )
           }
           {
            message.img && (
              <Flex position={'relative'}>
           <Box  maxW={'200px'} border={'2px solid gray '}
           borderRadius={'5px'}>
           <Image src={message.img} />
           </Box> 
           <Flex alignSelf={'flex-end'} 
           color={message.isseen ? 'blue.400'
             :  ''
           } fontWeight={'bold'}
           position={'absolute'} right={'2'}
           bottom={'1'}>
           <BsCheck2All size={'18'} />
               </Flex>  
          </Flex>
            )
           }
      </Flex>
    }
    </>
  )
}

export default Messagebox