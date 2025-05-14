import User from "../models/User.js";
import mongoose from "mongoose";

export const getLogin = async (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password===password){
                res.json("Success");
            } else {
                res.json("Failure");
            }
        } else {
            res.json("User not found");
        }
    })
};
