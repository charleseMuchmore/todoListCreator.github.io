class SalesforceRestApi {

    constructor() {
        this.headers = new Headers();
        this.authHeader = "Bearer " + ACCESS_TOKEN; 
        headers.append("Authorization", authHeader);
    }

    async create() {

    }

    async read(queryString) {
        let fetchedData;

        //query string example: query?q=SELECT+name,id+from+SF_Object_Name
        await fetch(`${INSTANCE_URL}/services/data/v60.0/${queryString}`, { headers: this.headers })
        .then(response => response.json())
        .then(data => { fetchedData = data;});

        return fetchedData;
    }

    async update() {

    }

    async delete() {

    }

}

export default SalesforceRestApi;
