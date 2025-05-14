import express from "express";
import {
    getLogin
} from "../controllers/login.js";

const router = express.Router();

router.post("/", getLogin);

export default router