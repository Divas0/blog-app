import React from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authlogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { toast } from "react-toastify";

function Login() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
   
  } = useForm();

  const onSubmit =  async ({email, password}) => {
     try {
        const session= await authService.login({email, password});
     if (session){
        const userData=authService.getCurrentuser();
        console.log(userData)
        if (userData){
         dispatch(authlogin(userData));
         navigate("/all-posts")
         toast.success("succesfully logged in ", {
          position:"top-right"
         })
        }
    }
     } catch (error) {
         throw error;
     }
  };

  return (
    <div className="border flex flex-col border-black w-full  h-screen justify-center items-center absolute gap-[10px] ">
      <div className="w-[400px] flex flex-col gap-[15px] ">
      <Input
        {...register("email")}
        className="py-[10px] px-[7px] border  rounded-md"
        type="email"
        placeholder="email.."
      />
      {errors.email && (
        <p className="text-red-500"> {`${errors.email.message}`}</p>
      )}

      <Input
        {...register("password")}
        className="py-[10px] px-[7px] border"
        type="password"
        placeholder="password.."
      />
      {errors.password && (
        <p className="text-red-500"> {`${errors.password.message}`}</p>
      )}
      <button
        onClick={handleSubmit(onSubmit)}
        className="py-[10px] px-[7px] border-black rounded-lg text-white bg-blue-600  "
        disabled={isSubmitting}
      >
        submit
      </button>
      </div> 
    </div>
  );
}

export default Login;
