import React from "react";
import useAuth from "../../../hooks/useAuth";
import { IoIosNotifications } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { FiBox } from "react-icons/fi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { TbBasketCancel } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const { user } = useAuth();
  console.log("log", user);

  // Data for the Doughnut chart
  const doughnutData = {
    labels: ["Soup", "Salad", "Pizza", "Desserts", "Drinks"],
    datasets: [
      {
        label: "Food Types",
        data: [15, 25, 35, 15, 10],
        backgroundColor: [
          "#C3F4F0",
          "#FFF5D9",
          "#D9F8FF",
          "#FFD9D9",
          "#EAEFFF",
        ],
        hoverBackgroundColor: [
          "#19ACA0",
          "#E4B83C",
          "#28A1BB",
          "#F76565",
          "#2D60FF",
        ],
      },
    ],
  };

  // Data for the Bar chart
  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Performance",
        data: [65, 59, 80, 81, 56, 55, 40, 42, 50, 60, 75, 80],
        backgroundColor: "#EAEFFF", // Light Green
        borderColor: "#2D60FF", // Green
        borderWidth: 1,
      },
    ],
  };

  // Data for the Line chart
  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales Trends",
        data: [65, 59, 80, 81, 56, 55, 40, 42, 50, 60, 75, 80],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Green
        tension: 0.1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines
        },
      },
      x: {
        grid: {
          display: false, // Remove grid lines
        },
      },
    },
  };

  return (
    <div className="max-w-screen-2xl container max-auto px-1">
      <div className="flex justify-between">
        <h2 className="font-semibold my-4">
          <div className="text-green text-4xl">Dashboard</div>
          <p className="text-sm opacity-50">Welcome back {user?.displayName}</p>
        </h2>
        <div className="ml-auto items-center gap-5 hidden md:flex">
          <div className="w-10 text-3xl opacity-50 hover:opacity-100 transition-opacity duration-200">
            <IoIosMail />
          </div>
          <div className="w-10 text-3xl opacity-50 hover:opacity-100 transition-opacity duration-200">
            <IoIosNotifications />
          </div>
          <div className="w-10 rounded-full overflow-hidden hover:scale-110 transition-transform duration-200">
            {user.photoURL ? (
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoURL}
                className="rounded-full"
              />
            ) : (
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                className="rounded-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10 md:flex-row md:justify-around">
          <div className="shadow-2xl flex gap-2 px-4 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-center py-5 px-2">
              <div className="rounded-full bg-[#C3F4F0] p-4 text-2xl text-[#19ACA0]">
                <FiBox />
              </div>
            </div>
            <div className="px-4 pt-7">
              <div className="text-lg text-right opacity-60">Total Orders</div>
              <div className="text-2xl font-bold">1750</div>
              <div className="flex mb-0">
                <div className="ml-auto text-[#1EB564] flex items-center mt-4">
                  <FaArrowUp />
                  <span>8.56%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-2xl flex gap-2 px-4 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-center py-5 px-2">
              <div className="rounded-full bg-[#FFF5D9] p-4 text-2xl text-[#E4B83C]">
                <FaBoxOpen />
              </div>
            </div>
            <div className="px-4 pt-7 pb-5">
              <div className="text-lg text-right opacity-60">
                Total Delivered
              </div>
              <div className="text-2xl font-bold">567</div>
              <div className="flex mb-0">
                <div className="ml-auto text-[#1EB564] flex items-center mt-4">
                  <FaArrowUp />
                  <span>9.67%</span>
                </div>
              </div>
            </div>
          </div>
        

        <div className="shadow-2xl flex gap-3 px-4 rounded-xl hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-center py-5 px-2">
            <div className="rounded-full bg-[#D9F8FF] p-4 text-2xl text-[#28A1BB]">
              <BsCurrencyDollar />
            </div>
          </div>
          <div className="px-5 pt-7 pb-5">
            <div className="text-lg text-right opacity-60">Total Revenue</div>
            <div className="text-2xl font-bold flex items-center">
              <BsCurrencyDollar />
              1,29,750
            </div>
            <div className="flex mb-0">
              <div className="ml-auto text-red flex items-center mt-4">
                <FaArrowDown />
                <span>9.56%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-2xl flex gap-2 px-4 rounded-xl hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-center py-5 px-2">
            <div className="rounded-full bg-[#FFD9D9] p-4 text-2xl text-[#F76565]">
              <TbBasketCancel />
            </div>
          </div>
          <div className="px-4 pt-7 pb-5">
            <div className="text-lg text-right opacity-60">Total Canceled</div>
            <div className="text-2xl font-bold">125</div>
            <div className="flex mb-0">
              <div className="ml-auto text-[#1EB564] flex items-center mt-4">
                <FaArrowUp />
                <span>12.3%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="shadow-2xl  gap-3 px-5 rounded-xl hover:shadow-lg transition-shadow duration-200 hidden 2xl:flex">
          <div className="flex items-center justify-center py-5 px-2">
            <div className="rounded-full bg-[#EAEFFF] p-4 text-2xl text-[#2D60FF]">
              <MdOutlinePendingActions />
            </div>
          </div>
          <div className="px-4 pt-7 pb-5">
            <div className="text-lg text-right opacity-60">Total Pending</div>
            <div className="text-2xl font-bold">125</div>
            <div className="flex mb-0">
              <div className="ml-auto text-[#1EB564] flex items-center mt-4 ">
                <FaArrowUp />
                <span>12.3%</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="mt-10 shadow-2xl  p-4 rounded-xl hover:shadow-lg transition-shadow duration-200 md:w-1/2">
          <h3 className="text-2xl font-semibold ">Food Type Distribution</h3>
          <div className="w-full h-full flex justify-center items-center">
            <Doughnut data={doughnutData} width={200} height={200} />
          </div>
        </div>
        <div className="mt-10 shadow-2xl  p-5 rounded-xl hover:shadow-lg transition-shadow duration-200 md:w-1/2">
          <h3 className="text-2xl font-semibold ">Sales Trends</h3>
          <div className="w-full mx-auto">
            <Line
              data={lineData}
              options={barOptions}
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 shadow-2xl w-full p-5 rounded-xl hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-2xl font-semibold mb-10">Monthly Performance</h3>
        <div className="w-full mx-auto">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
