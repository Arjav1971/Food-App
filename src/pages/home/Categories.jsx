import React from "react";

const Categories = () => {
  const categoryList = [
    { id: 1, title: "Main Meal", des: "(86 idshes)", image: "/img1.png" },
    { id: 2, title: "Breakfast", des: "(12 break fast)", image: "/img2.png" },
    { id: 3, title: "Dessert", des: "(48 dessert)", image: "/img3.png" },
    { id: 4, title: "Browse All", des: "(255 Items)", image: "/img4.png" },
  ];
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favourites</p>
        <h2 className="title">Popular Catagories</h2>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-8 items-center justify-around mt-12 ">
        {categoryList.map((item, index) => {
          return (
            <div key={index} className="shadow-lg bg-white py-8 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all rounded-2xl">
              <div className="flex w-full mx-auto items-center justify-center">
                <img src={item.image} alt="category" className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"/>
              </div>
              <div className="mt-5 space-y-1">
                <h5 className="font-bold">{item.title}</h5>
                <p>{item.des}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
