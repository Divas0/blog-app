// import React from "react";
// import { useForm } from "react-hook-form";
// import authService from "../appwrite/auth";
// import { login as authlogin } from "../store/authSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Input from "../components/Input";
// import services from "../appwrite/services";

// function Signup() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async ({ name, email, password }) => {
//     try {
//       const data = await authService.createAccount(name, email, password );
//       if (data) {
//         const userData = await services.getCurrentuser();
//         if (userData) {
//           dispatch(authlogin(userData));
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   return (
//     <div className="border flex flex-col border-black w-full  h-screen justify-center items-center absolute gap-[10px] ">
//       <Input
//         {...register("name", {
//           required: true,
//         })}
//         className="py-[10px] px-[5px] border mt-[30px] rounded-md"
//         type="text"
//         placeholder=" enter your name"
//       />
//       <Input
//         {...register("email", {
//           required: true,
//         })}
//         className="py-[10px] px-[5px] border  rounded-md"
//         type="email"
//         placeholder=" enter your email"
//       />
//       {errors.email && (
//         <p className="text-red-500"> {`${errors.email.message}`}</p>
//       )}

//       <Input
//         type="password"
//         placeholder="Enter your password"
//         className="py-[10px] px-[5px] border  rounded-md"
//         {...register("password", {
//           required: true,
//           minLength: 6,
//           message: "enter valid password",
//         })}
//       />
//       {errors.password && (
//         <p className="text-white"> {`${errors.password.message}`}</p>
//       )}
//       <button
//         onClick={handleSubmit(onSubmit)}
//         className="py-[8px] px-[7px] border-black rounded-sm text-white bg-blue-600  "
//         disabled={isSubmitting}
//       >
//         submit
//       </button>
//     </div>
//   );
// }

// export default Signup;

import React, {useState} from 'react'
import authService from '../appwrite/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import { login } from '../store/authSlice.js'
import Input from '../components/Input.jsx'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import services from '../appwrite/services.js'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async({email, userName ,password}) => {
         console.log({email, userName ,password})
        setError("")
        try {
            const userData = await authService.createAccount({email, userName ,password});
            console.log(userData)
            console.log(userData)
            if (userData) {
                const userData = await services.getCurrentuser();
                if(userData) dispatch(login(userData));
                navigate("/all-posts")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg  rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log in 
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        name="userName"
                        placeholder="Enter your full name"
                        {...register("userName", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <button type="submit" className="w-full bg-blue-800 text-white font-bold py-[10px] rounded-lg">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup 