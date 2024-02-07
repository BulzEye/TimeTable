import { Request, Response } from "express";
import { Pool } from "pg";
import { CourseListItem } from "../models/tableItemTypes";

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: 'tt_database',
    password: process.env.POSTGRES_PASS,
    port: 5432
})

export const courses_get = (req: Request, res: Response) => {
    console.log(typeof process.env.POSTGRES_PASS);
    pool.query("SELECT * FROM course_list", (error, results) => {
        if(error) {
            console.error("Error getting list of courses:", error);
            res.status(500).json({
                error: "Error getting list of courses."
            });
        }
        else {
            console.log(results);
            res.json({
                courses: results.rows
            })
        }
    })
    // res.send("Request for course information received");
}

export const add_course_post = (req: Request, res: Response) => {
    console.log("Received request for adding new course");
    const newCourse: CourseListItem = req.body;
    console.log(newCourse);
    pool.query(
        "INSERT INTO course_list VALUES ($1, $2, $3, $4, $5, $6, $7)", 
        [
            newCourse.course_code, 
            newCourse.course_name, 
            newCourse.course_instructors, 
            newCourse.course_coordinator, 
            newCourse.current_instructor, 
            newCourse.course_credits, 
            newCourse.default_location
        ], 
        (error, results) => {
            if(error) {
                if(error.message.includes("duplicate key value violates unique constraint")) {
                    console.error("ERROR: Course already exists.\nCallstack: ", error);
                    res.status(500).json({
                        error: "Course already exists"
                    });
                }
                else {
                    console.error("Error adding new course:", error);
                    res.status(500).json({
                        error: "Error adding new course"
                    });
                }
            }
            else {
                console.log(results);
                res.json({
                    success: "Course successfully added"
                });
            }
        }
    )
}

export const delete_course = (req: Request, res: Response) => {
    console.log("Received request for deleting course");
    const code: string = req.params.code;
    pool.query(
        "DELETE FROM course_list WHERE course_code = $1", 
        [code], 
        (error, results) => {
            if(error) {
                console.error("Error deleting course: ", error);
                res.status(500).json({
                    error: "Error deleting course"
                });
            }
            else {
                console.log(results);
                res.json({
                    success: "Course successfully deleted"
                });
            }
        }
    )
}