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
        this.$resourceButton = document.getElementById("resourceButton");
        this.$assignmentButton = document.getElementById("assignmentButton");
        this.$resourcesSection = document.getElementById("resource-section");
        this.loadCoursesIntoSelect();

        this.download = this.download.bind(this);
        this.$form.addEventListener("submit", this.download);

        this.$resourceButton.addEventListener("click", this.addLine);
        this.$assignmentButton.addEventListener("click", this.addLine);

    }

    getResourcesData() {
        let resourcesContent = "";
        //use regex to get a list of every div that has an id of resource(x)
        let resources = this.$resourcesSection.children;

        for (let i = 1; i <= resources.length - 1; i++) {
            const resourceLine = resources[i];
            console.log(resourceLine);
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
    }

    async download(event) {
        event.preventDefault();

        const formData = new FormData(this.$form);
    
        const resources = this.getResourcesData();
        const assignments = this.getassignmentsData();
    
        const filename = document.getElementById("filename").value + ".txt";
        const selectedCourseCode = formData.get('classlist'); 
        if (selectedCourseCode === "" ) {
            alert('You need to select a class!');
            return false;
        };

        let courseInfo = await CourseInfo.newFromJSON(selectedCourseCode); 

        // console.log(resources);

        const fileFormater = new FileFormater(courseInfo, resources, assignments, filename);
        fileFormater.foo();
      }

    addLine(event) {
        const sectionName = event.target.id;

        //this is a bit odd to me...
        //for some reason resourcesCount is either undefined or NaN
        //this if statement corrects the issue
        //however I don't know why the issue exists
        if (this.resourcesCount == undefined || this.resourcesCount == NaN)
            this.resourcesCount = 0;

        if (sectionName === 'resourceButton') {
            this.resourcesCount += 1;
            
            let newTextInput = document.createElement('textarea');
            newTextInput.setAttribute('id', 'resource' + this.resourcesCount);

            // let newElement = document.createElement('div');
            // newElement.setAttribute('class', 'row');
            // newElement.setAttribute('class', 'input-area');

            let resourcesDiv = document.getElementById('resource-section');
            resourcesDiv.appendChild(newTextInput);
            console.log(this.resourcesCount);
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

    async loadCoursesIntoSelect() {
        const c = new Courses();
        let courses = await c.fetchCourses();
        courses = courses[0];
        for (let i = 0; i < courses.length; i++) {
            this.$classList.innerHTML += this.generateCourseOption(courses[i]);
        }
    }

    generateCourseOption(course) {
        // return `
        // <option value="${course.courseCode} - ${course.courseName} - ${course.courseSchedule}, ${course.instructor}">${course.courseName}</option>
        // `
        return `
        <option value="${course.courseCode}">${course.courseName}</option>
        `
    }
}

window.onload = () => {new TodoListCreator();}