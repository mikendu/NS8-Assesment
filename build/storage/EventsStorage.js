"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage = require("node-persist");
var EventsLocalStorage = /** @class */ (function () {
    function EventsLocalStorage() {
    }
    EventsLocalStorage.prototype.nextId = function () {
        var lastId = storage.getItemSync(EventsLocalStorage.EVENT_ID_KEY);
        lastId = (lastId) ? lastId : 0;
        var newId = lastId + 1;
        storage.setItemSync(EventsLocalStorage.EVENT_ID_KEY, newId);
        var newIdString = newId.toString().padStart(4, "0");
        return newIdString;
    };
    EventsLocalStorage.prototype.listEvents = function (userId, startDate, endDate) {
        // Retrieve all events and then filter out unwanted results
        // Can be made more efficient by improving storage scheme
        var values = storage.valuesWithKeyMatch(EventsLocalStorage.EVENT_ID_PREFIX);
        values = (userId) ? values.filter(function (item) { return item.user == userId; }) : values;
        values = (startDate) ? values.filter(function (item) { return new Date(item.created) >= startDate; }) : values; // Minor note - assumed date range is inclusive
        values = (endDate) ? values.filter(function (item) { return new Date(item.created) <= endDate; }) : values;
        return values;
    };
    EventsLocalStorage.prototype.uniqueId = function (eventId) { return EventsLocalStorage.EVENT_ID_PREFIX + eventId; };
    EventsLocalStorage.prototype.getById = function (eventId) {
        return storage.getItemSync(this.uniqueId(eventId));
    };
    EventsLocalStorage.prototype.createEvent = function (userId, eventType) {
        var eventId = this.nextId();
        var currentTime = new Date();
        var newEvent = {
            id: eventId,
            user: userId,
            type: eventType,
            created: currentTime
        };
        var storedEvent;
        // TODO - Better error handling
        // TODO - Handle duplicates
        // TODO - Make async
        try {
            storage.setItemSync(this.uniqueId(eventId), newEvent);
            storedEvent = storage.getItemSync(this.uniqueId(eventId));
        }
        catch (error) {
            return null;
        }
        return storedEvent;
    };
    EventsLocalStorage.EVENT_ID_KEY = "event_id_inc";
    EventsLocalStorage.EVENT_ID_PREFIX = "event/";
    return EventsLocalStorage;
}());
exports.EventsLocalStorage = EventsLocalStorage;
