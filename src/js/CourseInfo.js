import './general';
import Courses from './services/dataManagement/Courses.js';

class CourseInfo {
    constructor(courseCode) {
        //, credits, courseName, schedule, instructor
        // const c = new Courses();
        // let course = c.fetchCourseByCode(courseCode);
        // this.newFromJSON(course[0]);

        this.courseCode = courseCode;
        this.credits;
        this.courseName;
        this.schedule;
        this.instructor;
        this.newFromJSON();
    }

    setAssignments() {

    }

    setResources() {
        
    }

    async newFromJSON() {
        const c = new Courses();
        let theJSON = await c.fetchCourseByCode(this.courseCode);
        theJSON = theJSON.data[0];

        //from the json create a new instance of courseInfo
        this.credits = theJSON.credits;
        this.courseName = theJSON.courseName;
        this.schedule = theJSON.courseSchedule;
        this.instructor = theJSON.instructor;
    }
}

export default CourseInfo;