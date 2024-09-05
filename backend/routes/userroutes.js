import Usermodel  from '../model/userschema.js';
import bcrypt from 'bcryptjs'
import generatejwt from "../middlewares/generatejwt.js";
import {v2 as cloudinary} from 'cloudinary'
import Postmodel from "../model/postschema.js";
// import nodecache from 'node-cache'

// const usercache=new nodecache({stdTTL:600})



const Registeruser=async(req,res)=>{

    try
   {
    const {username,email,password,
        college,
        department,
        isfa
    }=req.body;
    
    const finduser= await Usermodel.findOne(
        {$or:[{email},{username}]})
    
    if(finduser)
    {
       return res.status(401).json({error:"User already exists"})
    }
    
    const salt= bcrypt.genSaltSync(10)
    const hashedpassword=bcrypt.hashSync(password,salt)
    
    const user= new Usermodel({
        username:username,
        email,
        password:hashedpassword,
        college,
        department,
        isfa
    })

    await user.save()

    if(user)
    {
        generatejwt(user._id,res)

       res.json({
            _id:user._id,
            college:user.college,
            department:user.department,
            isfa:user.isfa,
            username:user.username,
            email:user.email,
            password:user.password,
            bio:user.bio,
            profilepic:user.profilepic
        })
    }
    
    else
    {
      return  res.json({error: "Error in registering the user"})
    }

   }
   catch(err)
   {
    return res.status(500).json(err.message)
   }
}

const Loginuser=async(req,res)=>{
    try
    {
        const {email,password}=req.body;

        const user= await Usermodel.findOne({email})
         
        if(!user)
        {
            return   res.status(404).json({error:"User is not found"})
        }
        else
        {
            const checkpassword= bcrypt.compareSync(password,user.password)

            if(!checkpassword)
            {
                return  res.status(401).json({error:"password is incorrect"})
            }
            
            generatejwt(user._id,res)

            res.json({
            _id:user._id,
            college:user.college,
            department:user.department,
            isfa:user.isfa,
            username:user.username,
            email:user.email,
            password:user.password,
            bio:user.bio,
            profilepic:user.profilepic
             })     
        }      

    }
    catch(err)
    {
        if(err) throw err
        res.status(422).json({error:"Error"},err.message)
    }
}

const Logoutuser=async(req,res)=>{
    try{
      res.clearCookie('token')
      return  res.json("User Logged out successfully")
    } 
    catch(err)
    {
        return  res.json("Error",err.message)
    }
}

const Followuser=async(req,res)=>
{
    try
    {
       const {id}=req.params;

       const usertoupdate=await Usermodel.findById(id)
       const cureentuser=await Usermodel.findById(req.user._id)

       if(id === req.user._id.toString())
       {
        return   res.json({error: "You cannot follow or unfollow yourself"})
       }    

       else
       {
        
        const checkfollowing=cureentuser.following.includes(id)
 
        if(checkfollowing)
        {
          await Usermodel.findByIdAndUpdate(req.user._id,
         {$pull:{following:id}})
          await Usermodel.findByIdAndUpdate(id,
            {$pull:{followers:req.user._id}})
             return    res.json("unfollowed successfully")
        }
       else
       {
         // cureentuser.following.push(id)
         await Usermodel.findByIdAndUpdate(req.user._id,
             {$push:{following:id}})
         await Usermodel.findByIdAndUpdate(id,
                 {$push:{followers:req.user._id}})
                 return         res.json("followed successfully")
       }
       }

    //    res.status(201).json(
    //      "user is followed or unfollowed" ,
    //      {
    //         cureentuser,
    //         usertoupdate
    //      }
    //    )
  
     
    }
    catch(err)
    {
        return  res.status(422).json(err.message)
    }
}

const updateuser=async(req,res)=>{

    try
    {
        const {id}=req.params
         const userId=req.user._id
        const {password,username,email,bio}=req.body;
        let {profilepic}=req.body;

        if(userId.toString() !== id)
        {
            return  res.json({error:"you cannot update any user"})
        }

        if(!password && !username && !email
            && !profilepic && !bio)
         {
            return res.json({error:"Provide atleast one value to update"})
         }   
        
         else
         {
            const user=await Usermodel.findById(userId);
             console.log('first user',user)
            if(profilepic)
            {
                // console.log(profilepic)
                if(user.profilepic)
                {
                    await cloudinary.uploader.
                    destroy(user.profilepic.split('/').pop().split('.')[0])
                }
                                   
                const uploadres= await cloudinary.uploader.upload(profilepic,
                    {
                        crop:'scale',
                        format:'auto',
                        quality:'auto'
                      }
                )
                profilepic=uploadres.secure_url;
              console.log(uploadres)
            } 

            if(password)
            {
              const salt=bcrypt.genSaltSync(10)
              const hashedpassword=bcrypt.hashSync(password,salt)
              user.password=hashedpassword
            } 
            if(username) user.username=username
            if(email) user.email=email
            if(profilepic) user.profilepic=profilepic
            if(bio) user.bio=bio
            console.log(user)
          await  user.save()

          await Postmodel.updateMany({
            "replies.user": userId},
            {
                $set:{
                    "replies.$[reply].name":user.username,
                    "replies.$[reply].profilepic":user.profilepic
                }
            },
            {arrayFilters:[{"reply.user":userId}]}
          )
             return  res.status(200).json(user) 
         }
    }

    catch(err)
    {
        return  res.status(422).json(err.message)
    }
}

const GetprofilefromMongodb=async(userId)=>{
  try
  {
   const userprofile=await Usermodel.findById(userId)
   return userprofile
  }
  catch(err)
  {
    console.log('Error in fetching user',err)
  }
}

// const setcacheforUser=async(userId)=>{
//      let profile=usercache.get(userId)
//      if(!profile)
//         {
//             profile =await GetprofilefromMongodb(userId)
//         }
//     else{
//         usercache.set(userId,profile)
//     }  
//     return profile
// }

const Getprofile=async(req,res)=>{
    try
    {
       
        // const userid=req.params.id;
        const {id}=req.params
       

        let user=await Usermodel.findById(id)

        if(!user)
        {
            return   res.status(400).json({error:"User is not found"})
        }

         res.json(user)
 
    }

    catch(err)
    {
       res.status(500).json(err.message)
       console.log(err)
    }
}


const getuserprofile=async(req,res)=>{
    
    const {id} =req.params;

    try
    {
    const user=await Usermodel.findById(id)
    
    if(!user)
        {
         return   res.json({error:'User is not found'})
        }
    
     res.json(user)   

    }
    catch(err)
    {
       res.status(500).json(err.message)
       console.log(err)
    }

}

const Getprofilename=async(req,res)=>{
   const {id}=req.params;
   try
   {
    const user=await Usermodel.findOne({username:id})
    .select('-password')
    .select('updatedAt')

    if(!user)
        {
            return res.json ({error:'User not found'})
        }
    
     res.json(user)        
   }
   catch(err)
   {
      res.status(500).json(err.message)
   }
}

const randomusers=async(req,res)=>{
    try
    {
      const randomuser=await Usermodel.aggregate([
        {$sample:{size:10}}
      ]
    )

    if(!randomuser)
        {
            return res.json('no random users are fetched')
        }
    
    res.json(randomuser)

    }
    catch(e)
    {
        console.log(e)
    }
}

const getallusers=async(req,res)=>{
   try
   {
    const users=await Usermodel.find({})
    
    res.json(users)

   }
   catch(e)
    {
        console.log(e)
    }
}
export {
    Registeruser,
    Loginuser,
    Logoutuser,
    Followuser,
    updateuser,
    Getprofile,
    Getprofilename,
    randomusers,
    getallusers,
    getuserprofile
}