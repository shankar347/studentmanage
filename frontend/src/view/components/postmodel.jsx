
import { Avatar, Box, Button, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import bluetick from '../assets/correct.png'
// import myimage from '../assets/my image.jpg'
import {CgMore} from 'react-icons/cg'
import Useractions from '../user/useractions'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import { formatDistanceToNow} from 'date-fns'
import Timecomponent from '../hooks/timecompnent'
import { AiOutlineDelete } from 'react-icons/ai'
import getUserInfo from '../hooks/handleuser'
// import Poscontext from './postcontext'
import { searchcontext } from './searchcontext'
import { BsFileEarmarkPdf } from 'react-icons/bs'

const Postmodel = ({post,postadmin,handledeletepost,user1,
  likedpostid
}) => {
  
    const [like,setlike]=useState(false)
  
    const user2=useRecoilValue(useratom)
    let user=user2?.token
   const {profileloading,setprofileloading} =useContext(searchcontext)
    const [post2,setadmin]=useState(null)
    const finduser= post?.replies?.find((reply)=>reply.user ===user._id )
    const navigate=useNavigate()
     

   const location=useLocation()
   const checklocation=location.pathname === '/'
    // console.log(post)
   
  return (
   
    <Flex fontFamily={'sans-serif'} gap={'3'} mb={'2'} 
    py={'5'} zIndex={0}>
     <Flex flexDirection={"column"} 
     alignItems={'center'}>
      <Avatar  name={post?.adminname} size={"md"}
     onClick={(e)=>{
        e.preventDefault()
        navigate(`/${post?.admin}`)
      }}
      src={user._id === post?.admin ? user?.profilepic : post?.adminprofilepic}
      cursor={'pointer'}
      loading='lazy'
       />
      <Box w={'1px'} h={'full'} bg={'gray.light'} mb={'5px'}>
      </Box>
   
    {
      post?.replies &&       
      <Box position={"relative"} w={'full'} >
        
      {
            post?.replies?.length === 1  &&  
            <Avatar name={post?.replies[0]?.name} 
            size={'xs'} position={'absolute'}   loading='lazy'
            src={post?.replies[0]?.profilepic 
                ? post?.replies[0]?.profilepic : 
                post?.replies[0]?.name }  top={'-20px '} 
            left={'10px'} bottom={'0px'} right={'0px'} padding={'2px'}/>
    
        }
        

        {
            post?.replies[0] && post?.replies?.length !== 1   && 
           
            <Avatar name={post?.replies[0]?.name}    loading='lazy'
        size={'xs'} position={'absolute'} 
        src={post?.replies[0]?.profilepic 
            ? post?.replies[0]?.profilepic : 
            post?.replies[0]?.name }  top={'-20px '} 
        left={'0px'} bottom={'0px'} right={'0px'} padding={'2px'}/>
        }
        
        { post?.replies[1] &&  
           <Avatar name={post?.replies[1]?.name} 
        size={'xs'} position={'absolute'}   loading='lazy'
        src={post?.replies[1]?.profilepic 
            ? post?.replies[1]?.profilepic : 
            post?.replies[1]?.name } 
        top={'-20px'} left={'25px'}  right={'0px'}
         padding={'2px'} />
}
         {
            post?.replies[2] &&   
            <Avatar name={post?.replies[2]?.name}  
        size={'xs'} position={'absolute'}   loading='lazy'
        src={post?.replies[2]?.profilepic 
            ? post?.replies[2]?.profilepic : 
            post?.replies[2]?.name } 
        padding={'2px'} 
        top={'0px'} left={'13px'}/>
         }
      </Box>
    }

    </Flex>  
    <Flex flex={'1'}  flexDirection={'column'}  >
     <Flex justifyContent={'space-between'} 
     w={'full'}>
      <Flex gap={'1'}>
      <Text fontSize={'17'} 
      fontFamily={'sans-serif'}  fontWeight={'550'}>{post?.adminname }</Text>
     {/* <Image borderRadius={'50px'} w={'14px'} h={'14px'} 
     src={bluetick} mt={'3px'}/> */}
      </Flex>
       <Flex width={'60px'} justifyContent={'space-between'}>
      <Timecomponent time={post.createdAt}/>
      { post.admin === user._id && !checklocation &&
       <AiOutlineDelete size={'20'} color='gray.dark'
       onClick={handledeletepost} cursor={'pointer'}/>
        }
        </Flex>
     </Flex>
     <Link to={`/${postadmin}/${post?._id}`}>
      <Flex overflowY={'scroll'} width={{
        sm:'250px',
        md:'auto',
        lg:'auto',
        base:'250px'}} maxH={'150px'}>
     <Text width={'full'}  fontSize={'sm'}>
      {post?.text}
      </Text>
      </Flex>
     </Link>  
     {
      post?.file && (
      <Box mt={'10px'} >
          <Link to={`/${postadmin}/${post?._id}`} >
         <BsFileEarmarkPdf color='rgb(88, 164, 197)' 
                  size="100px" width={'auto'} />
          </Link>
      <Text>
      {post?.filename}
      </Text>

      <Button mt={'1'} colorScheme='blue' mr={'7'}
    //  onClick={handlecreate} 
          >
                  <a href={post?.file} 
                  //  target="_blank"  
                  download={post?.filename}
                   rel="noopener noreferrer">
                 Download
                 </a>
                 </Button>
      </Box>
      )
     }
     
     {post?.img && (
         <Box
         overflow={'hidden'} borderRadius={'8px'} 
         mt={'10px'}  border={'2px solid'} 
         borderColor={'gray.light'} maxW={'450px'}>
           <Link to={`/${postadmin}/${post?._id}`}>
          <Image 
          loading='lazy' 
          src={post.img} maxH={{
          md:'500px',
          lg:'500px',
          sm:'300px',
          base:'300px'}}
           w={'full'} />
          </Link>    
         </Box>
     )}

{
  post?.domains.length !==0 && (
    <Flex gap={'1'} width={'80%'} mt={'1'} flexWrap={'wrap'}>
      {
        post?.domains?.map((domain)=>(
          <Text key={domain} color={'blue.400'}>
            #{domain}
          </Text>
        ))
      }
      </Flex>
  )
}

     <Flex my={'12px'} flexDirection={'column'}>
      <Useractions post={post} likedpostid={likedpostid}/>
     </Flex>
     
    
    </Flex>
    </Flex>  

  )
}



export default Postmodel