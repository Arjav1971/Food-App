import React from "react";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });
  console.log(users);

  const handleMakeAdmin = (user) => {
    // Add your logic to make the user an admin here
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };
  const handleDeleteUser = (user) => {
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
        const res = axiosSecure.delete(`/users/${user._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${user.name} is now removed from database`,
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

  function createData(no, name, email, role, action) {
    return { no, name, email, role, action };
  }

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>
      </div>
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
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={user.email}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      className="btn btn-sm btn-circle bg-indigo-500 text-lg p-2 text-white"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUser />
                    </button>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    className="btn btn-sm bg-orange-500 text-lg text-white"
                    onClick={() => handleDeleteUser(user)}
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

export default Users;
