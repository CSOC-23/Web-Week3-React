/***
 * @todo Redirect the user to login page if token is not present.
 */
import { useRouter } from 'next/router'
 import { useEffect } from 'react'
 import { useAuth } from '../context/auth'

 export const Authrequired = ()=>{
     const {token} = useAuth()
     const router = useRouter()
     useEffect(()=>{
        if(!token){
            router.push('/login')
        }
     },[token])
 }