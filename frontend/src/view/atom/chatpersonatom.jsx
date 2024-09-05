import { atom } from "recoil";


const chatperson=atom({
    key:'chatperson',
    default:{
        chatid:'',
        userid:'',
        profilpic:'',
        username:''     
    }
})

export default chatperson;