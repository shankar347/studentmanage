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
        getcurretnadminposts} from '../routes/postroutes.js';
import authuser from '../middlewares/authuser.js';
import multer from 'multer'


const router=express.Router();  
const upload=multer({storage:multer.memoryStorage()})

router.post('/create' ,upload.single('file'), authuser,createpost)
router.get('/feed',authuser,feedposts)
router.get('/classfeed',authuser,getclassposts)
router.get('/likes',authuser,getlikedposts)
router.get('/comments',authuser,getcommentedposts)
router.get('/:id',getpost)
router.get('/user/:id',getadminposts)
router.get('/currentuser/:id',authuser,getcurretnadminposts)
router.delete('/:id',authuser,deletepost)
router.put('/likes/:id',authuser,managelike)
router.post('/reply/:id',authuser,createreply)
router.get('/reply/:id',authuser,getreply)
router.put('/reply/:id',authuser,updatereply)
router.delete('/reply/:id',authuser,deletereply)

export default router;