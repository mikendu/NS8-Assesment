import storage = require('node-persist');


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
    nextId() : string
    {
        return "0";
    }

    listEvents( userId?: string | undefined, 
                startDate?: Date | undefined, 
                endDate?: Date | undefined      ): Event[] 
    {
        return [];
    }    
    
    getById(eventId: string): Event | null 
    {
        return null;
    }
    
    createEvent(userId: string, eventType: string): Event | null  
    {
        return null;
    }

    
}