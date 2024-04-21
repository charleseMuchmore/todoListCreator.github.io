# Version 1.0

# Installation:
```npm install salesforcerestapi```

Note: This uses 2 global variables from a .env file.
**ACCESS_TOKEN**: Used for the authorization header. See [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/quickstart_oauth.htm) on how to obtain an access token.
**INSTANCE_URL**: The domain of the org you are trying to make calls to.



# SalesforceRestApi
Contains the 4 CRUD methods: Create, Read, Update, Delete.

#### **To Add Headers**:
<code>
let sfRestApi = new SalesforceRestApi(); //new instance <br>
sfRestApi.headers.append(headers_you_want_to_append);
</code>


## Create
*not implemented yet*


## Read
**Parameters**: 
queryString<br>
**Returns**: 
results as a json object

##### **Example Code**
<code>
let sfRestApi = new SalesforceRestApi(); //new instance <br>
let data = await sfRestApi.read("query?q=SELECT+name,id+from+CourseInfo__c"); //asynchronous fetching of data  <br>
console.log(data); //displaying in console <br> 
</code>


## Update
*not implemented yet*


## Delete
*not implemented yet*





