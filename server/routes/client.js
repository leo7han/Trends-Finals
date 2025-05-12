import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  createUser,
  getCustomer,
  updateCustomer,
  deleteCustomer
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);


router.get("/customers", getCustomers);
router.post("/customers", createUser);

router.get("/customers/update/:id", getCustomer);
router.patch("/customers/update/:id", updateCustomer); 

router.delete('/customers/:id', deleteCustomer);



router.get("/transactions", getTransactions);
router.get("/geography", getGeography);


export default router;
