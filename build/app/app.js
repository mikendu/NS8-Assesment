"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var storage = require("node-persist");
var EventsStorage_1 = require("../storage/EventsStorage");
var UsersStorage_1 = require("../storage/UsersStorage");
var Users_1 = require("../controller/Users");
var Events_1 = require("../controller/Events");
// Create a new Express app instance & storage instance
var app = express();
// Top level page handler
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname + '/api')));
// Ensure our storage engine is initialized
storage.initSync({ dir: "/db" });
// Clear storage on each run for testing purposes
storage.clearSync();
/*
    Instantiate the controller modules that will facilitate
    reading and writing user and event data. The controllers interface with
    the underlying storage via a data-access modules, which we pass in here,
    using a dependency injection pattern.

    */
var usersStorage = new UsersStorage_1.UsersLocalStorage();
var eventsStorage = new EventsStorage_1.EventsLocalStorage();
var usersHandler = new Users_1.UsersController(usersStorage);
var eventsHandler = new Events_1.EventsController(eventsStorage);
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
app.listen(3000, function () {
    console.log('Simple REST Server listening on port 3000!');
});
