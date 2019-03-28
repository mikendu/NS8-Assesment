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
    getByEmail(email: string): User | null;
    createUser(email: string, password: string, phone?:string): User | null;
    updateUser(userId: string, userData: User): User | null;
}


export class UsersLocalStorage implements UsersStorage
{

    static USER_ID_KEY = "user_id_inc";
    static USER_ID_PREFIX = "user/";

    nextId(): string 
    {
        var lastId: number = storage.getItemSync(UsersLocalStorage.USER_ID_KEY);
        lastId = (lastId) ? lastId : 0;

        var newId: number = lastId + 1;
        storage.setItemSync(UsersLocalStorage.USER_ID_KEY, newId);

        var newIdString = newId.toString().padStart(4, "0");
        return newIdString;
    }    
    
    listUsers(): User[] 
    {
        return storage.valuesWithKeyMatch(UsersLocalStorage.USER_ID_PREFIX);
    }

    private uniqueId(userId: string) { return UsersLocalStorage.USER_ID_PREFIX  + userId; }

    getById(userId: string): User | null
    {
        return storage.getItemSync(this.uniqueId(userId));
    }

    getByEmail(email: string): User | null
    {
        // Get all users and find the right one
        // Can be greatly optimized by tweaking the schema
        
        var allUsers = this.listUsers();
        var filtered = allUsers.filter(item => item.email == email);

        // Should likely throw an exception if len > 1 (aka there's already a duplicate)
        return (filtered.length == 1) ? filtered[0] : null;
    }

    createUser( email: string, 
                password: string, 
                phone?: string | undefined):  User | null 
    {
        var userId:string = this.nextId();
        var currentTime = new Date();
        var userPhone = (phone) ? phone : "";

        var newUser: User = 
        {
            id: userId,
            email: email,
            password: password,
            phone: userPhone,
            created: currentTime,
            updated: currentTime
        }

        let storedUser: User;
        // TODO - Better error handling
        // TODO - Handle duplicates
        // TODO - Make async
        try
        {
            storage.setItemSync(this.uniqueId(userId), newUser);
            storedUser = storage.getItemSync(this.uniqueId(userId));
        }
        catch(error)
        {
            return null;
        }

        return storedUser;
        
    }

    updateUser(userId: string, userData: User):  User | null 
    {
        let storedUser: User;
        // TODO - Better error handling
        // TODO - Handle duplicates
        // TODO - Make async
        try
        {
            storage.setItemSync(this.uniqueId(userId), userData);
            storedUser = storage.getItemSync(this.uniqueId(userId));
        }
        catch(error)
        {
            return null;
        }

        return storedUser;
    }

    
}