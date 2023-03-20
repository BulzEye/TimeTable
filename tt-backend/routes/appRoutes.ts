import express from "express";
import { course_get } from "../controllers/appController";

const router = express.Router();

router.get("/getCourse", course_get);

export default router;