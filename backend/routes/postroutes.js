import Postmodel from "../model/postschema.js";
import Usermodel from "../model/userschema.js";
import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
// import nodecache from 'node-cache'

// const postcache=new nodecache({stdTTL:600})


// const upload=multer({storage:multer.memoryStorage()})


const createpost=async(req,res)=>{
 
    try
    {
        // console.log('cloudinary',cloudinary.config.name)
        const {admin,adminname,adminprofilepic,filename,
             text}=req.body;
        let {img}=req.body
        let file = req.file     
        console.log(img,text,file)
        const user= await Usermodel.findById(admin)
        if(!user)
        {
          return  res.status(404).json({error:'User is not found'})
        }

        if(user._id.toString() !== req.user._id.toString())
        {
          return  res.status(401).json({error:"Unauthorized to creat post"})
        }

        if(!text &&  !img && !file)
        {
          return  res.status(400).json({error:"provide atleast text or img to post"})
        }
        
        if(img)
        {
          const uploadurl=  await cloudinary.uploader.upload(img)
          img=uploadurl.secure_url;
        }
        let fileurl;
        if (file)
        {

            const uploadresult=await new Promise((resolve,reject)=>{
            const fileupload=  cloudinary.uploader.
            upload_stream(
                {resource_type:'auto'},
                (err,result)=>{
                    if (err){
                        reject({error:err?.message})
                    }
                    else{
                    resolve(result)
                    }
                }
            )
        
            streamifier.createReadStream(file.buffer).pipe(fileupload)
            })

            
            fileurl=uploadresult.secure_url

            const post=new Postmodel({
                admin,
                text,
                adminname,
                adminprofilepic,
                img,
                file:fileurl,
                filename
            })
            await post.save()
            res.status(201).json(post)
        }
         else {
            const post=new Postmodel({
                admin,
                text,
                adminname,
                adminprofilepic,
                img
            })
            await post.save()
            res.status(201).json(post)
         }
      
       
   
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}


const getpost=async(req,res)=>{
    try
    {
        const {id}=req.params;

        const post=await Postmodel.findById(id)

        if(!post)
        {
          return res.json("Post is not found")
        }

        res.json(post)
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}

const getadminpost=async(userId)=>{
   try
   {
    const post=await Postmodel.find({admin:userId}).sort({createdAt:-1})
    return post
   }
   catch(err)
   {
    console.log('Post Error',err)
   }
}

const setadmincache=async(userId)=>{
    let adminpost=postcache.get(userId)
    if(!adminpost)
        {
            adminpost=await getadminpost(userId)
        }
    else
    {
        postcache.set(userId,adminpost)
    }   
    return adminpost 
}

const getadminposts=async(req,res)=>
    {
        try
        {
            const {id}=req.params

            const user=await Usermodel.findById(id)
            
            if(!user)
                {
                    return res.status(404).json({error: 'User is not found'})
                }

          const post=await Postmodel.find({admin : user._id}).sort({createdAt:-1})
          res.json(post)
        }
        catch(err)
        {
            res.json(err.message)
        }
    }


 const getcurretnadminposts=async(req,res)=>{
    try
    {
        const {id}=req.params
       const adminpost=await setadmincache(id)
       
       res.json(adminpost)
    }
    catch(err)
    {
        console.log(err)
    }
 }   


const deletepost=async(req,res)=>{
    try
    {
        const {id}=req.params;
        const post=await Postmodel.findById(id)

        if(!post)
        {
          return  res.json("Post is not found")
        }
        else
        {
            if(post.admin.toString() !== req.user._id.toString())
            {
               return  res.json('Unauthorized to delete post')
            }
    
          else
          {
            await Postmodel.findByIdAndDelete(id)
              
            res.json('Post is deleted')
          }
            
        } 
      
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}

const managelike=async(req,res)=>{
    try
    {
        const {id}=req.params;

        const post=await Postmodel.findById(id)
       
        if(!post)
        {
        return res.json("Post is not found")
        }

      else
      {
        // const checklike=post.likes.findIndex(
        //     (like)=>like.user.toString() 
        //     === req.user._id.toString())

        const checklike=post.likes.find((like)=>
       like.user.equals(req.user._id))
        
       console.log(checklike)

        const like={}
        like.name=req.user.name;
        like.user=req.user._id;

        if(!checklike)
        {
            post.likes.push(like)
            await post.save()
            res.json("Liked the post")
        }
      
        else
        {
          
            post.likes.pull(like)
            await post.save()   
            res.json("Unliked the post")
        }
    }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}


const createreply=async(req,res)=>{
    try
    {
        const {id}=req.params;
        const {comment}=req.body;
        const user=req.user._id;
        const profilepic=req.user.profilepic;
        const name=req.user.username;

        const post=await Postmodel.findById(id)

        if(!post)
        {
          return  res.json("Post is not found")
        }
        
        const checkreply=post.replies.findIndex((reply)=>(
            reply.user.toString() === user.toString()
        ))
        console.log(checkreply)
        if(checkreply !== -1)
          {
            return res.json({error: 'You are already reviewed'})
          }  
        else
        {

            const replies={
                user,
                comment,
                profilepic,
                name
            }
           
            post.replies.push(replies)

            await post.save()

          res.json('reply is created')  
        }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}


const updatereply=async(req,res)=>{
    try{
       const {id}=req.params;
       const {comment,userid}=req.body;

       const post=await Postmodel.findById(id)

       if(!post)
       {
      return  res.json("Post is not found")
       }
       else
       {

        const checkindex=post.replies.findIndex(
            (reply)=>reply.user.toString() ===
             userid.toString())
         console.log(checkindex)
          if(checkindex === -1)
          {
           return  res.json("Reply is not created yet")
          }
          
        else    
       {
         const updatereply=post.replies[checkindex];

        if(comment) updatereply.comment=comment

         await post.save()
           
         res.json(updatereply)
       }
     
       }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}

const feedposts=async(req,res)=>{
  
    try{
       
        const id=req.user._id;

        const user=await Usermodel.findById(id)

        if(!user)
        {
           return res.json("User is not found")
        }

        else
        {
           const following=  user.following;

           const feedposts= await Postmodel.find({
            admin:{$in:following}
           }).sort({createdAt:-1});

           res.json(feedposts)
        }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}

const getclassposts=async(req,res)=>{
    try{
      const id=req.user._id  
      const user=await  Usermodel.findById(id)
      if(!user)
      {
        return res.json("User is not found")
      }
      let department=user.department 
      
      let classmates=await Usermodel.find({
        department:department
      })
      let posts=await Postmodel.find({
        admin:{$in:classmates}
      }).sort({createdAt:-1})
      res.json(posts)
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }   
}

const getreply=async(req,res)=>{
    try
    {
      const {id}=req.params;
      const post= await Postmodel.findById(id)
      if(!post)
        {
            return res.json({error:'Post is not found'})
        }
      const reply= post.replies

      res.json(reply)  
    }
    catch(e)
    {
        res.status(500).json(e.message)
    }
}


const deletereply=async(req,res)=>{
    try
    {
     const {id}=req.params;
     const {reviewid}=req.body;
     const post=await Postmodel.findById(id)
    

     if(!post)
        {
           return res.json({error:'post is not found'})
        }
        const checkreply=post.replies.findIndex((reply)=>
        reviewid.toString() === reply.user.toString())
        if(checkreply === -1)
            {
              return  res.json("reply is not created yet")
            }
        
         post.replies.splice(checkreply,1)
     
         
         await post.save()

         res.json('Reply deleted sucessfully')
    }
    catch(e)
    {
        res.status(500).json(e.message)
    }
}


const getlikedposts=async(req,res)=>{
    try
    {
     
     const posts=await Postmodel.find({}).sort({createdAt:-1})
      
        
  
    if(!posts)
        {
            return res.json({error:"Post is not found"})
        }     
    
        // res.json(posts)
        
    const likedposts=posts.filter((post)=>
     post.likes.find((like)=>
    like.user.toString() === req.user._id.toString()))
   
    res.json(likedposts)
    }
    catch(e)
    {
        res.status(500).json(e.message)
    }
}

const getcommentedposts=async(req,res)=>{
    try
    {
     const posts= await Postmodel.find({})
     
     if(!posts)
        {
            return res.json({error:"Post is not found"})
        }

     const commentedposts=posts.filter((post)=>
     post.replies.find(
        (reply)=>reply.user.toString()=== req.user._id.toString()))
     
     res.json(commentedposts)   
    }
    catch(e)
    {
       res.status(500).json(e.message)
    }
}

export {
    createpost,
    getpost,
    deletepost,
    managelike,
    createreply,
    updatereply,
    feedposts,
    getreply,
    getadminposts,
    getcurretnadminposts,
    deletereply,
    getlikedposts,
    getclassposts,
    getcommentedposts
}