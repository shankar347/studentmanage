import Postmodel from "../model/postschema.js";
import Usermodel from "../model/userschema.js";
import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
// import tf from '@tensorflow/tfjs-node'
// import mobilenet from '@tensorflow-models/mobilenet'
import { createCanvas, loadImage } from 'canvas'
import natural from 'natural'

const { TfIdf } = natural


// (async () => {
//     const { TfidfVectorizer, cosineSimilarity } = await import('tf-idf');
    
//     // Now you can use TfidfVectorizer and cosineSimilarity
//   })();
  




const createpost=async(req,res)=>{
 
    try
    {
        // console.log('cloudinary',cloudinary.config.name)
        const {admin,adminname,adminprofilepic,filename,
             text,domains}=req.body;
        // console.log(domains)
        let {img}=req.body
        let file = req.file     
        // console.log(img,text,file)
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
        //   console.log(img)
        }
        let fileurl;
        if (file)
        {

           

            const uploadresult=await new Promise((resolve,reject)=>{
            const fileupload=  cloudinary.uploader.
            upload_stream(
                {resource_type:'raw',
                // access_control: [{ access_type: 'public' }] 
                upload_preset:'public_uplload',
                },
                
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
                domains,
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
                img,
                domains
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
    //  console.log(user._id) 
      classmates = classmates.filter(classmate=>(
        classmate._id.toString() !== user._id.toString()
      ))
    //   console.log(classmates)
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
        (reply)=>reply.user.toString()=== req.user._id.toString())
    
    )
     
     res.json(commentedposts)   
    }
    catch(e)
    {
       res.status(500).json(e.message)
    }
}

const cosineSimilarity=(vec1,vec2)=>{
    const dotProduct = vec1?.reduce((sum, val, idx) => sum + val * vec2[idx], 0);
    const magnitude1 = Math.sqrt(vec1?.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2?.reduce((sum, val) => sum + val * val, 0));
    
    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0; 
    }
    return dotProduct / (magnitude1 * magnitude2);
}    

const getTfIdfVector = (tfidf, text) => {
    const vector = [];
    tfidf.tfidfs(text, (i, measure) => {
      vector.push(measure);
    });
    return vector;
  };

const getrecomendedpost=async(req,res)=>{
   try{
     const {id:likedpostid}=req.params

     const likedpost=await Postmodel.findById(likedpostid)
     let recomendedpost;
     let domainrecomedations=[]
     if (likedpost.domains && likedpost.domains.length !== 0)
     {
      const domainposts=await Postmodel.find({
        domains:{
            $in:likedpost.domains
        }
      })       
      domainrecomedations=domainrecomedations.concat(domainposts).slice(0,5).filter(
        (post)=> post?.admin.toString() !== req?.user?._id.toString()) 
     }
 
  

     if(!likedpost)
        {
           return res.json({error:"Post is not found"})
        }
        
        const tfidf =new TfIdf()

        let posts=await Postmodel.find()
        posts=posts.filter((post)=>post.text)
        
        if (posts.length > 50)
        {
            posts=posts.slice(0,50)
        }

        // console.log(posts.map((post)=>post.text))
        // console.log(likedpost.domains) 
        // console.log(likedpost.text)
        posts.forEach((post)=>{
           tfidf.addDocument(post.text)
        })
        if (!likedpost.text)
            {
                return res.json([])
            }    

       

        const likedpostvector=getTfIdfVector(tfidf,likedpost.text)
        const simialities=posts.map((post)=>
       {
        if(post.text){
        const postvector=getTfIdfVector(tfidf,post.text)
        return{
            post:post._id,
            similarity:cosineSimilarity(likedpostvector,postvector)
        }
    }
    return null
       }
        ).filter(Boolean)
    //    console.log(simialities)
       //  return predections
   
        simialities.sort((a,b)=>
           b.similarity - a.similarity
       )
   
       recomendedpost=await Postmodel.find({
       '_id' : {$in: simialities.slice(0,5).map(sim=>sim.post)
}
       })

    const totalrecomedations=[...new Set([...recomendedpost,...domainrecomedations])]
    .filter((post)=>(
       post?.admin.toString() !== req?.user?._id.toString() 
    ))
    // console.log(domainrecomedations)   
    // console.log(recomendedpost)
    // console.log(totalrecomedations) 
    // console.log(totalrecomedations)
    return res.json(totalrecomedations)
   }
   catch(err)
   {
    res.status(500).json(err.message)
    console.log(err?.message)
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
    getcommentedposts,
    getrecomendedpost,
    // getrecomendedpost,
}