import { Avatar, Divider, Flex, Input, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
// import myimage from '../assets/my image.jpg'
import { CgMore } from 'react-icons/cg'
import Useractions from './useractions'
import Postcomment from '../components/postcomment'
import { formatDistanceToNow } from 'date-fns'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import Timecomponent from '../hooks/timecompnent'
import { FaCheck, FaTimes } from 'react-icons/fa'


const Usercomments = ({userimg,username,handleditreply,
  edit,setedit,updatecomment,setupdatecomment,
  usercomment,agaodate,replyid,handledeletereply}) => {
    const [like,setlike]=useState(false)
    const user1=useRecoilValue(useratom)
    let user=user1?.token
    const [inputfocus,setinputfocus]=useState(false)
    const inputref=useRef(null) 
   
    useEffect(()=>{
     if(usercomment)
      {
        setupdatecomment(usercomment)
      }
    
    },[usercomment])
    
    useEffect(()=>{
      if(edit && replyid === user._id)
        {
          setinputfocus(true)
        }
        else
        {
          setinputfocus(false)
        }
    },[edit,replyid,user._id])


    useEffect(()=>{
     if(inputfocus && inputref.current)
      {
        inputref.current.focus()
      }
    },[inputfocus])

    const handleinputfocus=()=>{
      setedit(true)
      setinputfocus(true)
    }

    return (
    <Flex  flexDirection={'column'}>
    <Flex w={'full'}>
     <Flex >
      <Avatar name={username}  
      src={userimg}  width={'30px'} height={'30px'}
        borderRadius={'50px'}/>
     </Flex>
     <Flex ml={'10px'} w={'full'} fontFamily={'sans-serif'} flexDirection={'column'}>
        <Flex w={'full'} justifyContent={'space-between'}>
            <Text>
              {username}
            </Text>
          { edit && replyid === user._id? 
            <Flex gap={'5px' }>
           <FaTimes color='red'
                         width={'15px'}
                         cursor={'pointer'}
                         onClick={()=>setedit(false)}/>
             <FaCheck color='green' 
                         width={'15px'} 
                         cursor={'pointer'}
                        onClick={handleditreply}/>                         
            </Flex>  :
           <Flex gap={'5px'} alignItems={'center'}>
            
             <Timecomponent time={agaodate}/>
             {replyid === user._id && 
             <Menu>
                <MenuButton>
                <CgMore cursor={'pointer'} width={'20px'}/>
                </MenuButton>
                <Portal>
                <MenuList  minWidth={'5rem'}
                   bg={'gray.dark'}>
                 <MenuItem color={'gray'}
                    bg={'gray.dark'}   
                    onClick={handleinputfocus}
                    _hover={{backgroundColor:'gray.800'}}>
                 Edit
                 </MenuItem> 
                 <MenuItem color={'red'}
                      bg={'gray.dark'} 
                      _hover={{backgroundColor:'gray.800'}}
                      onClick={handledeletereply}>
                 Delete
                 </MenuItem>
                </MenuList>
                </Portal>
            </Menu>
   }  
    </Flex>
     }   </Flex>
       { replyid === user._id && edit  ?
       <input className='commentinput' 
       value={updatecomment} ref={inputref} 
       onChange={(e)=>setupdatecomment(e.target.value)}
       /> : 
        <Text fontSize={'md'} my={'10px'} >
           {usercomment}
        </Text>
       }    
     </Flex>
    </Flex>
    <Divider my={'3'} w={'full'} h={'0.4px'} bg={'gray.light'}/>     
    </Flex>
  )
}

export default Usercomments