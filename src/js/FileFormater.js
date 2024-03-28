import './general';

class FileFormater {
    constructor(cInfo, resources, assignments, filename) {
        this.courseInfo = cInfo;
        this.resources = resources;
        this.assignments = assignments;
        this.filename = filename;
        this.hRule = "_________________________________________________________" + "\n";
        this.headingDashes = " ----- ";
        //content

    }

    foo() {
        const header = this.generateCourseHeader();
        const content = header
        + this.headingDashes + "Resources" + this.headingDashes + '\n'
        + this.resources + '\n'
        + this.headingDashes + "Assignments" + this.headingDashes + '\n'
        + this.assignments 
        + this.hRule;

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', this.filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    generateCourseHeader() {
        return (
        this.hRule + 
        this.courseInfo.courseCode + " (" + 
        this.courseInfo.credits + ") " + 
        this.courseInfo.courseName + " - " + 
        this.courseInfo.courseSchedule + " - " + 
        this.courseInfo.instructor + '\n' + this.hRule);
    }
}

export default FileFormater;