import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";

const DishDetail = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://food-app-server-desi.onrender.com/menu/${id}`)
      .then((res) => res.json())
      .then((data) => setDish(data));
  }, [id]);

  const handleAddToCart = () => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: dish._id,
        name: dish.name,
        quantity: 1,
        image: dish.image,
        price: dish.price,
        email: user.email,
      };
      fetch("https://food-app-server-desi.onrender.com/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message &&
            data.message === "Product already exists in cart!"
          ) {
            Swal.fire({
              icon: "warning",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (data.menuItemId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item Added to Cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
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
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  if (!dish) return <div>Loading...</div>;

  return (
    <div className="section-container">
      <div className="py-40 flex flex-col  justify-center items-start gap-8">
        <div className=" text-center px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
            {dish.name}
            {/* <span className="text-green"> Food</span>{" "} */}
          </h2>
        </div>
        <div className="flex flex-col gap-4 sm:gap-10 md:flex-row">
          <div>
            <img
              src={dish.image}
              alt={dish.name}
              className="hover:scale-105 transition-all duration-200 md:h-72"
            />
            <div className="flex flex-row justify-between items-center mt-2 gap-4 sm:gap-10">
              <h5 className="font-semibold">
                <span>Price:</span>
                <span className="text-sm text-red"> $</span>
                {dish.price}
              </h5>
              <button
                className="btn bg-green text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>

          <p className="text-sm md:text-lg sm:text-base text-[#4A4A4A] md:w-4/5 mx-auto">
            {dish.recipe}
          </p>
        </div>

        {/* <h2>${dish.price}</h2>
        <button onClick={handleAddToCart}>Add to Cart</button> */}
      </div>
    </div>
  );
};

export default DishDetail;
