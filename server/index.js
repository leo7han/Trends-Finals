import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

//when npm run is called this is where it starts

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

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
