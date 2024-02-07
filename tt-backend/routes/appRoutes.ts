import express from "express";
import { courses_get, add_course_post } from "../controllers/appController";

const router = express.Router();

router.get("/courses", courses_get);
router.post("/add_course", add_course_post);

export default router;