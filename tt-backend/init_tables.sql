CREATE TABLE course_list (
    course_code varchar(10) NOT NULL UNIQUE,
    course_name varchar,
    course_instructors varchar array,
    course_coordinator varchar,
    current_instructor varchar,
    course_credits smallint,
    PRIMARY KEY (course_code)
);
CREATE TYPE c_status AS ENUM('normal', 'replaced by', 'cancelled');
CREATE TABLE courses(
    id serial NOT NULL UNIQUE,
    course varchar(10),
    course_type char(1),
    start_time time,
    end_time time,
    class_status c_status,
    replaced_by varchar(10),
    PRIMARY KEY (id),
    FOREIGN KEY (course) references course_list(course_code),
    FOREIGN KEY (replaced_by) references course_list(course_code)
);