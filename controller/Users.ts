import express = require('express');
import { UsersStorage } from "../storage/UsersStorage";

/**
 * Controller class that contains a handler for each 
 * user related url that we serve
 */
export class UsersController
{
    storage: UsersStorage;

    constructor(dataAccessLayer: UsersStorage)
    {
        this.storage = dataAccessLayer;
    }

    // Responds to all GET requests on the url /users
    listUsers(request: express.Request, response: express.Response)
    {
        console.log("List users");
        response.send("List Users");
    }
    
    // Responds to all GET requests on the url /users/:userId
    getUser(request: express.Request, response: express.Response)
    {
        console.log("Get user");
        response.send("Get User");
    }
    
    
    // Responds to all POST requests on the url /users
    createUser(request: express.Request, response: express.Response)
    {
        console.log("Create users");
        response.send("Create Users");
    }
    
    // Responds to all PUT requests on the url /users/:userId
    updateUser(request: express.Request, response: express.Response)
    {
        console.log("Update user");
        response.send("Update User");
    }
    
}