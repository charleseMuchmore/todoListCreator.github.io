import './general';
import FileFormater from './FileFormater';
import CourseInfo from './CourseInfo';
import Courses from './services/dataManagement/Courses.js';
import axios from 'axios';

class TodoListCreator {
    constructor()
    {
        this.resourcesCount = 0;
        this.assignmentCount = 0;
        this.$form = document.getElementById("downloadForm");
        this.$classList = document.getElementById("classlist");
        this.loadCoursesIntoSelect();

        this.$resourceButton = document.getElementById("resourceButton");
        this.$assignmentButton = document.getElementById("assignmentButton");
        this.$resourcesSection = document.getElementById("resource-section");

        this.hRule = "_________________________________________________________" + "\n";
        this.headingDashes = " ----- ";

        this.download = this.download.bind(this);
        this.$form.addEventListener("submit", this.download);

        this.loadCoursesIntoSelect = this.loadCoursesIntoSelect.bind(this);

        this.$resourceButton.addEventListener("click", this.addLine);
        this.$assignmentButton.addEventListener("click", this.addLine);

    }

    async loadCoursesIntoSelect() {
        const c = new Courses();
        let courses = await c.fetchCourses();
        courses = courses[0];
        for (let i = 0; i < courses.length; i++) {
            this.$classList.innerHTML += this.generateCourseOption(courses[i]);
        }
    }

    generateCourseOption(course) {
        console.log(course);
        return `
        <option value="${course.courseCode} - ${course.courseName} - ${course.courseSchedule}, ${course.instructor}">${course.courseName}</option>
        `
    }

    getResourcesData() {
        let resourcesContent = '';

        for (let i = 1; i <= this.resourcesCount; i++) {
            const resourceLine = document.getElementById('resource' + i);
            resourcesContent += "-" + resourceLine.value;
            resourcesContent += '\n';    
        };

        return resourcesContent;
    }

    getassignmentsData() {
        let assignmentsContent = '';
        
        for (let i = 1; i <= this.assignmentCount; i++) {
            const assignmentLine = document.getElementById('assignment' + i);
            const assignmentDateLine = document.getElementById('assignmentDatetimePicker' + i);
            const date = new Date(assignmentDateLine.value);
            const dateString = date.toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric", hour:'numeric', minute:"numeric"});
            assignmentsContent += "-" + dateString + ": " + assignmentLine.value;
            assignmentsContent += '\n';    
        };
    
        return assignmentsContent;
        // console.log("requiredAssignmentContent sent out from function");
    }

    download(event) {
        event.preventDefault();
    
        // const c = new Courses();
        // let course = c.fetchCourseByCode("CS280PR");
        // const courseInfo = CourseInfo();
        // courseInfo.newFromJSON(course.data[0]);

        const formData = new FormData(this.$form);
        // const response = await axios.get(`${process.env.SERVER_URL}`)
        // console.log(response);
    
        const resources = this.getResourcesData();
        const assignments = this.getassignmentsData();
    
        const filename = document.getElementById("filename").value + ".txt";
        // const filecontent = formData.get('content');
        // const selectedclass = formData.get('classlist');
        // if (selectedclass === "" ) {
        //     alert('You need to select a class!');
        //     return false;
        // };
        // let selecteclass = "hi";
        // //"PE114 - Returning PE - (async), O'Connor"

        // const courseInfo = new CourseInfo(); 
    
        // const fileFormater = FileFormater(filename);
        // fileFormater.foo();
      }

    addLine(event) {
        const sectionName = event.target.id;

        if (sectionName === 'resourceButton') {
            this.resourcesCount ++;

            let id = 'resource' + this.resourcesCount;
            let newElement = document.createElement('div');
            newElement.setAttribute('class', 'row');
            newElement.setAttribute('class', 'input-area');
            let newTextInput = this.createTextInput("Resource", id);
            newElement.innerHTML = newTextInput;
            this.$resourcesSection.appendChild(newElement);
            return; 
        };

        if (sectionName === 'assignmentButton') {
            this.assignmentCount ++;
            let newTextInput = document.createElement('textarea');
            newTextInput.setAttribute('id', 'assignment' + this.assignmentCount);
            let newDateTimeElement = document.createElement('input');
            newDateTimeElement.setAttribute('type', 'datetime-local');
            newDateTimeElement.setAttribute('id', 'assignmentDatetimePicker' + this.assignmentCount);
            let assignmentsDiv = document.getElementById('assignment-section');
            assignmentsDiv.appendChild(newTextInput);
            assignmentsDiv.appendChild(newDateTimeElement);
            return; 
        };
    }

    createTextInput(placeholderText, id) {
        return `
        <div class="col-sm-1"></div>
        <div class="form-group col-sm-9">
            <input type="text" placeholder="${placeholderText}" class="form-control" id="${id}">
        </div>
        <div class="col-sm-1"></div>
        `
    }


}

window.onload = () => {new TodoListCreator();}