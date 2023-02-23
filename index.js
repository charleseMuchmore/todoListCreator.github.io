var requiredResourcesCount = 0;
var optionalResourcesCount = 0;
var requiredAssignmentsCount = 0;
var optionalAssignmentsCount = 0;

var hRule = "_________________________________________________________" + "\n"
var headingDashes = " ----- "


function getRequiredResourcesData() {
    let requiredResourcesContent = '';

    for (let i = 1; i <= requiredResourcesCount; i++) {
        const requiredResourceLine = document.getElementById('requiredResource' + i);
        requiredResourcesContent += "-" + requiredResourceLine.value;
        requiredResourcesContent += '\n';    
    };

    return requiredResourcesContent;
}

function getRequiredAssignmentsData() {
    let requiredAssignmentsContent = '';
    
    for (let i = 1; i <= requiredAssignmentsCount; i++) {
        const requiredAssignmentLine = document.getElementById('requiredAssignment' + i);
        const requiredAssignmentDateLine = document.getElementById('reqdAssignmentDatetimePicker' + i);
        const date = new Date(requiredAssignmentDateLine.value);
        const dateString = date.toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric", hour:'numeric', minute:"numeric"});
        requiredAssignmentsContent += "-" + dateString + ": " + requiredAssignmentLine.value;
        requiredAssignmentsContent += '\n';    
    };

    return requiredAssignmentsContent;
}




function download(event) {
    event.preventDefault();

    const formElement = document.getElementById('downloadform');
    const formData = new FormData(formElement);

    const requiredResources = getRequiredResourcesData();
    const requiredAssignments = getRequiredAssignmentsData();

    const filename = formData.get('filename');
    const filecontent = formData.get('content');
    const selectedclass = formData.get('classlist');
    if (selectedclass === "" ) {
        alert('You need to select a class!');
        return false;
    };


    const content = hRule + selectedclass + '\n' + hRule 
                  + headingDashes + "Resources" + headingDashes + '\n'
                  + requiredResources + '\n'
                  + headingDashes + "Assignments" + headingDashes + '\n'
                  requiredAssignments + '\n'
                  + hRule;



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
};
