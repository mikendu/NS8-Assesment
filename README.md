# NS8-Assesment
My submission for the NS8 Technical Assessment.

This is a simple RESTful API server, built to serve requests according to the spec provided at [here](https://github.com/ns8inc/ns8-tech-assessment "NS8 Tech Assessment"). This project is built using node.js & the Express module, and data is stored locally on the server via the [node-persist](https://www.npmjs.com/package/node-persist) module. The storage code is encapsulated in a separate module, and thus can be replaced with a more scalable distributed storage option (ex MongoDB, MySQL, etc).

## API
*Example respsonses not provided for conciseness*

### GET /users
* Lists all users in the system
* Returns HTTP 200 (with an empty list) if no users present
* Example: http://localhost:3000/users

### GET /users/[id]
* Retrieves the user with the given identifier.
* Returns HTTP 400 if user id is not provided.
* Returns HTTP 404 if the no such user exists.
* Example: http://localhost:3000/users/1234

### GET /events?fields=user,before,after
* Retrieves all events matching the given filters
* Returns HTTP 200 (with an empty list) if no events exist that match the filters.
    * Example - retrieve all events for all users: http://localhost:3000/events
    * Example - retrieve all events for a given user: http://localhost:3000/events?user=1234
    * Example - retrieve all events for a given time range: http://localhost:3000/events?before=1553290986&after=1553204586

### GET /events/[id]
* Retrieves the event with the given identifier
* Returns HTTP 400 if event id is not provided.
* Returns HTTP 404 if no such event exists.
* Example: http://localhost:3000/events/9876

### POST /users
* Creates a new user.
* Returns HTTP 400 if a required parameter is missing.
* Example: http://localhost:3000/users

### POST /events
* Creates a new event.
* Returns HTTP 400 if a required parameter is missing
* Example: http://localhost:3000/events

### PUT /users/[id]
* Updates the given user's data.
* Returns HTTP 400 if user id is not provided.
* Returns HTTP 404 if no such user exists.
* Example: http://localhost:3000/users/1234


## Schema

Data is stored locally in json format, and will have the following schemas.
### User 
```json
{
    "id": "1234",
    "email" : "test@example.com",
    "password" : "elit3h4cker",
    "phone" : "111-222-3333",
    "created" : "1553290986",
    "updated" : "1553290986"
}
```

### Events 
```json
{
    "id" : "9876",
    "type" : "LOGIN",
    "user" : "1234",
    "created" : "1553290986"
}
```

# Open Questions


1. (Scalable) Persistent Storage Solution 
    * How to store and retrieve user and event data?
    * How to distribute/shard the data?
    * Transactions?
    * **Assumption** - Data will be stored in local storage in json format.
    
2. Security/Authorization
    * Need to salt & hash passwords
    * How to manage access to resources?
    * Who has access to read, and can they read all data?
    * Who has access to write, and can they write any data?
    * Ex, can a user only see/write to their own data? Can only system admins enumerate all data?
    
3. Caching
    * Should we cache results, and if so for how long?
    * Should all data be cached, or only some?
    
4. Monitoring & Metrics
    * What metrics do we care about and want to capture?
    * What level of logging is appropriate for our use cases?
    * How should we log/retain these metrics?

5. Data
    * Need a better way of generating user/event ids (maybe rely on storage layer?). Current solution doesn't work for a distributed system
    * Should events be mutable (ex can they be updated)?
    * Should all API's return the full set of data (ex should listing all users return ALL the data for all users? Or only a summary?)
    * Do we need to limit response sizes / paginate data?
    * Schema design - schema can be optimized to make filtering more efficient
    * Date format in urls - do we care about human readable timestamps?
    * Do we need to enforce referential integrety between users & events?
    * **Assumption** - Events are not mutable after creation. Users are always mutable.
    * **Assumption** - All API's vend all data.

6. Automated Testing Strategy
    * Unit tests for data individual components, ex data access layers?
    * End to end integration testing?
    * **Note** - For the purposes of this assessment, all testing was done manually