import express from "express";
import { courses_get, add_course_post, delete_course, update_course_patch } from "../controllers/appController";

const router = express.Router();

router.get("/courses", courses_get);
router.post("/add-course", add_course_post);
router.delete("/delete-course/:code", delete_course);
router.patch("/update-course/:code", update_course_patch);

export default router;