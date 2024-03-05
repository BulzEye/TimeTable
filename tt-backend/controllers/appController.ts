import { Request, Response, query } from "express";
import { Pool } from "pg";
import { CourseListItem, CourseSlotItem } from "../models/tableItemTypes";

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

export const update_course_patch = (req: Request, res: Response) => {
    console.log("Received request for updating course");
    const code = req.params.code;
    const updates = req.body;

    let queryString = "UPDATE course_list SET ";
    let queryArray: string[] = [];

    Object.keys(updates).forEach((field, index) => {
        if(index!==0) queryString += ", ";
        queryString += `${field} = $${index+1}`;
        // queryArray.push(field);
        queryArray.push(updates[field]);
    });
    queryString += ` WHERE course_code = $${Object.keys(updates).length+1}`;
    queryArray.push(code);

    console.log(queryString);
    console.log(queryArray);

    pool.query(
        queryString, 
        queryArray, 
        (error, results) => {
            if(error) {
                if(error.message.includes("duplicate key value violates unique constraint")) {
                    console.error("ERROR: Course already exists.\nCallstack: ", error);
                    res.status(500).json({
                        error: "Course already exists"
                    });
                }
                else {
                    console.error("Error updating course:", error);
                    res.status(500).json({
                        error: "Error updating course"
                    });
                }
            }
            else {
                console.log(results);
                res.json({
                    success: "Course successfully updated"
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

export const course_slots_get = (req: Request, res: Response) => {
    pool.query("SELECT * FROM course_slots", (error, results) => {
        if(error) {
            console.error("Error getting course slots:", error);
            res.status(500).json({
                error: "Error getting course slots."
            });
        }
        else {
            console.log(results);
            res.json({
                slots: results.rows
            })
        }
    })
    // res.send("Request for course information received");
}

export const add_slot_post = (req: Request, res: Response) => {
    console.log("Received request for adding new course slot");
    const newCourse: CourseSlotItem = req.body;
    console.log(newCourse);
    pool.query(
        "INSERT INTO course_slots (course, course_type, start_time, class_status, replaced_by, day) VALUES ($1, $2, $3, $4, $5, $6)", 
        [
            newCourse.course, 
            newCourse.course_type, 
            newCourse.start_time, 
            newCourse.class_status, 
            newCourse.replaced_by, 
            newCourse.day
        ], 
        (error, results) => {
            if(error) {
                if(error.message.includes("duplicate key value violates unique constraint")) {
                    console.error("ERROR: Course already exists.\nCallstack: ", error);
                    res.status(500).json({
                        error: "Course already exists"
                    });
                }
                else if(error.message.includes("insert or update on table \"course_slots\" violates foreign key constraint \"course_slots_course_fkey\"")) {
                    console.error("ERROR: Course referenced in slot to be added, does not exist.\nCallstack: ", error);
                    res.status(500).json({
                        error: "Course referenced in slot does not exist. Add the course using /add-course"
                    });
                }
                else {
                    console.error("Error adding new course:", error);
                    res.status(500).json({
                        error: "Error adding new course slot"
                    });
                }
            }
            else {
                console.log(results);
                res.json({
                    success: "Course slot successfully added"
                });
            }
        }
    )
}

export const update_slot_patch = (req: Request, res: Response) => {
    console.log("Received request for updating course slot");
    const id = req.params.id;
    const updates = req.body;

    let queryString = "UPDATE course_slots SET ";
    let queryArray: string[] = [];

    Object.keys(updates).forEach((field, index) => {
        if(index!==0) queryString += ", ";
        queryString += `${field} = $${index+1}`;
        // queryArray.push(field);
        queryArray.push(updates[field]);
    });
    queryString += ` WHERE id = $${Object.keys(updates).length+1}`;
    queryArray.push(id);

    console.log(queryString);
    console.log(queryArray);

    pool.query(
        queryString, 
        queryArray, 
        (error, results) => {
            if(error) {
                if(error.message.includes("insert or update on table \"course_slots\" violates foreign key constraint \"course_slots_course_fkey\"")) {
                    console.error("ERROR: Updated course does not exist.\nCallstack: ", error);
                    res.status(500).json({
                        error: "Updated course referenced in this slot does not exist. Add the course using /add-course"
                    });
                }
                else {
                    console.error("Error updating course slot:", error);
                    res.status(500).json({
                        error: "Error updating course slot"
                    });
                }
            }
            else {
                console.log(results);
                res.json({
                    success: "Course slot successfully updated"
                });
            }
        }
    )
}

export const delete_slot = (req: Request, res: Response) => {
    console.log("Received request for deleting course slot");
    const id: number = parseInt(req.params.id);
    pool.query(
        "DELETE FROM course_slots WHERE id = $1", 
        [id], 
        (error, results) => {
            if(error) {
                console.error("Error deleting course slot: ", error);
                res.status(500).json({
                    error: "Error deleting course slot"
                });
            }
            else {
                console.log(results);
                res.json({
                    success: "Course slot successfully deleted"
                });
            }
        }
    )
}