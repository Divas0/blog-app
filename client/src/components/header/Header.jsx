import React from 'react'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate} from 'react-router-dom'



const Header = () => {
  const navigate = useNavigate();
  const authStatus=useSelector( (state)=> state.auth.status)
  console.log(authStatus)
 
  
  const navItems = [
    {
      name: 'Home',
      slug: "/home",
      active: true
    }, 
    {
      name: "Login",
      slug: "login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <div>
       <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
           
    </div>
  )
}

export default Header