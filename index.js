var requiredResourcesCount = 0;
var optionalResourcesCount = 0;
var requiredAssignmentsCount = 0;
var optionalAssignmentsCount = 0;


function getRequiredResourcesData() {
    let requiredResourcesContent = '';

    for (let i = 1; i <= requiredResourcesCount; i++) {
        const requiredResourceLine = document.getElementById('requiredResource' + i);
        requiredResourcesContent += requiredResourceLine.value;
        requiredResourcesContent += '\n';    
    };

    return requiredResourcesContent;
}

function getOptionalResourcesData() {
    let optionalResourcesContent = '';

    for (let i = 1; i <= optionalResourcesCount; i++) {
        const optionalResourceLine = document.getElementById('optionalResource' + i);
        optionalResourcesContent += optionalResourceLine.value;
        optionalResourcesContent += '\n';    
    };

    return optionalResourcesContent;
}

function getRequiredAssignmentsData() {
    let requiredAssignmentsContent = '';
    
    for (let i = 1; i <= requiredAssignmentsCount; i++) {
        const requiredAssignmentLine = document.getElementById('requiredAssignment' + i);
        const requiredAssignmentDateLine = document.getElementById('reqdAssignmentDatetimePicker' + 1);
        const date = new Date(requiredAssignmentDateLine.value);
        const dateString = date.toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric", hour:'numeric', minute:"numeric"});
        requiredAssignmentsContent += dateString + ": " + requiredAssignmentLine.value;
        requiredAssignmentsContent += '\n';    
    };

    return requiredAssignmentsContent;
}

function getOptionalAssignmentsData() {
    let optionalAssignmentsContent = '';

    for (let i = 1; i <= optionalAssignmentsCount; i++) {
        const optionalAssignmentLine = document.getElementById('optionalAssignment' + i);
        const optionalAssignmentDateLine = document.getElementById()
        optionalAssignmentsContent += optionalAssignmentLine.value;
        optionalAssignmentsContent += '\n';    
    };

    return optionalAssignmentsContent;
}




function download() {
    const formElement = document.getElementById('downloadform');
    const formData = new FormData(formElement);

    const requiredResources = getRequiredResourcesData();
    const optionalResources = getOptionalResourcesData();
    const requiredAssignments = getRequiredAssignmentsData();
    const optionalAssignments = getOptionalAssignmentsData();

    const content = requiredResources + optionalResources + requiredAssignments + optionalAssignments;



    const filename = formData.get('filename');
    const filecontent = formData.get('content');
    const selectedclass = formData.get('classlist');
    if (selectedclass === "" ) {
        alert('You need to select a class!');
        return;
    };


    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

function addLine(event) {
    const sectionName = event.target.id;

    if (sectionName === 'requiredResources') {
        requiredResourcesCount ++;
        var newTextAreaElement = document.createElement('textarea');
        newTextAreaElement.setAttribute('id', 'requiredResource' + requiredResourcesCount);
        var requiredResourcesDiv = document.getElementById('required-resource-section');
        requiredResourcesDiv.appendChild(newTextAreaElement);
        return; 
    };

    if (sectionName === 'optionalResources') {
        optionalResourcesCount ++;
        var newTextAreaElement = document.createElement('textarea');
        newTextAreaElement.setAttribute('id', 'optionalResource' + optionalResourcesCount);
        var optionalResourcesDiv = document.getElementById('optional-resource-section');
        optionalResourcesDiv.appendChild(newTextAreaElement);
        return; 
    };

    if (sectionName === 'requiredAssignments') {
        requiredAssignmentsCount ++;
        var newTextAreaElement = document.createElement('textarea');
        newTextAreaElement.setAttribute('id', 'requiredAssignment' + requiredAssignmentsCount);
        var newDateTimeElement = document.createElement('input');
        newDateTimeElement.setAttribute('type', 'datetime-local');
        newDateTimeElement.setAttribute('id', 'reqdAssignmentDatetimePicker' + requiredAssignmentsCount);
        var requiredAssignmentsDiv = document.getElementById('required-assignment-section');
        requiredAssignmentsDiv.appendChild(newTextAreaElement);
        requiredAssignmentsDiv.appendChild(newDateTimeElement);
        return; 
    };

    if (sectionName === 'optionalAssignments') {
        optionalAssignmentsCount ++;
        var newTextAreaElement = document.createElement('textarea');
        newTextAreaElement.setAttribute('id', 'optionalAssignment' + optionalAssignmentsCount);
        var newDateTimeElement = document.createElement('input');
        newDateTimeElement.setAttribute('type', 'datetime-local');
        newDateTimeElement.setAttribute('id', 'optAssignmentDatetimePicker' + optionalAssignmentsCount);
        var optionalAssignmentsDiv = document.getElementById('optional-assignment-section');
        optionalAssignmentsDiv.appendChild(newTextAreaElement);
        optionalAssignmentsDiv.appendChild(newDateTimeElement);
        return; 
    };
};