import express from "express";
import { postRouteEntry } from "../controllers/postControllers/basicControllers.js";
const postRoutes = express.Router();

postRoutes.get("/", postRouteEntry);

export default postRoutes;