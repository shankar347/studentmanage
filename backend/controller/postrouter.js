import express from 'express'
import { createpost,
         getpost,
         deletepost,
         managelike ,
         createreply,
         updatereply,
        feedposts,
        getclassposts,
        getreply,
        deletereply,
        getadminposts,
        getlikedposts,
        getcommentedposts,
        getcurretnadminposts,
        getrecomendedpost} from '../routes/postroutes.js';
import authuser from '../middlewares/authuser.js';
import multer from 'multer'


const router=express.Router();  
const upload=multer({storage:multer.memoryStorage(),
        limits:{
                fileSize:1024*1024*15,
                fieldSize:1024*1024*15,
                fields:10 
        }
}).single('file')


const handlemulterupload=(req,res,next)=>{
        upload(req,res,(err)=>{
                if(err instanceof multer.MulterError){
                   if(err.code === 'LIMIT_FILE_SIZE')
                   {
                     return  res.status(200).json({error:'file size should be less than 15MB'})
                   } 
                   else if (err.code === 'LIMIT_FIELD_VALUE')
                   {
                        return res.status(200).json({error:'file size should be less than 15MB'})
                   }
                   return res.status(200).json({error:err.message})
                }
                else if(err){
                   return res.json({error: "Unknown error in uploading file"})
                }
                next()
        })
}


router.post('/create' ,handlemulterupload, authuser,createpost)
router.get('/feed',authuser,feedposts)
router.get('/classfeed',authuser,getclassposts)
router.get('/likes',authuser,getlikedposts)
router.get('/comments',authuser,getcommentedposts)
router.get('/:id',getpost)
router.get('/aifeed/:id',authuser,getrecomendedpost)
router.get('/user/:id',getadminposts)
router.get('/currentuser/:id',authuser,getcurretnadminposts)
router.delete('/:id',authuser,deletepost)
router.put('/likes/:id',authuser,managelike)
router.post('/reply/:id',authuser,createreply)
router.get('/reply/:id',authuser,getreply)
router.put('/reply/:id',authuser,updatereply)
router.delete('/reply/:id',authuser,deletereply)

export default router;