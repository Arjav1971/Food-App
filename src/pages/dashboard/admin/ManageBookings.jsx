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
import { useQuery } from "@tanstack/react-query";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const ManageBookings = () => {
  // const [menu, loading, refetch] = useMenu();
  // console.log("menu", menu);
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosSecure.get("/payments/orders");
      return response.data;
    },
  });
  console.log(orders)
  const handleEdit = (item) => {
    // Add your logic to make the user an admin here
    Swal.fire({
      title: "Is this order completed?",
      // text: "Is!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, completed!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/payments/status/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Completed!",
            text: "Order has been completed.",
            icon: "success",
          });
        }
      }
    });

  };
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
        const res = await axiosSecure.delete(`/payments/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Order has been deleted.",
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



  return (
    <div className="w-full px-4">
      <h2 className="text-3xl font-semibold my-4">
        Manage All <span className="text-green">Bookings</span>
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
              <StyledTableCell align="center">User</StyledTableCell>
              <StyledTableCell align="center">Transaction Id</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>

              <StyledTableCell align="center">Delete</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                    {item.email}
                </StyledTableCell>
                <StyledTableCell align="center">{item.transactionId}</StyledTableCell>
                <StyledTableCell align="center">$ {item.price}</StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>


                <StyledTableCell align="center">
                  {/* <Link to={`/dashboard/update-menu/${item._id}`}>
                    <button className="btn btn-ghost btn-sm bg-orange-500 text-white">
                      <FaEdit />
                    </button>
                  </Link> */}
                  {item.status === "Completed" ? (
                    <button
                    className="btn btn-sm bg-orange-500 text-lg text-white"

                    >
                      <CheckCircleOutlineIcon/>
                    </button>
                  ) :(
                    <button
                    className="btn btn-sm  bg-indigo-500 text-lg  text-white"
                    onClick={() => handleEdit(item)}

                  >
                    <FaEdit />
                  </button>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost text-lg text-red"
                  >
                    <MdDelete />
                  </button>
                </StyledTableCell>
       
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageBookings;