
import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

const changeimage = () => {

    const [imgurl,setimgurl]=useState()
     const toast=useToast()
    const handleimagchange=(e)=>{
     
        const file=e.target.files[0];

        if(file && file.type.startsWith('image/'))
        {

            const render=new FileReader();

            render.onloadend=()=>{
                setimgurl(render.result)
            }

            render.readAsDataURL(file)
        }
        else
        {
           toast({
            description:"Invalid file type",
            title:'Error'
           })
           setimgurl(null)
        }  

    }
  return {imgurl,handleimagchange,setimgurl}
}

export default changeimage