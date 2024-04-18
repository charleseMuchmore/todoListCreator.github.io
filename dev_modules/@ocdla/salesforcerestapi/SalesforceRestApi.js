class SalesforceRestApi {

    constructor() {
    }

    async fetch(queryString) {
        const myHeaders = new Headers();
        const authHeader = "Bearer " + ACCESS_TOKEN; 
        myHeaders.append("Authorization", authHeader);

        let fetchedData;
        //query string example: query?q=SELECT+name,id+from+CourseInfo__c
        await fetch(`${INSTANCE_URL}/services/data/v60.0/${queryString}`, { headers: myHeaders })
        .then(response => response.json())
        .then(data => { fetchedData = data;});

        return fetchedData;
    }

}

export default SalesforceRestApi;
