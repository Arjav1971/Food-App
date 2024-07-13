import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  console.log("menu", menu);
  const axiosSecure = useAxiosSecure();
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#39DB4A",
      color: theme.palette.common.white,
      fontWeight: "bold",
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(no, image, name, price, edit, remove) {
    return { no, image, name, price, edit, remove };
  }

  return (
    <div className="w-full px-4">
      <h2 className="text-3xl font-semibold my-4">
        Manage All <span className="text-green">Menu Items</span>
      </h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            sx={{
              backgroundColor: "green",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Item Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu?.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  <div className="avatar">
                    <div className=" mask mask-squircle w-12 h-12">
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">$ {item.price}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/dashboard/update-menu/${item._id}`}>
                    <button className="btn btn-ghost btn-sm bg-orange-500 text-white">
                      <FaEdit />
                    </button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost text-lg text-red"
                  >
                    <MdDelete />
                  </button>
                </StyledTableCell>
                {/* 1:53 */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageItems;
// import React from "react";

// const ManageItems = () => {
//   const [menu, loading, refetch] = useMenu();
//   console.log("menu", menu);
//   return (
//     <div className="w-full px-4">
//       <h2 className="text-3xl font-semibold my-4">
//         Manage All <span className="text-green">Menu Items</span>
//       </h2>
//     </div>
//   );
// };
