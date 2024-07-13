import React from "react";
import { ImSpoonKnife } from "react-icons/im";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const AddMenu = () => {
    const { register, handleSubmit,reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure=useAxiosSecure();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        // console.log("log1",data);

        const imageFile = { image: data.image[0] };
        // console.log("log",imageFile)
        const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        });
        console.log(hostingImage);

        if (hostingImage && hostingImage.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImage.data.data.display_url
            };
            console.log(menuItem);

            const postMenuItem=axiosSecure.post('/menu',menuItem);
            console.log(postMenuItem)
            // 1:29
            if(postMenuItem){
              reset()
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Item is inserted successfully!",
                showConfirmButton: false,
                timer: 1500
              });
            }
        }
    };

    return (
        <div className="w-full px-4">
            <h2 className="text-3xl font-semibold my-4">
                Upload A New <span className="text-green">Menu Item</span>
            </h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="form-control w-full ">
                            <div className="label text-lg font-semibold">
                                <span className="label-text">
                                    Recipe Name<span className="text-red">*</span>
                                </span>
                            </div>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="Recipe Name"
                                className="input input-bordered w-full "
                            />
                        </label>
                    </div>

                    <div className="flex gap-10 ">
                        <label className="form-control w-1/2 ">
                            <div className="label text-lg font-semibold">
                                <span className="label-text">
                                    Category<span className="text-red">*</span>
                                </span>
                            </div>
                            <select {...register("category", { required: true })}
                                className="select select-bordered" defaultValue="default">
                                <option disabled value="default">
                                    Select a category
                                </option>
                                <option value="salad">Salad</option>
                                <option value="drinks">Drinks</option>
                                <option value="dessert">Dessert</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="popular">Popular</option>
                            </select>
                        </label>
                        <label className="form-control w-1/2 ">
                            <div className="label text-lg font-semibold">
                                <span className="label-text">
                                    Price<span className="text-red">*</span>
                                </span>
                            </div>
                            <input
                                {...register("price", { required: true })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full "
                            />
                        </label>
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="form-control">
                            <div className="label text-lg font-semibold">
                                <span className="label-text">
                                    Recipe Details<span className="text-red">*</span>
                                </span>
                            </div>
                            <textarea
                                {...register("recipe", { required: true })}
                                className="textarea textarea-bordered h-24"
                                placeholder="Tell the world about your recipe"
                            ></textarea>
                        </label>
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="form-control w-full max-w-xs">
                            <div className="label text-lg font-semibold">
                                <span className="label-text">Pick a file</span>
                            </div>
                            <input
                                {...register("image")}
                                type="file"
                                className="file-input file-input-bordered w-full "
                            />
                        </label>
                    </div>
                    <button className="btn bg-green text-white px-8 my-8"> <ImSpoonKnife /> Add Items</button>
                </form>
            </div>
        </div>
    );
};

export default AddMenu;
