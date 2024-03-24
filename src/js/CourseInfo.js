import './general';
import Courses from './services/dataManagement/Courses.js';

class CourseInfo {
    constructor(courseCode, credits, courseName, schedule, instructor) {

    }

    setAssignments() {

    }

    setResources() {
        
    }

    newFromJSON(theJSON) {
        //from the json create a new instance of courseInfo
        // const c = new Courses();
        // let course = c.fetchCourseByCode("CS280PR");
        this.courseCode = theJSON.courseCode;
        this.credits = theJSON.credits;
        this.courseName = theJSON.courseName;
        this.schedule = theJSON.schedule;
        this.instructor = theJSON.instructor;
    }
}

export default CourseInfo;