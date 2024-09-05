
import express from 'express'
import authuser from '../middlewares/authuser.js'
import { createmessage, getchatinfo, getmessage } from '../routes/messageroutes.js'

const router=express.Router()


router.post('/',authuser,createmessage)
router.get('/conversation',authuser,getchatinfo)
router.get('/:chatid',authuser,getmessage)


export default router;