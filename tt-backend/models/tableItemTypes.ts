export interface CourseListItem {
    course_code: string,
    course_name: string,
    course_instructors: string[],
    course_coordinator: string,
    current_instructor: string,
    course_credits: number,
    default_location: string
};