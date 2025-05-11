// customerscreate.jsx or customerscreate.js
import React from 'react';
import { Box } from '@mui/material';
import AddCustomerForm from 'components/AddCustomerForm';  // Assuming this is correct path

const CustomersCreate = () => {
  return (
    <Box>
      {/* Rendering AddCustomerForm */}
      <AddCustomerForm />
    </Box>
  );
};

export default CustomersCreate;
