import React, { createContext, useState } from 'react'

export const searchcontext=createContext()



const Searchcontext = ({children}) => {
    const [search,setsearch]=useState(false)
    const [searchtext,setsearchtext]=useState('')
    const [inputvisible,setinputvisible]=useState(false)
    const [searchusers,setsearchusers]=useState(null)
    const [input,setinput]=useState('')
    const [story,setstory]=useState(true)
    const [profileloading,setprofileloading]=useState(false) 
    const [profileloading1,setprofileloading1]=useState(false) 
    const [adminstories,setadminstories]=useState([])
    const [profilepage,setprofilepage]=useState('posts');
    const [loading,setloading]=useState(false)
    const [visible,setvisible]=useState(false)
    const [visible1,setvisible1]=useState(false)

  return (
    <searchcontext.Provider value={{search,setsearch,
        searchusers,setsearchusers,
        inputvisible,setinputvisible,
        searchtext,setsearchtext,
        input,setinput,
        story,setstory,
        profileloading,setprofileloading,
        profileloading1,setprofileloading1,
        adminstories,setadminstories,
        profilepage,setprofilepage,
        loading,setloading,
        visible,setvisible,
        visible1,setvisible1
    }}>
      {children}
    </searchcontext.Provider>
  )
}

export default Searchcontext