import Courses from './Courses.js';

class CourseInfo {
    
    constructor(courseCode, courseName="", credits=0, schedule=[], instructor="") {
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

    static newFromJSON(data) {    
        data = Array.isArray(data) ? data : [data];
        let normalizedCourses = [];
        for (let i = 0; i < data.length; i++) {
            normalizedCourses.push(new CourseInfo(
                data.courseCode,
                data.credits,
                data.courseName,
                data.courseSchedule,
                data.instructor));
        }
        return normalizedCourses;
    }

    static newFromSalesforce(data) {
        data = Array.isArray(data) ? data : [data];
        let normalizedCourses = [];
        for (let i = 0; i < data.length; i++) {
            let record = data[i];
            normalizedCourses.push(new CourseInfo(record.CourseCode__c, record.Name));
        }
        return normalizedCourses;
    }
    
    toString() {
        return `${this.courseCode} (${this.credits}) ${this.courseName} - ${this.courseSchedule} - ${this.instructor} \n `;
    }

    setAssignments() {

    }

    setResources() {
        
    }
}

export default CourseInfo;
