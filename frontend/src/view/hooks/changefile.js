import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

const Changefile = () => {
    
    const [fileurl,seturl] =useState(null)
    const [filetype,setfiletype]=useState(null)
    const [file1,setfil1]=useState(null)
    const [filename,setfilename]=useState(null)
    const toast=useToast()
    const handlechangefile=(e)=>{
       const file=e.target.files[0]
       if (file)
       {
       setfilename(file?.name)
        const maxsize=10*1024*1024
        const allowedtypes=[
            'application/pdf',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]

        if (file.size > maxsize)
        {
            toast({
                description:"File shoud be within 10MB",
                status:'error'
            })
             seturl(null)
             setfil1(null)       
            return
        }
        
        if (allowedtypes.includes(file.type))
        {
           setfiletype(file.type)

           const reader=new FileReader()
           reader.onloadend=()=>{
            seturl(URL.createObjectURL(file))
           }
           reader.readAsDataURL(file)
           setfil1(file)
        }

         else{
            toast({
                status:'error',
                description:"Invalid file type"
            })
            seturl(null)
            setfil1(null)
           }   
       }
       else{
        seturl(null)
        toast({
            status:'error',
            description:"Invalid file"
        })
       }
    }

    return {handlechangefile,fileurl,seturl,filetype,filename,file1,
        setfil1
    }
}

export default Changefile