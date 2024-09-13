import { Avatar, AvatarBadge, Box, Flex, Image, Stack, StackItem, Text, WrapItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
// import bluetick from '../assets/correct.png'
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import chatperson from '../atom/chatpersonatom'
import { searchcontext } from '../components/searchcontext'

const Personalchat = ({chatuser ,isonline}) => {
  const {setinput} =useContext(searchcontext)
  const currentuser1=useRecoilValue(useratom)
  let currentuser=currentuser1?.token
  const user=chatuser?.chatpersons[0]
  const lastmessage=chatuser?.lastmessage
  const [chatperson1,setchatperson]=useRecoilState(chatperson)
  const {colorMode}=useColorMode()
 
     
  const setuserdetils=()=>{
     setinput('')
     setchatperson({
      chatid:chatuser?._id,
      userid:user?._id,
      profilpic:user?.profilepic,
      username:user?.username,
      newchatcheck:chatuser.newchatcheck
    })
  }

  // console.log(user)
  return (
    <Flex 
    alignItems={'center'}
    _hover={{
      bg:useColorModeValue('gray.300','gray.dark')   
    }}
     backgroundColor={
      chatperson1?.chatid === chatuser?._id 
      ? (colorMode ==='light' ? 'gray.300' :'gray.dark')
        : ''     
     }
    cursor={'pointer'}
    borderRadius={'md'}
    gap={'17px'} onClick={setuserdetils}>
      <WrapItem>
       <Avatar 
       size={{
        base:'xs',
        sm:'sm',
        md:'md'
       }}
       name={user?.username}
       src={user?.profilepic}>
      {isonline && 
       <AvatarBadge 
       boxSize={'1em'} bg={'green.500'}/>}
       </Avatar>
      </WrapItem>  
      <Stack  direction={'column'} 
        >
       <Flex flexDirection={'row'} 
       alignItems={'center'} gap={'2px'}>
        <Text fontSize={'md'} 
        fontWeight={500} >
            {user?.username}
            </Text>
        {/* <Image src={bluetick} w={3} mt={'-2px'} h={3}/> */}
       </Flex>
       { lastmessage?.text?.length !== 0 ?
       
       (<Flex alignItems={'center'} gap={'4px'} width={'full'}>
        {currentuser?._id === lastmessage?.sender && 
         <Box  color={lastmessage?.isseen ? 'blue.400' : ''}>
        <BsCheck2All size={'15'} 
        />
        </Box> }
     
        <Text fontSize={'sm'} alignItems={'center'} >
            { lastmessage?.text?.length > 18 ?
            lastmessage?.text?.substring(0,18)+'...' :
            lastmessage?.text  || <BsFillImageFill size={'21'}/>
            }
        </Text>
        </Flex>
       ):
      
           (<Text fontSize={'sm'}
          alignItems={'center'}>
            Hi!! welcome to chat..
          </Text>
   )}
      
        </Stack>  
    </Flex>
  )
}

export default Personalchat