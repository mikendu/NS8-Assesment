import storage = require('node-persist');

// Define event data structure
export interface User
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
    nextId() : string;
    listUsers(): User[];    
    getById(userId: string): User | null;
    createUser(email: string, password: string, phone?:string): User | null;
    updateUser(userId: string, userData: User): User | null;
}


export class UsersLocalStorage implements UsersStorage
{
    nextId(): string 
    {
        return "0";
    }    
    
    listUsers(): User[] 
    {
        return [];
    }

    getById(userId: string): User | null
    {
        return null;
    }

    createUser( email: string, 
                password: string, 
                phone?: string | undefined):  User | null 
    {
        return null;
    }

    updateUser(userId: string, userData: User):  User | null 
    {
        return null;
    }

    
}