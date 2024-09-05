
import jwt from 'jsonwebtoken'
import Usermodel from '../model/userschema.js'


const authuser=async(req,res,next)=>{
    try{
      const token=req?.cookies?.token
      // console.log(token)
      if(!token)
      {
        return  res.status(401).json({message:"User in unauthorized"})
      }
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      
      const user=await Usermodel.findById(decoded.userid).select('-password')
      // console.log(user)
      req.user=user
     
      next()
    } 
    catch(err)
    {
        res.status(500).json({message: "Error in authoriztion",error: err.message})
    console.log("Error in authorization",err.message) 
    }
}


export default authuser