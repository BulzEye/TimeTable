import { Request, Response } from "express";
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: 'tt_database',
    password: process.env.POSTGRES_PASS,
    port: 5432
})

export const course_get = (req: Request, res: Response) => {
    res.send("Request for course information received");
}