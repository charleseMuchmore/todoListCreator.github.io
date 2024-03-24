import axios from 'axios';

class Courses { 
    //this class should interface with the db.json for courses
    //will need to set up an instance of db.json on a server for this to work 
    //then will need to use axios to do http requests to the server
    
    constructor() {
        this.courses = [];
    }

    fetchCourses() {
        //Todo:
        //get the courses from db.json
        //store at this.courses
    }

    addCourse() {
        //Todo:
        //add the course to db.json
        //then update this.courses with new course
    }

    editCourseById(id, props) {
        //Todo:
        //update the course by id, with the given props
        //update this.courses to reflect the change
    }

    deleteCourseById(id) {
        //Todo:
        //delete the course with the given id
        //update this.courses to reflect changes
    }
 }

export default Courses;