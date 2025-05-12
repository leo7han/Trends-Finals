Admin Dashboard Project
# Overview
This project is an admin dashboard built with React and Redux Toolkit, designed to manage and visualize business data such as sales, products, customers, and geographic insights, styled with Material-UI in a dark/light theme.
#Project Structure

client/: Frontend React application.
src/scenes/: Contains page components (dashboard, products, customers, etc.).
src/state/: Redux Toolkit state management files (index.js, api.js, geoData.js).
src/components/: Reusable components (Navbar, Sidebar, BreakdownChart, etc.).


server/: Backend Express API.
routes/: API routes (general.js, client.js, etc.).
controllers/: Route handlers for API endpoints.



# Setup Instructions

To set up the project locally, follow these steps:
Unzip the project file (if provided as a zip) or clone the repository from GitHub:


git clone https://github.com/[your-repo]/mern-admin-dashboard.git

Set up environment variables:
create a Mongodb cluster and link it to your .env file
In server/.env, configure the MongoDB connection and set port:
MONGO_URL=<ConnectionLink>
PORT=5001


In client/.env.local, configure any frontend-specific variables (e.g., API base URL).
REACT_APP_BASE_URL=http://localhost:5001/


Navigate to the server directory and install backend dependencies:


cd server
npm install


Navigate to the client directory and install frontend dependencies:
cd ../client
cd client
npm install

Start the MongoDB server locally or use a cloud service like MongoDB Atlas.
Run the backend server:
cd server
npm run dev

Run the frontend server:
cd client
npm run start

Access the application at http://localhost:3000.
In Server/Index.js uncomment the insert functions to fill up the database and uncomment it for all subsequent runs
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));


 
    /* ONLY ADD DATA ONE TIME */
    /*
    try{
      AffiliateStat.insertMany(dataAffiliateStat);
      console.log("Affiliates succeeded")
    } catch (err){
      console.error("Affiliates failed")
    }


    try{
      OverallStat.insertMany(dataOverallStat);
      console.log("Overall succeeded")
    } catch (err){
      console.error("Overall failed")
    }


    try{
      Product.insertMany(dataProduct);
      console.log("Product succeeded")
    } catch (err){
      console.error("Product failed")
    }


    try{
      ProductStat.insertMany(dataProductStat);
      console.log("ProductStat succeeded")
    } catch (err){
      console.error("ProductStat failed")
    }


    try{
      Transaction.insertMany(dataTransaction);
      console.log("Transaction succeeded")
    } catch (err){
      console.error("Transaction failed")
    }
    try{
      User.insertMany(dataUser);
      console.log("User succeeded")
    } catch (err){
      console.error("User failed")
    }
    */



Run the application:
Backend: cd server && npm start (runs on http://localhost:5001)
Frontend: cd client && npm start (runs on http://localhost:3000)



# State Management
State is managed using Redux Toolkit in client/src/state:

index.js: Defines global state (theme mode, user ID) with a setMode reducer to toggle between light and dark themes.
geoData.js: Provides geographic data for the Chloropleth map on the Geography page.
api.js: Uses Redux Toolkit Query to define API endpoints (getSales, getProducts, etc.), with hooks like useGetSalesQuery used in components for data fetching.

# API Endpoints
The backend API routes are defined in server/routes and called via api.js:

General Routes (general.js): /general/user/:id (user data), /general/dashboard (dashboard stats).
Client Routes (client.js): /client/products, /client/customers, /client/transactions, /client/geography.
Sales Routes (sales.js): /sales/sales (sales data for charts).
Management Routes (management.js): /management/admins, /management/performance/:id.

# Page Descriptions
Each page corresponds to a scene in client/src/scenes:

Dashboard: Displays a grid of stats, a line chart of sales over time, and a pie chart for sales breakdown, all styled in a dark theme with a Navbar and Sidebar.
Products: Shows a data grid of products with columns for name, price, and category, featuring a search bar in a dark theme.
Customers: Presents a data grid of customer details like name and email, with filtering options in a dark theme.
Transactions: Displays a paginated data grid of transactions with columns for ID and cost, including a search bar in a dark theme.
Geography: Features a Chloropleth map highlighting regions like Afghanistan with color gradients, styled in a dark theme.
Overview: Shows a large line chart of sales over time with toggle options for sales and units, styled in a dark theme.
Daily: Displays a line chart of daily sales trends with hover tooltips, presented in a dark theme.
Monthly: Features a line chart of monthly sales data with selectable years, styled in a dark theme.
Breakdown: Shows a pie chart of sales by category with color-coded segments and a total sales label, styled in a dark theme.
Admin: Displays a data grid listing admin details with a search bar, styled in a dark theme.
Performance: Features a line chart and table showing user performance metrics like affiliate sales, styled in a dark theme.
Settings: Displays a form with sections for Data Refresh, Dashboard Configuration, Export Settings, Notifications, and Analytics, styled in a dark theme.

# Technologies Used

Frontend: React, Redux Toolkit, Material-UI, Nivo (for charts).
Backend: Express, MongoDB.
Libraries: @reduxjs/toolkit, @mui/x-data-grid, @nivo/geo.

# Notes

The trends.js file is referenced but missing; it may handle trend-related state.
Ensure MongoDB is running for the backend API to function properly.

