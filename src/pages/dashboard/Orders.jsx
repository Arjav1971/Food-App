import React from "react";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { Link } from "react-router-dom";
const Orders = () => {
    const {user}=useAuth();
    const token=localStorage.getItem('access-token')
    const axiosSecure=useAxiosSecure();

    console.log("token",token);
    const {refetch,data:orders=[]}=useQuery({
        queryKey:['orders',user?.email],
        queryFn:async()=>{
            const response=await axiosSecure.get(`/payments?email=${user?.email}`)
            console.log("res",response)
            return response.data
        }
    })
    console.log(orders)

    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        return createdAtDate.toLocaleDateString();
    }
    
  return (
    <div className="section-container">
      <div>
        <div className="py-40 flex flex-col  justify-center items-center gap-5">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your <span className="text-green">Orders</span>
            </h2>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
         
              <thead className="bg-green text-white rounded-md text-sm">
                <tr>
                  <th>#</th>
                  <th>Order Date</th>
                  <th>Transaction ID</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td className="font-medium">
                        {formatDate(item.createdAt)}
                    </td>
                    <td className="font-medium">
                      {item?.transactionId}
                      <br />
                    </td>
                    <td className="font-medium">
                      $ {item.price.toFixed(2)}
                    </td>
                    <td className="font-medium">
                        {item.status}
                    </td>
                    <td>
                      <Link to="/contact"
                        className="btn btn-sm border-none text-white bg-orange-500"
                        // onClick={() => handleDelete(item)}
                      >
                        Contact
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="my-12 flex flex-col md:flex-row justify-between items-start">
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
        </div> */}
      </div>
    </div>
  );
};

export default Orders;
