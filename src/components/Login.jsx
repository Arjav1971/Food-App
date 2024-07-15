import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {

  const navigate=useNavigate();
  const axiosPublic=useAxiosPublic()

  const location=useLocation();
  const from=location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const {signUpWithGmail,login}=useContext(AuthContext)
      const [errorMessage,setErrorMessage]=useState("")
      const onSubmit = (data) => {
        const email=data.email;
        const password=data.password
        login(email,password) 
        .then((result) => {
          // Signed in 
          const user = result.user;
          alert("Login Successfull")
        //   document.getElementById("my_modal_2").close()

          navigate(from,{replace:true})

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Provide a correct email and password !");
        });
      }
      const handleLogin=()=>{
        signUpWithGmail().then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const userInfo={
              name:result?.user?.displayName,
              email:result?.user?.email,
            }
            axiosPublic
            .post("/users", userInfo)
          .then((response) => {
            alert("Login Succesfull")
            // document.getElementById("my_modal_2").close()

            navigate("/");

          })
          .catch((error) => {
            if (error.response) {
              console.log("Error response:", error.response);
              if (error.response.status === 400) {
                console.log("Request redirected. Please try again.");
              } else if (error.response.status === 302) {
                console.log("User already exists");
                alert("Login Succesfull")
                navigate("/");

                // document.getElementById("my_modal_2").close()
    
                navigate(from,{replace:true})
              } else {
                console.log("An error occurred. Please try again.");
              }
            } else {
              console.log("Error:", error);
              console.log("An error occurred. Please try again.");
            }
          });


            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            alert(error)
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      }
  return (
    <div className="max-w-md bg-white shadow-lg w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0 mb-4">
        {/* <p className="py-4">Press ESC key or click outside to close</p> */}
        <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
        <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>

          <h3 className="font-bold text-lg">Please Login</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}

              required
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          {
            errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p>:""
          }
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green text-white text-lg">
              Login
            </button>
          </div>
          <p className="text-center my-2">
            Donot have an account?
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>
          </p>
          {/* </form> */}
        </form>
        <div className="text-center space-x-3">
          <button className="btn btn-circle text-lg bg-[#EDFFEF] hover:bg-green hover:text-white" onClick={handleLogin}>
            <FaGoogle/>
          </button>
          <button className="btn btn-circle text-lg bg-[#EDFFEF] hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle text-lg bg-[#EDFFEF] hover:bg-green hover:text-white">
            <FaGithub />
          </button>

        </div>
      </div>
      {/* <form method="dialog" className="modal-backdrop"> */}
    </div>
  );
};

export default Login;
