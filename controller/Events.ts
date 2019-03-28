import express = require('express');
import { EventsStorage } from "../storage/EventsStorage";

/**
 * Controller class that contains a handler for each 
 * event related url that we serve
 */
export class EventsController
{
    storage: EventsStorage;

    constructor(dataAccessLayer: EventsStorage)
    {
        this.storage = dataAccessLayer;
    }

    // Responds to all GET requests on the url /events
    listEvents(request: express.Request, response: express.Response)
    {
        console.log("List events");
        response.send("List Events");
    }

    // Responds to all GET requests on the url /events/:eventId
    getEvent(request: express.Request, response: express.Response)
    {
        console.log("Get event");
        response.send("Get Event");
    }

    // Responds to all POST requests on the url /events
    createEvent(request: express.Request, response: express.Response)
    {
        console.log("Create event");
        response.send("Create Event");
    }

}