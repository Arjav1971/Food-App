import React,{useState} from "react";
import {Link} from "react-router-dom"
import { FaHeart } from "react-icons/fa";
const Cards = ({ item }) => {
    const [heart,setHeart]=useState(false);
    const handlehearClick=()=>{
        setHeart(!heart)
    }
  return (

      <div className="card  bg-base-100v shadow-lg m-4">
        <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${heart ? "text-rose-500" : "text-white"}`} onClick={handlehearClick}>
            <FaHeart className="h-5 w-5 cursor-pointer"/>
        </div>
        <Link to={`/menu/${item._id}`}>
        </Link>
        <figure>
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
          <p>Description of the item</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold"><span className="text-sm text-red">$</span>{item.price}</h5>
            <button className="btn bg-green text-white">Buy Now</button>
          </div>
        </div>
      </div>
    
  );
};

export default Cards;
