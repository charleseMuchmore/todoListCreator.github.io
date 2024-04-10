/** @jsx vNode */
import CourseInfo from '../../node_modules/@ocdla/highered/CourseInfo.js'; //treat text file like its a seperate npm package
import Courses from '../../node_modules/@ocdla/highered/Courses.js'; //treat text file like its a seperate npm package
import TxtFile from '../../node_modules/@ocdla/txtfile/TxtFile.js'; //treat text file like its a seperate npm package
import {vNode, View} from "../../node_modules/@ocdla/view/view.js"; //jsx stuff ig?
/**
 * CSS files
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

/**
 * Bootstrap JS File
 */
import 'bootstrap';


window.TxtFile = TxtFile;
console.log("did it");

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
        this.$assignmentsSection = document.getElementById("assignment-section");
        this.loadCoursesIntoSelect();

        this.download = this.download.bind(this);
        this.$form.addEventListener("submit", this.download);

        this.$resourceButton.addEventListener("click", this.addLine);
        this.$assignmentButton.addEventListener("click", this.addLine);

    }

    getResourcesData() {
        let resourcesContent = "";
        //Note: this is not a great way to get the resources, 
        //a possibly better alternative would be to use regex
        //or somehow get all textarea elements in the resourcesSection div
        let resources = this.$resourcesSection.children;

        for (let i = 1; i <= resources.length - 1; i++) {
            const resourceLine = resources[i];
            resourcesContent += "-" + resourceLine.value;
            resourcesContent += '\n'; 
        };

        return resourcesContent;
    }

    getassignmentsData() {
        let assignmentsContent = '';
        
        let assignments = this.$assignmentsSection.children;

        for (let i = 1; i <= assignments.length - 1; i += 2) {
            const assignmentLine = assignments[i];
            const assignmentDateLine = assignments[i+1];
            //Note: the method for getting the above data isn't great
            //alternative solutions include regex or element type selection
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

        let content = courseInfo.toString();

        const theFile = new TxtFile();
        theFile.addHeader(content);
        theFile.addSubHeader("Resources");
        theFile.addContent(this.resources);
        theFile.addSubHeader("Assignments");
        theFile.addContent(this.assignments);
        theFile.addHr();

        theFile.download();
      }

    addLine(event) {
        const sectionName = event.target.id;

        //Note: this is a bit odd to me...
        //for some reason resourcesCount is either undefined or NaN
        //this if statement corrects the issue
        //however I don't know why the issue exists
        if (this.resourcesCount == undefined || this.resourcesCount == NaN)
            this.resourcesCount = 0;

        if (sectionName === 'resourceButton') {
            this.resourcesCount += 1;

            let newTextInput = View.createElement(textInputComponent({placeholderText: "Type here", id: "resource" + this.resourcesCount}));

            let resourcesDiv = document.getElementById('resource-section');
            resourcesDiv.appendChild(newTextInput);
            return; 
        };
        
        //this is similar to the other weird condition statement above
        if (this.assignmentCount == undefined || this.assignmentCount == NaN)
            this.assignmentCount = 0;

        if (sectionName === 'assignmentButton') {
            this.assignmentCount += 1;

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

    async loadCoursesIntoSelect() {
        const c = new Courses();
        let courses = await c.fetchCourses();
        courses = courses[0];
        for (let i = 0; i < courses.length; i++) {
            this.$classList.appendChild(View.createElement(courseOptionComponent({course: courses[i]})));
        }
    }
}

const textInputComponent = function({ placeholderText, id}) {
    return (
        <div>
            <div class="col-sm-1"></div>
            <div class="form-group col-sm-9">
                <input type="text" placeholder={placeholderText} class="form-control" id={id} />
            </div>
            <div class="col-sm-1"></div>
        </div>
        );
};

// const courseOptionSelector = function(props) {
//     return (
//         <option value="">--Please choose a class--</option>
//     );
// };

const courseOptionComponent = function({ course }) {
    return (
        <option value={course.courseCode}>{course.courseName}</option>
    );;
};

window.onload = () => {new TodoListCreator();}
