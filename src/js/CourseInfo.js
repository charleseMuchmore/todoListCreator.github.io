import './general';

class CourseInfo {

    constructor(CRN, courseNum, courseName, instructor, schedule, assignments, resources) {

    }

    constructor(CRN, courseNum, courseName, instructor, schedule) {

    }

    setAssignments() {

    }

    setResources() {
        
    }

    constructor(formData, resources, assignments, filename) {

        this.selectedclass = formData.get('classlist');
        if (selectedclass === "" ) {
            alert('You need to select a class!');
            return false;
        };
        //content

    }

    static newFromJSON(theJSON) {

        //from the json create a new instance of courseInfo
    }
}