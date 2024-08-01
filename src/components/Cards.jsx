import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
const Cards = ({ item }) => {

  const navigate=useNavigate();
  const location=useLocation();

  const { name, image, price, recipe, _id } = item;
  const [heart, setHeart] = useState(false);
  const { user } = useContext(AuthContext);
  const handlehearClick = () => {
    setHeart(!heart);
  };
  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      // console.log(cartItem)
      fetch("https://food-app-server-desi.onrender.com/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("logging",data);
          if (data.message && data.message === "Product already exists in cart!") {
            Swal.fire({
              icon: "warning",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } 
         else if (data.menuItemId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item Added to Cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          // console.log(data);
        });
    } else {
      Swal.fire({
        title: "Please Login!",
        text: "Without an account you can't add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup',{state:{from:location}})
        }
      });
    }
    console.log(item);
  };
  return (
    <div className="card bg-base-100v shadow-lg m-4">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          heart ? "text-rose-500" : "text-white"
        }`}
        onClick={handlehearClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}></Link>
      <figure className="mt-5">
        <img
          src={item.image}
          alt=""
          className="hover:scale-105 transition-all duration-200 md:h-72"
        />
      </figure>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p dangerouslySetInnerHTML={{__html:recipe?.substr(0,70) + "..."}}></p>

        {/* <p className='desc' dangerouslySetInnerHTML={{__html:description?.substr(0,70) + "..."}}></p> */}
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
