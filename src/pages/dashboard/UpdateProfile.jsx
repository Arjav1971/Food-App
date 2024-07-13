import React, { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const {updateUserProfile}=useContext(AuthContext);
  const navigate=useNavigate();
  const location=useLocation();
  const from=location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    const name=data.name;
    const photoURL=data.photoURL
    console.log(name,photoURL);
    updateUserProfile(name,photoURL).then(() => {
      // Profile updated!
      alert("Profile Updated Successfully!")
      navigate(from,{replace:true})
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="your name"
              className="input input-bordered"
              {...register("name")}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              {...register("photoURL")}
              required
            />
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green text-white text-lg">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
