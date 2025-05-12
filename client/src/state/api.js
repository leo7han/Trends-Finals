import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// REACT_APP_BASE_URL is the URL the API is requesting from
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), // Make sure this is correctly set
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    /* 
    functionName: build.GET({
    query: change url to trigger server/routes then server/controller
    provideTages: name for filtering
    }) 

    rule of thumb the first / is the router's name, the second / is the function's name
    */

    // Get a user by ID
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    // Get all products
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),

    // Get all customers
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),

    // Get a specific customer by ID
    getCustomer: build.query({
  query: (id) => `customers/update/${id}`,  // Align the URL with your backend route
  providesTags: ["Customers"],
}),

    // Get transactions with pagination and sorting
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    // Get geography data
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),

    // Get sales data
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),

    // Get all admins
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),

    // Get performance data for a specific user by ID
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),

    // Get dashboard data
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),

    // Add a new customer
    addCustomer: build.mutation({
      query: (customer) => ({
        url: "/client/customers/create", // Make sure the route is correct here
        method: "POST",
        body: customer, // The customer object to be added
      }),
      // Invalidates "Customers" tag to refetch customer data
      invalidatesTags: ["Customers"],
    }),

    // Update an existing customer by ID
    updateCustomer: build.mutation({
  query: (customer) => ({
    url: `client/customers/update/${customer._id}`, // Endpoint to update customer with their _id
    method: "PATCH", // Use PATCH to update the customer
    body: customer, // Send the updated customer data in the request body
  }),
  // Optional: you can add invalidation logic to refetch the customer data after update
  invalidatesTags: ["Customers"],
}),
    deleteCustomer: build.mutation({
        query: (customerId) => ({
        url: `client/customers/${customerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Customers"],
    })
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetCustomerQuery, // Use this hook to fetch a specific customer by ID
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation, // Use this hook to update a specific customer
  useDeleteCustomerMutation
} = api;
