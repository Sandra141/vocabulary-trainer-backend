import express from "express";
import { download_get } from '../controllers/downloadController.js'

const router = express.Router();

router
    .route("/")
    .get(download_get)

export default router;