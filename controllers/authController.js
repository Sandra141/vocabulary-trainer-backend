import express from "express";
import jwt from "jsonwebtoken";
import User from '../models/user.js'

const TOKEN_EXPIRES_IN = "1h"

////////////////////////////////////////
////////// login
////////////////////////////////////////
// handle login with jwt
const getLogin = (req, res) => {
    console.log("getLogin")

    try {
        const token = req.headers.authorization.split(" ")[1];

        // EXIT: Token missing
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Token was not provided."
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);

        // EXIT: Success
        return res.status(200).json({
            success: true,
            data: decodedToken
        });
    }
    catch (err) {
        console.log("Error", err)

        // EXIT: Error
        return res.status(500).send({
            success: false,
            message: "login failed. Please try again later.",
        });
    }
}

// handle login with email & password
const postLogin = async (req, res) => {
    console.log("postLogin")

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
    }
    catch (err) {
        console.log("Error", err)

        // EXIT: Error
        return res.status(500).send({
            success: false,
            message: "login failed. Please try again later.",
        });
    }
}

////////////////////////////////////////
////////// register
////////////////////////////////////////
// handle registering with email & password
const postRegister = async (req, res) => {
    console.log("postRegister")

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        // EXIT: User exist
        if (user === null) {
            return res.status(400).send({
                success: false,
                message: "registration failed. Maybe you already have an account?",
            });
        }

        // Create new user
        const newUser = await User.create({ email, password });

        // Generate token
        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email,
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
    }
    catch (err) {
        console.log("Error", err)

        // EXIT: Error
        return res.status(500).send({
            success: false,
            message: "registration failed. Please try again later.",
        });
    }
}

//////////
export {
    getLogin,
    postLogin,
    postRegister,
}