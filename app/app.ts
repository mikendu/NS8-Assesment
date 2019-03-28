import express = require('express');
import path = require('path');

import { Event, EventsStorage, EventsLocalStorage } from '../storage/EventsStorage';
import { User, UsersStorage, UsersLocalStorage } from '../storage/UsersStorage';
import { UsersController } from '../controller/Users';
import { EventsController } from '../controller/Events';

// Create a new Express app instance
const app: express.Application = express();


// Top level page handler
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname + '/api')));


/*  
    Instantiate the controller modules that will facilitate
    reading and writing user and event data. The controllers interface with 
    the underlying storage via a data-access modules, which we pass in here,
    using a dependency injection pattern. 

      */
const usersStorage: UsersStorage = new UsersLocalStorage();
const eventsStorage: EventsStorage = new EventsLocalStorage();

const usersHandler: UsersController = new UsersController(usersStorage);
const eventsHandler: EventsController = new EventsController(eventsStorage);

// Set up url -> handler routing
app.route("/users")
    .get(usersHandler.listUsers)
    .post(usersHandler.createUser);

app.route("/users/:userId")
    .get(usersHandler.getUser)
    .put(usersHandler.updateUser);

app.route("/events")
    .get(eventsHandler.listEvents)
    .post(eventsHandler.createEvent);

app.route("/events/:eventId")
    .get(eventsHandler.getEvent);



// Start the server
app.listen(3000, 
    function () 
    {
        console.log('Routed REST Server listening on port 3000!');
    }
);