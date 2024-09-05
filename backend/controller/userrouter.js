
import express from 'express'
import { Registeruser,
         Loginuser,
         Logoutuser,
         Followuser,
         updateuser,
         Getprofile,
         Getprofilename,
         randomusers,
         getallusers,
         getuserprofile} from '../routes/userroutes.js'
import authuser from '../middlewares/authuser.js'

const router= express.Router()

router.post('/register',Registeruser)
router.post('/login',Loginuser)
router.get('/logout',Logoutuser)
router.get('/allusers',authuser,getallusers)
router.get('/randomusers',authuser,randomusers)
router.post('/follow/:id',authuser,Followuser)
router.put('/profile/:id',authuser,updateuser)
router.get('/profile/:id',authuser,Getprofile)
router.get('/profilename/:id',authuser,Getprofilename)


router.get('/update/:id',(req,res)=>{
    res.send("Hell welcome")
})

export default router;