import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage,setcurrentPage]=useState(1);
  const [itemsPerPage]=useState(9);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://food-app-server-desi.onrender.com/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setcurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setcurrentPage(1)
  };
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
      // Handle any other cases if needed
    }

    setFilteredItems(sortedItems);
    setcurrentPage(1);
  };
  const indexOfLastItem=currentPage*itemsPerPage;
  const indexOfFirstItem=indexOfLastItem-itemsPerPage;
  console.log(indexOfFirstItem);
  console.log(indexOfLastItem);
  const currentItems=filteredItems.slice(indexOfFirstItem,indexOfLastItem);
  const paginate=(pageNumber)=>setcurrentPage(pageNumber);
  return (
    <div>
      <div className="section-container bg-white">
        <div className="py-40 flex flex-col  justify-center items-center gap-8">
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious
              <span className="text-green"> Food</span>{" "}
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lassagne, Butternut Pumpkin, Tokusen Wagyu, Olvas
              Rellenas and more for a moderate cost.
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={showAll} className={selectedCategory === "all" ? "active" :"font-bold text-xl"}>All</button>
            <button onClick={()=>filterItems("salad")} className={selectedCategory === "salad" ? "active" :"font-bold text-xl"}>Salad</button>
            <button onClick={()=>filterItems("pizza")} className={selectedCategory === "pizza" ? "active" :"font-bold text-xl"}>Pizza</button>
            <button onClick={()=>filterItems("soup")} className={selectedCategory === "soup" ? "active" :"font-bold text-xl"}>Soups</button>
            <button onClick={()=>filterItems("dessert")} className={selectedCategory === "dessert" ? "active" :"font-bold text-xl"}>Desserts</button>
            <button onClick={()=>filterItems("drinks")} className={selectedCategory === "drinks" ? "active" :"font-bold text-xl"}>Drinks</button>
          </div>
          <div className="flex justify-end items-center mb-4 rounded-lg border-2 border-green font-semibold">
            <div className="p-2">
              <FaFilter className="h-4 w-4 text-green"/>
            </div> 
            <select name="sort" id="sort" onChange={(e)=>handleSortChange(e.target.value)} value={sortOption} className="text-green px-3 py-2 rounded-lg border-0">
              <option value="default" className="py-2 border-0">Default</option>
              <option value="A-Z" className="py-2 border-0">A-Z</option>
              <option value="Z-A" className="py-2 border-0">Z-A</option>
              <option value="low-to-high" className="py-2 border-0">Low to High</option>
              <option value="high-to-low" className="py-2 border-0">High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {
            currentItems?.map((item,index)=>{
              return (
                <Cards key={item._id} item={item}/>

              )
            })
          }
        </div>
        <div className="flex justify-center my-8">
          {
            Array.from({length:Math.ceil(filteredItems.length/itemsPerPage)}).map((_,index)=>(
              <button key={index+1} onClick={()=>paginate(index+1)} className={`mx-1 px-4 py-2 rounded-full ${currentPage===index+1 ? "bg-green text-white":" bg-[#EDFFEF]"}`}>
                {index+1}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Menu;
