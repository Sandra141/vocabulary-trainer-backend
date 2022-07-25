import express from "express";
import { security_get } from '../controllers/securityController.js'

const router = express.Router();

router
    .route("*")
    .get(security_get)


export default router;