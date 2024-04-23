class SalesforceRestApi {

    constructor() {
        this.headers = new Headers();
        this.authHeader = "Bearer " + ACCESS_TOKEN; 
        this.headers.append("Authorization", this.authHeader);
    }

    async create(objectName, requestBody) {
        let response;
        this.headers.append('Content-Type', 'application/json');

        await fetch(`${INSTANCE_URL}/services/data/v60.0/sobjects/${objectName}/`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(data => response = data)
        .catch((err) => {
            console.error('Error:', err);
        });

        return response;
    }

    async read(queryString) {
        let fetchedData;

        //query string example: query?q=SELECT+name,id+from+SF_Object_Name
        await fetch(`${INSTANCE_URL}/services/data/v60.0/${queryString}`, { headers: this.headers })
        .then(response => response.json())
        .then(data => { fetchedData = data;})
        .catch((err) => {
            console.error('Error:', err);
        });

        return fetchedData;
    }

    async update(objectName, recordId, requestBody) {
        let response;
        this.headers.append('Content-Type', 'application/json');

        await fetch(`${INSTANCE_URL}/services/data/v60.0/sobjects/${objectName}/${recordId}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(data => response = data)
        .catch((err) => {
            console.error('Error:', err);
        });

        return response;
    }

    async delete(objectName, recordId) {
        let response;
        this.headers.append('Content-Type', 'application/json');

        await fetch(`${INSTANCE_URL}/services/data/v60.0/sobjects/${objectName}/${recordId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(response => response.json())
        .then(data => response = data)
        .catch((err) => {
            console.error('Error:', err);
        });

        return response;
    }

}

export default SalesforceRestApi;
