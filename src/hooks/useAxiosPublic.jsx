import React from 'react'
import axios from 'axios'

const axiosPublic=axios.create({
    baseURL: 'https://food-app-server-desi.onrender.com',
  });

  
const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic
