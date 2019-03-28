import storage = require('node-persist');
import { strict } from 'assert';


// Define event data structure
export interface Event
{
    id: string;
    type: string;
    user: string;
    created: Date;
}

export interface EventsStorage
{    
    nextId() : string;
    listEvents(userId?:string, startDate?: Date, endDate?: Date): Event[];    
    getById(eventId: string): Event | null ;
    createEvent(userId: string, eventType: string): Event | null ;
}

export class EventsLocalStorage implements EventsStorage
{
    static EVENT_ID_KEY = "event_id_inc";
    static EVENT_ID_PREFIX = "event/";

    nextId(): string 
    {
        var lastId: number = storage.getItemSync(EventsLocalStorage.EVENT_ID_KEY);
        lastId = (lastId) ? lastId : 0;

        var newId: number = lastId + 1;
        storage.setItemSync(EventsLocalStorage.EVENT_ID_KEY, newId);

        var newIdString = newId.toString().padStart(4, "0");
        return newIdString;
    } 

    listEvents( userId?: string | undefined, 
                startDate?: Date | undefined, 
                endDate?: Date | undefined      ): Event[] 
    {
        // Retrieve all events and then filter out unwanted results
        // Can be made more efficient by improving storage scheme
        var values: Event[] = storage.valuesWithKeyMatch(EventsLocalStorage.EVENT_ID_PREFIX);
        values = (userId) ? values.filter( item => item.user == userId) : values
        values = (startDate) ? values.filter( item => new Date(item.created) >= startDate) : values;    // Minor note - assumed date range is inclusive
        values = (endDate) ? values.filter( item => new Date(item.created) <= endDate) : values;

        return values;
    }    

    private uniqueId(eventId: string) { return EventsLocalStorage.EVENT_ID_PREFIX + eventId; }
    
    getById(eventId: string): Event | null 
    {
        return storage.getItemSync(this.uniqueId(eventId));
    }
    
    createEvent(userId: string, eventType: string): Event | null  
    {
        var eventId:string = this.nextId();
        var currentTime = new Date();
        var newEvent: Event = 
        {
            id: eventId,
            user: userId,
            type: eventType,
            created: currentTime
        }

        let storedEvent: Event;
        // TODO - Better error handling
        // TODO - Handle duplicates
        // TODO - Make async
        try
        {
            storage.setItemSync(this.uniqueId(eventId), newEvent);
            storedEvent = storage.getItemSync(this.uniqueId(eventId));
        }
        catch(error)
        {
            return null;
        }

        return storedEvent;
    }

    
}