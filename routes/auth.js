import express from "express";
import { getLogin, postLogin, postRegister } from '../controllers/authController.js'

const router = express.Router();

router
    .route("/login")
    .get(getLogin)
    .post(postLogin)

router
    .route("/register")
    .post(postRegister)

export default router;