import express from "express";
import jwt from "jsonwebtoken";
import User from '../models/user.js'
import { generateAccessToken } from '../jwt/jwt.js'

const security_get = (req, res, next) => {
    console.log("----------------BOINNNNNNNNNNNG")

    try {
        const authorization = req.headers.authorization

        // EXIT: Authorization is missing
        if (!authorization) {
            return res.status(200).json({
                success: false,
                message: "Error! Authorization was not provided."
            });
        }

        const token = authorization.split(" ")[1];

        // EXIT: Token is missing
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Error! Token was not provided."
            });
        }

        // SUCCESS: Next routes have access
        next()
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

//////////
export {
    security_get,
}