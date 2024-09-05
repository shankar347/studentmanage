import { Box, Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { useRecoilState, useRecoilValue } from 'recoil'
import chatatom from '../atom/chatatom'
import chatperson from '../atom/chatpersonatom'
import { BsImageFill } from 'react-icons/bs'
// import bluetick from '../assets/correct.png'
import changeimage from '../hooks/changeimage'
import { searchcontext } from '../components/searchcontext'

const Inputfile = ({setmessages}) => {
  const {input,setinput} =useContext(searchcontext)
  const [chatusers,setchatuser]=useRecoilState(chatatom)
  const [selectedchat,setselectedchat]=useRecoilState(chatperson)
 const imageref=useRef(null)
 const {onClose}=useDisclosure()
 const {imgurl,handleimagchange,setimgurl} =changeimage()  
 const [isuploading,setisuploading]=useState(false)

 const handlecreatemesage=async(e)=>{
    e.preventDefault()
    
    if(!imgurl && !input) return;

    if(isuploading) return;

    try
    {
      setisuploading(true)

     const res=await fetch('/api/message',{
     method:'POST',
     headers:{
      'Content-Type':'application/json'
     },
     body:JSON.stringify({
      recevierid:selectedchat.userid,
      text:input,
      img:imgurl
     })
     })
     const data=await res.json()
     
     setmessages((prevmessage)=>
      [...prevmessage,data])
     
    setchatuser((conver)=>{
     const targetconver= conver.map((singleconv)=>{
        if(singleconv._id === selectedchat.chatid)
          {
            return {
              ...singleconv,
              lastmessage:{
                text:input,
                sender:data.sender
              }
            }
          }
          return singleconv;
     }   
    ) 
      return targetconver;    
      })
    
     setimgurl('')
     setinput('')
    }
    catch(e)
    {
      console.log(e)
    }
    finally{
      setisuploading(false)
    }
  }

  return (
   <form >
    <Flex alignItems={'center'} pr={'4px'}>
   <InputGroup px={'8px'}>
   <Input placeholder='Chat to your friend' 
   width={'100%'} value={input} 
   onChange={(e)=>setinput(e.target.value)}
   />
   <InputRightElement onClick={handlecreatemesage} cursor={'pointer'} mr={'2px'}>
    <IoSendSharp type='submit' color='green.500' />
   </InputRightElement >
   </InputGroup>
   <Box mt={'7px'} >
    <BsImageFill size={'25'} 
    cursor={'pointer'}
    onClick={()=>imageref.current.click()}/>
   <Input type='file'
   onChange={handleimagchange}
   ref={imageref} hidden/>
   </Box>
   </Flex>
   <Modal isOpen={imgurl}
   onClose={()=>{
    onClose()
    setimgurl('')
   }}>
    <ModalOverlay/>
    <ModalContent>
    <ModalHeader>
    </ModalHeader>
    <ModalCloseButton/>
    <ModalBody>
      <Flex w={'full'} position={'relative'} py={'8px'}>
        <Image src={imgurl} maxH={'500px'}/>
        <Flex justifyContent={'center'}
        position={'absolute'}
        cursor={'pointer'}
        _hover={{
          bg:'gray.600'
        }}
        _focus={{
          bg:'gray.600'
        }}
         alignItems={'center'} bg={'gray.800'} height={'40px'}
        px={'9px'}
        onClick={handlecreatemesage}
        borderRadius={'5px'} bottom={'4'} right={'4'}>
        {isuploading ? 
        <Spinner size={'md'}/> :   <IoSendSharp size={'20'}/>}
        </Flex>
      </Flex>
    </ModalBody>
    </ModalContent>
   </Modal>
   </form>
  )
}

export default Inputfile