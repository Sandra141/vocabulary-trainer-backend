import express from "express";
import { getLogin as login_get, postLogin as login_post, postRegister as register_post } from '../controllers/authController.js'

const router = express.Router();

router
    .route("/login")
    .get(login_get)
    .post(login_post)

router
    .route("/register")
    .post(register_post)

export default router;