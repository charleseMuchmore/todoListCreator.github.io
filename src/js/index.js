import './general';

class TodoListCreator {
    constructor()
    {
        this.resourcesCount = 0;
        this.assignmentCount = 0;
        this.$form = document.getElementById("downloadForm");
        this.$resourceButton = document.getElementById("resourceButton");
        this.$assignmentButton = document.getElementById("assignmentButton");

        this.hRule = "_________________________________________________________" + "\n";
        this.headingDashes = " ----- ";

        this.download = this.download.bind(this);
        this.$form.addEventListener("submit", this.download);

        this.addLine = this.addLine.bind(this);
        this.$resourceButton.addEventListener("click", this.addLine);
        this.$assignmentButton.addEventListener("click", this.addLine);
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
    
        const formData = new FormData(this.$form);
    
        const resources = this.getResourcesData();
        const assignments = this.getassignmentsData();
    
        const filename = formData.get('filename') + ".txt";
        // const filecontent = formData.get('content');
        const selectedclass = formData.get('classlist');
        if (selectedclass === "" ) {
            alert('You need to select a class!');
            return false;
        };
    
    
        const content = this.hRule + selectedclass + '\n' + this.hRule 
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

      addLine(event) {
        const sectionName = event.target.id;
    
        if (sectionName === 'resourceButton') {
            this.resourcesCount ++;
            let newTextAreaElement = document.createElement('textarea');
            newTextAreaElement.setAttribute('id', 'resource' + this.resourcesCount);
            let resourcesDiv = document.getElementById('resource-section');
            resourcesDiv.appendChild(newTextAreaElement);
            return; 
        };
    
        if (sectionName === 'assignmentButton') {
            this.assignmentCount ++;
            let newTextAreaElement = document.createElement('textarea');
            newTextAreaElement.setAttribute('id', 'assignment' + this.assignmentCount);
            let newDateTimeElement = document.createElement('input');
            newDateTimeElement.setAttribute('type', 'datetime-local');
            newDateTimeElement.setAttribute('id', 'assignmentDatetimePicker' + this.assignmentCount);
            let assignmentsDiv = document.getElementById('assignment-section');
            assignmentsDiv.appendChild(newTextAreaElement);
            assignmentsDiv.appendChild(newDateTimeElement);
            return; 
        };
      }
}

window.onload = () => {new TodoListCreator();}