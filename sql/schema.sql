 use iiitm_results;
CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'student', 'instructor')
);

CREATE TABLE Student (
  student_id INT PRIMARY KEY,
  program VARCHAR(100),
  semester INT,
  FOREIGN KEY (student_id) REFERENCES User(user_id)
);

CREATE TABLE Instructor (
  instructor_id INT PRIMARY KEY,
  department VARCHAR(100),
  FOREIGN KEY (instructor_id) REFERENCES User(user_id)
);

CREATE TABLE Course (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(100),
  credits INT,
  instructor_id INT,
  FOREIGN KEY (instructor_id) REFERENCES Instructor(instructor_id)
);

CREATE TABLE Enrollment (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  course_id INT,
  FOREIGN KEY (student_id) REFERENCES Student(student_id),
  FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE Marks (
  marks_id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT,
  assignment1 INT,
  assignment2 INT,
  assignment3 INT,
  end_sem INT,
  FOREIGN KEY (enrollment_id) REFERENCES Enrollment(enrollment_id)
);

CREATE TABLE Grades (
  grade_id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT,
  letter_grade CHAR(2),
  grade_point FLOAT,
  FOREIGN KEY (enrollment_id) REFERENCES Enrollment(enrollment_id)
);