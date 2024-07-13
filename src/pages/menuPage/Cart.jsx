import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
const Cart = () => {
  const user = useContext(AuthContext);
  console.log(user);
  const [cart, refetch] = useCart();

  const [cartItems, setCartItems] = useState([]);

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const cartSubTotal = cart.reduce(function (total, item) {
    return total + calculatePrice(item);
  }, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-app-server-desi.onrender.com/carts/${item?._id}`, {
          method: "DELETE",
        }).then((res) =>
          res.json().then((data) => {
            if (
              data.message &&
              data.message === "Cart Item Deleted Successfully!"
            ) {
              refetch();
              Swal.fire({
                title: "Deleted",
                text: "Your file has been delted.",
                icons: "success",
              });
            }
          })
        );
      }
    });
  };
  //   console.log("logging",cartItems)
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`https://food-app-server-desi.onrender.com/carts/${item?._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          setCartItems(updatedCart);
          // console.log("logging",data)
        });
      refetch();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quantity cannot be zero !",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };
  const handleIncrease = (item) => {
    fetch(`https://food-app-server-desi.onrender.com/carts/${item?._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
        // console.log("logging",data)
      });
    refetch();
  };
  return (
    <div className="section-container">
      {cart.length ? (
        <div>
          <div className="py-40 flex flex-col  justify-center items-center gap-5">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Items Added to The <span className="text-green">Cart</span>
              </h2>
            </div>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-md text-sm">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item?.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">
                        {item?.name}
                        <br />
                      </td>
                      <td className="font-medium gap-2">
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          onChange={(e) => console.log(e.target)}
                          value={item?.quantity}
                          className="w-10 text-center mx-1 "
                        />
                        <button
                          className="btn btn-sm"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td className="font-medium">
                        $ {calculatePrice(item).toFixed(2)}
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleDelete(item)}
                        >
                          <MdDelete className="text-red text-xl" />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium text-xl">Customer Details</h3>
              <p>
                {" "}
                <span className="font-bold">Name: </span>{" "}
                {user?.user?.displayName}
              </p>
              <p>
                {" "}
                <span className="font-bold">Email: </span>
                {user?.user?.email}
              </p>

              <p>
                {" "}
                <span className="font-bold">UserID: </span>
                {user?.user?.uid}
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium text-xl">Order Details</h3>
              <p>
                {" "}
                <span className="font-bold">Total Items: </span> {cart?.length}
              </p>
              <p>
                {" "}
                <span className="font-bold">Total Price: </span> ${" "}
                {cartSubTotal.toFixed(2)}
              </p>
              <Link to="/process-checkout">
                <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full mt-10">
                  Proceed Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="py-40 flex flex-col  justify-center items-center gap-5">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Your cart is Empty
              </h2>
              <Link
                to="/menu"
                className="btn bg-green px-8 py-3 font-semibold text-white rounded-full"
              >
                Back to Menu
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
