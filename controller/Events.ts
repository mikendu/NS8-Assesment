import express = require('express');
import { EventsStorage, Event } from "../storage/EventsStorage";

/**
 * Controller class that contains a handler for each 
 * event related url that we serve
 */
export class EventsController
{
    private storage: EventsStorage;

    constructor(dataAccessLayer: EventsStorage)
    {
        this.storage = dataAccessLayer;
    }

    // Responds to all GET requests on the url /events
    listEvents = (request: express.Request, response: express.Response) =>
    {
        var userId: string = request.query.user;
        var startDateString: string = request.query.after;
        var endDateString: string = request.query.before;

        userId = userId ? userId.trim() : userId;
        var startDate: Date | undefined = (startDateString) ? new Date(parseInt(startDateString.trim())) : undefined;
        var endDate: Date | undefined = (endDateString) ? new Date(parseInt(endDateString.trim())) : undefined;

        var userMsg = (userId) ? `for user "${userId}"` : "for all users";
        var startMsg = (startDate) ? `, created after date ${startDate}` : "";
        var endMsg = (endDate) ? `, created before date ${endDate}` : "";
        var message = `Listing all events ${userMsg}${startMsg}${endMsg}`;

        console.log(message);
        var eventList: Event[] = this.storage.listEvents(userId, startDate, endDate);
        console.log(`List events request returned with ${eventList.length} events`);
        response.json(eventList);
    }

    // Responds to all GET requests on the url /events/:eventId
    getEvent = (request: express.Request, response: express.Response) =>
    {
        var eventId: string = request.params.eventId;
        if(!eventId)
        {
            response.statusMessage = "Event Id parameter must be provided!";
            response.status(400).end();
            console.log(response.statusMessage);
            return;
        }

        eventId = eventId.trim();
        console.log(`Fetching event with requested id "${eventId}".`);
        var event: Event | null = this.storage.getById(eventId);
        if(!event)
        {
            response.statusMessage = `No event was found with given id "${eventId}"!`;
            response.status(404).end();
            console.log(response.statusMessage);
            return;   
        }

        response.json(event);
    }

    // Responds to all POST requests on the url /events
    /* TOOD: Should likely enforce some referential integrity between users & events */
    createEvent = (request: express.Request, response: express.Response) =>
    {
        var type: string = request.body.type;
        var user: string = request.body.user;

        if(!type || !user)
        {
            response.statusMessage = "Event type and user id must be provided!";
            response.status(400).end();
            console.log(response.statusMessage);
            return;
        }

        type = type.trim();
        user = user.trim();

        console.log(`Creating new event of type "${type}" for user "${user}".`);
        var newEvent: Event | null = this.storage.createEvent(user, type);
        if(!newEvent)
        {
            response.statusMessage = "Internal error during event creation, try again.";
            response.status(500).end();
            console.log(response.statusMessage);
            return;
        }

        response.json(newEvent);
    }

}