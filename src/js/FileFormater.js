import './general';

class FileFormater {
    constructor(courseInfo, resources, assignments, filename) {
        this.courseInfo = courseInfo;
        this.resources = resources;
        this.assignments = assignments;
        this.filename = filename;
        this.hRule = "_________________________________________________________" + "\n";
        this.headingDashes = " ----- ";
        //content

    }

    foo() {
        const content = this.generateCourseHeader() +
        + this.headingDashes + "Resources" + this.headingDashes + '\n'
        + resources + '\n'
        + this.headingDashes + "Assignments" + this.headingDashes + '\n'
        + assignments 
        + this.hRule;

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    generateCourseHeader() {
        const c = this.courseInfo;
        return this.hRule + `${c.courseCode} (${c.credits}) ${c.courseName} - ${c.courseSchedule} - ${c.instructor}`+ '\n' + this.hRule;
    }
}

export default FileFormater;