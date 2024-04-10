import Courses from './Courses.js';

class CourseInfo {
    
    constructor(courseCode, credits=0, courseName="", schedule=[], instructor="") {
        this.courseCode = courseCode;
        this.credits = credits;
        this.courseName = courseName;
        this.courseSchedule = schedule;
        this.instructor = instructor;
    }

    static async getCourses() {
        const c = new Courses();
        const courses = await c.fetchCourses();
        return courses[0];
    }

    static async newFromJSON(courseCode) {       
        let courses = await this.getCourses();

        for (let i = 0; i < courses.length; i++) {
            let theObj = courses[i];
            if (theObj.courseCode == courseCode) {
                return new CourseInfo(
                    theObj.courseCode,
                    theObj.credits,
                    theObj.courseName,
                    theObj.courseSchedule,
                    theObj.instructor);
            }
        }
    }

    
    toString() {
        return `${this.courseCode} (
                ${this.credits}) 
                ${this.courseName} - 
                ${this.courseSchedule} - 
                ${this.instructor} \n `;
    }

    setAssignments() {

    }

    setResources() {
        
    }
}

export default CourseInfo;