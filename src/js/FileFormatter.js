import './general';

class FileFormatter {
    constructor(formData, resources, assignments, filename) {

        this.selectedclass = formData.get('classlist');
        if (selectedclass === "" ) {
            alert('You need to select a class!');
            return false;
        };
        //content

    }

    foo() {
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
}