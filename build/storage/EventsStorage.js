"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventsLocalStorage = /** @class */ (function () {
    function EventsLocalStorage() {
    }
    EventsLocalStorage.prototype.nextId = function () {
        return "0";
    };
    EventsLocalStorage.prototype.listEvents = function (userId, startDate, endDate) {
        return [];
    };
    EventsLocalStorage.prototype.getById = function (eventId) {
        return null;
    };
    EventsLocalStorage.prototype.createEvent = function (userId, eventType) {
        return null;
    };
    return EventsLocalStorage;
}());
exports.EventsLocalStorage = EventsLocalStorage;
