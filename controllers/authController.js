import express from "express";
import jwt from "jsonwebtoken";
import User from '../models/user.js'

const TOKEN_EXPIRES_IN = "1h"

const getLogin = (req, res) => {
    console.log("getLogin")


}

// Check 
const postLogin = async (req, res) => {
    console.log("----------", "postLogin")

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        // EXIT: User is not found
        if (user === null) {
            return res.status(400).send({
                success: false,
                message: "login failed. Check your credentials. Did you want to signup?",
            });
        }

        // EXIT: Password is wrong
        if (!await user.validatePassword(password)) {
            return res.status(400).send({
                success: false,
                message:
                    "login failed. Check your credentials. Did you want to signup?",
            });
        }

        // Generate token
        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
                isLoggedIn: true,
            },
            process.env.SECRET,
            { expiresIn: TOKEN_EXPIRES_IN }
        );

        // EXIT: Success
        return res.status(201).json({
            success: true,
            message: "login successful",
            data: { token },
        });
    } catch (e) {
        console.log("@@@", "Error", e)

        // EXIT: Error
        return res.status(500).send({
            success: false,
            message: "login failed. Please try again later.",
        });
    }
}

const postRegister = (req, res) => {
    console.log("postRegister")


}

//////////
export {
    getLogin,
    postLogin,
    postRegister,
}