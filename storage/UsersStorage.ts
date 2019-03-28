import storage = require('node-persist');

// Define event data structure
export type User = 
{
    id: string;
    email: string;
    password: string;
    phone: string;
    created: Date;
    updated: Date;    
}

export interface UsersStorage
{    
    nextId() : number;
    listUsers(): User[];    
    getById(userId: string): User;
    createUser(email: string, password: string, phone?:string): User;
    updateUser(userId: string, userData: User): User;
}


export class UsersLocalStorage implements UsersStorage
{
    nextId(): number 
    {
        throw new Error("Method not implemented.");
    }    
    
    listUsers(): User[] 
    {
        throw new Error("Method not implemented.");
    }

    getById(userId: string): User 
    {
        throw new Error("Method not implemented.");
    }

    createUser( email: string, 
                password: string, 
                phone?: string | undefined): User 
    {
        throw new Error("Method not implemented.");
    }

    updateUser(userId: string, userData: User): User 
    {
        throw new Error("Method not implemented.");
    }

    
}