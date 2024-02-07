import express from "express";
import { courses_get, add_course_post, delete_course } from "../controllers/appController";

const router = express.Router();

router.get("/courses", courses_get);
router.post("/add-course", add_course_post);
router.delete("/delete-course/:code", delete_course);

export default router;