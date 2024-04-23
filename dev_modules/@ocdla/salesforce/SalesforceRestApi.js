class SalesforceRestApi {

    instanceUrl;
    accessToken;
    method;
    body;
    static API_VERSION = 'v60.0';
    static BASE_URL = '/services/data/' + SalesforceRestApi.API_VERSION + '/';

    constructor(instanceUrl, accessToken) {
        this.instanceUrl = instanceUrl;
        this.accessToken = accessToken;
        this.headers = new Headers();
        this.authHeader = "Bearer " + this.accessToken; 
        this.headers.append("Authorization", this.authHeader);
        this.headers.append('Content-Type', 'application/json');
    }

    query(queryString) {
        this.method = 'GET';
        this.path = SalesforceRestApi.BASE_URL + 'query?q=' + queryString;
        return this.send();
    }

    create(objectName, record) {
        this.method = 'POST';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName; 
        this.body = JSON.stringify(record);

        return this.send();
    }

    update(objectName, record) {
        this.method = 'PATCH';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName + `/${record.id}`;
        this.body = JSON.stringify(record);

        return this.send();
    }

    delete(objectName, record) {
        this.method = 'DELETE';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName + `/${record.id}`;
        
        return this.send();
    }

    send() {
        let config = {
            method: this.method,
            headers: this.headers
        };

        if (this.method != 'GET' && this.method != 'DELETE') {
            config.body = this.body;
        }

        return fetch(`${this.instanceUrl}${this.path}`, config)
        .then(resp => {
            let json = resp.json();
            return json;
        })
        .catch((err) => {
            console.error('Error:', err);
        });
    }
}

export default SalesforceRestApi;
