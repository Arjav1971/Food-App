import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
const Signup = () => {
  const navigate=useNavigate();
   
  // 1:37
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const {createUser,login}=useContext(AuthContext)

      const onSubmit = (data) => {
        const email=data.email;
        const password=data.password
        createUser(email,password)
        .then((result) => {
          // Signed up 
          const user = result.user;
          alert("Signin Successfull")
          // document.getElementById("my_modal_2").close()

          navigate("/")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      }

  return (
    <div className="max-w-md bg-white shadow-lg w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        {/* <p className="py-4">Press ESC key or click outside to close</p> */}
        <form
          className="card-body "
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</Link>

          <h3 className="font-bold text-lg">Create an Account</h3>

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
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green text-white text-lg">
              Sign Up 
              {/* 42:21 */}
            </button>
          </div>
          <p className="text-center my-2">
            Already have an account?
            <button onClick={() => document.getElementById("my_modal_2").showModal()} className="underline text-red ml-1">
              Login
            </button>
          </p>
          {/* </form> */}
        </form>
        <div className="text-center space-x-3 mb-4">
          <button className="btn btn-circle text-lg bg-[#EDFFEF] hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle text-lg bg-[#EDFFEF] hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle text-lg bg-[#EDFFEF] hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal/>
    </div>
  );
};

export default Signup;
