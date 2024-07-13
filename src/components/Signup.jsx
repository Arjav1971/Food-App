import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [alertMessage, setAlertMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, signUpWithGmail, updateUserProfile } =
    useContext(AuthContext);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((response) => {
            // handle success
            alert("Signin Successfull");
            navigate("/");
          });
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setAlertMessage("This email is already in use. Please Login.");
        } else {
          setAlertMessage("An error occurred. Please try again.");
        }
        console.error("Firebase error:", error);
      });
  };

  // login with gmail
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((response) => {
            // handle success
            alert("Signin Successfull");
            navigate("/");
          })
          .catch((error) => {
            if (error.response) {
              console.log("Error response:", error.response);
              if (error.response.status === 400) {
                console.log("Request redirected. Please try again.");
              } else if (error.response.status === 302) {
                console.log("User already exists");
                alert("Signin Successfull");
                navigate("/");
              } else {
                console.log("An error occurred. Please try again.");
              }
            } else {
              console.log("Error:", error);
              console.log("An error occurred. Please try again.");
            }
          });
      })
      .catch((error) => {
        // Handle Errors here.
        alert(error);
      });
  };

  return (
    <div className="max-w-md bg-white shadow-lg w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0 ">
        {alertMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="outlined" severity="warning">
              {alertMessage}
            </Alert>
          </Stack>
        )}
        <form
          className="card-body "
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>

          <h3 className="font-bold text-lg">Create an Account</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name")}
              required
            />
          </div>
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
            </button>
          </div>
          <p className="text-center my-2">
            Already have an account?
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="underline text-red ml-1"
            >
              Login
            </button>
          </p>
        </form>
        <div className="text-center space-x-3 mb-4">
          <button
            className="btn btn-circle text-lg bg-[#EDFFEF] hover:bg-green hover:text-white"
            onClick={handleRegister}
          >
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
      <Modal />
    </div>
  );
};

export default Signup;
