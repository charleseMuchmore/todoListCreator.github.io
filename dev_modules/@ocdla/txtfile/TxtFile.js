// import '../../../src/js/general';

class TxtFile {

    static hRule = "_________________________________________________________";
    static headingDashes = " ----- ";

    constructor(filename="new-file.txt") {
        this.content = "";
        this.filename = filename;
    }

    download() {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.content));
        element.setAttribute('download', this.filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    setFilename(filename) {
        this.filename = filename;
    }

    addHr() {
        this.content += ` ${TxtFile.hRule} \n`;
    }

    addContent(content) {
        this.content += `${content} \n`;
    }

    addHeader(label) {
        this.addHr();
        this.content +=  `${label} \n`;
        this.addHr();
    }

    addSubHeader(label) {
        this.content += `${TxtFile.headingDashes} ${label} ${TxtFile.headingDashes} \n`;
    }

    generateCourseContent() {
        const header = this.generateCourseHeader();
        this.addHeader(header);
        this.addSubHeader("Resources");
        this.addContent(this.resources);
        this.addSubHeader("Assignments");
        this.addContent(this.assignments);
        this.addHr();
    }

    generateCourseHeader() {
        let course = this.courseInfo;
        return `
        ${TxtFile.hRule} 
        ${course.courseCode} (
        ${course.credits}) 
        ${course.courseName} - 
        ${course.courseSchedule} - 
        ${course.instructor} \n 
        ${TxtFile.hRule}`;
    }
}

export default TxtFile;