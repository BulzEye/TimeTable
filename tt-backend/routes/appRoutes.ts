import express from "express";
import { courses_get, add_course_post, delete_course, update_course_patch, add_slot_post, delete_slot, update_slot_patch, course_slots_get } from "../controllers/appController";

const router = express.Router();

router.get("/courses", courses_get);
router.post("/add-course", add_course_post);
router.delete("/delete-course/:code", delete_course);
router.patch("/update-course/:code", update_course_patch);
router.get("/slots", course_slots_get);
router.post("/add-slot", add_slot_post);
router.delete("/delete-slot/:id", delete_slot);
router.patch("/update-slot/:id", update_slot_patch);

export default router;