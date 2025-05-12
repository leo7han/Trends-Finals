import React, { useState, useMemo, useEffect } from "react";
import { Box, useTheme, Button, TextField } from "@mui/material";
import { useGetCustomersQuery, useDeleteCustomerMutation } from "state/api"; // Assuming useDeleteCustomerMutation is defined in your API hooks
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


const Customers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetCustomersQuery();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [searchTerm, setSearchTerm] = useState("");
 
  useEffect(() => {
  refetch(); 
}, [refetch]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  // Filter rows based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data || [];
    return (data || []).filter((customer) => {
      // Search across multiple fields
      return (
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phoneNumber.includes(searchTerm) ||
        customer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm]);

  // Column definitions
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => {
        const customerId = params.row._id; // Assuming your data has '_id' as the identifier
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(customerId)}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      flex: 0.5,
      renderCell: (params) => {
        const customerId = params.row._id; // Assuming your data has '_id' as the identifier
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleUpdate(customerId)}
          >
            Update
          </Button>
        );
      },
    },
  ];
const handleUpdate = async (customerId) => {
  navigate(`update/${customerId}`);
};

const handleDelete = async (customerId) => {
  if (!customerId) return;

  try {
    const response = await deleteCustomer(customerId).unwrap();  // Wait for the API call
    console.log("Customer deleted:", response);                 // Now it's safe to log
    refetch();  
    alert('Customer deleted successfully!');
  } catch (error) {
    console.error("Error deleting customer:", error);
    alert('Failed to delete customer. Please try again later.');
  }
};


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />

      {/* Search Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
        <TextField
          label="Search Customers"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end" ml="1rem">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/customers/create")}
          >
            Add New Customer
          </Button>
        </Box>
      </Box>

      {/* DataGrid */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.secondary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={filteredData}  // Use filtered data
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
