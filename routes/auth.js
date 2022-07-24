import express from "express";
import { login_get, login_post, register_post } from '../controllers/authController.js'

const router = express.Router();

router
    .route("/login")
    .get(login_get)
    .post(login_post)

router
    .route("/register")
    .post(register_post)

export default router;