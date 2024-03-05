export interface CourseListItem {
    course_code: string,
    course_name: string,
    course_instructors: string[],
    course_coordinator: string,
    current_instructor: string,
    course_credits: number,
    default_location: string
};

export interface CourseSlotItem {
    id: number,
    course: string,
    course_type: string, // character actually, but here we treat it same as string
    start_time: Date,
    class_status: 'normal' | 'replaced by' | 'cancelled',
    replaced_by: string, 
    day: number
};