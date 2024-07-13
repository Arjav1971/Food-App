import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const {user}=useAuth();
    const token=localStorage.getItem('access-token')
    const axiosSecure=useAxiosSecure();

    console.log("token",token);
    const {refetch,data:cart=[]}=useQuery({
        queryKey:['carts',user?.email],
        queryFn:async()=>{
            const response=await axiosSecure.get(`/carts?email=${user?.email}`)
            console.log("res",response)
            return response.data
        }
    })
  return [cart,refetch]
}

export default useCart
