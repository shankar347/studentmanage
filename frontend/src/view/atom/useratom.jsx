import { atom } from "recoil";

const useratom=atom({

    key:'useratom',
    default:JSON.parse(localStorage.getItem('token'))
})

export default useratom;