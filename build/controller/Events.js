"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Controller class that contains a handler for each
 * event related url that we serve
 */
var EventsController = /** @class */ (function () {
    function EventsController(dataAccessLayer) {
        this.storage = dataAccessLayer;
    }
    // Responds to all GET requests on the url /events
    EventsController.prototype.listEvents = function (request, response) {
        console.log("List events");
        response.send("List Events");
    };
    // Responds to all GET requests on the url /events/:eventId
    EventsController.prototype.getEvent = function (request, response) {
        console.log("Get event");
        response.send("Get Event");
    };
    // Responds to all POST requests on the url /events
    EventsController.prototype.createEvent = function (request, response) {
        console.log("Create event");
        response.send("Create Event");
    };
    return EventsController;
}());
exports.EventsController = EventsController;
