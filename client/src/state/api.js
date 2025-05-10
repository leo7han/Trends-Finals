import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//REACT_APP_BASE_URL is the url api is requesting from
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
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

    //changes url to url/general/user/id, routes controller, then calls server/controller/general
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    //changes url to url/clients/products for server router then controller to end up at server/controller/clients
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    //changes url to url/client/geography, routes controller, then calls server/controller/client.js
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),

    //changes url to url/sales/sales, routes controller, then calls server/controller/sales.js
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),

    //changes url to url/management/admins, routes controller, then calls server/controller/management.js
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),

    //changes url to url/management/performance/id, routes controller, then calls server/controller/management
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),

    //changes url to url/general/dashbord, routes controller, then calls server/controler/general.js
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
