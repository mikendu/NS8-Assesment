import storage = require('node-persist');


// Define event data structure
export type Event = 
{
    id: string;
    type: string;
    user: string;
    created: Date;
}

export interface EventsStorage
{    
    nextId() : number;
    listEvents(userId?:string, startDate?: Date, endDate?: Date): Event[];    
    getById(eventId: string): Event;
    createEvent(userId: string, eventType: string): Event;
}

export class EventsLocalStorage implements EventsStorage
{
    nextId() : number
    {
        throw new Error("Method not implemented.");
    }

    listEvents( userId?: string | undefined, 
                startDate?: Date | undefined, 
                endDate?: Date | undefined      ): Event[] 
    {
        throw new Error("Method not implemented.");
    }    
    
    getById(eventId: string): Event 
    {
        throw new Error("Method not implemented.");
    }
    
    createEvent(userId: string, eventType: string): Event 
    {
        throw new Error("Method not implemented.");
    }

    
}