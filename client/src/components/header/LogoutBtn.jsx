import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout as authlogout} from '../../store/authSlice'

const LogoutBtn = () => {
  const navigate=useNavigate()
    const dispatch=useDispatch();
    const handleLogout=()=>{
         authService.logout().then(()=> {
            dispatch(authlogout());
            navigate("/home")
         })
    }

  return (
    <>
    <button onClick={handleLogout} className=' py-[8px] px-[16px] bg-white  font-bold text-black   shadow-md  rounded-md '> logout</button></>
  )
}

export default LogoutBtn