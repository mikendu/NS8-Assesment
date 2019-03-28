import express = require('express');
import { UsersStorage, User } from "../storage/UsersStorage";

/**
 * Controller class that contains a handler for each 
 * user related url that we serve
 */
export class UsersController
{
    private static PHONE_NUMBER_PATTERN = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/
    private storage: UsersStorage;

    constructor(dataAccessLayer: UsersStorage)
    {
        this.storage = dataAccessLayer;
    }

    // Responds to all GET requests on the url /users
    listUsers = (request: express.Request, response: express.Response) =>
    {
        console.log("Listing all users.");
        var userList: User[] = this.storage.listUsers();
        console.log(`List users request returned with ${userList.length} users`);
        response.json(userList);
    }
    
    // Responds to all GET requests on the url /users/:userId
    getUser = (request: express.Request, response: express.Response) =>
    {
        var userId: string = request.params.userId;
        if(!userId)
        {
            response.statusMessage = "User Id parameter must be provided!";
            response.status(400).end();
            console.log(response.statusMessage);
            return;
        }

        userId = userId.trim();

        console.log(`Fetching user with requested id "${userId}".`);
        var user: User | null = this.storage.getById(userId);
        if(!user)
        {
            response.statusMessage = `No user was found with given id "${userId}"!`;
            response.status(404).end();
            console.log(response.statusMessage);
            return;   
        }

        response.json(user);
    }
    
    
    // Responds to all POST requests on the url /users
    createUser = (request: express.Request, response: express.Response) =>
    {
        var email: string = request.body.email;
        var password: string = request.body.password;
        var phone: string = request.body.phone;

        if(!email || ! password)
        {
            response.statusMessage = "Email and password must be provided!";
            response.status(400).end();
            console.log(response.statusMessage);
            return;
        }

        email = email.trim();
        password = password.trim();
        phone = (phone) ? phone.trim() : phone;

        console.log(`Looking for existing user with the given email "${email}".`);
        var user: User | null = this.storage.getByEmail(email);
        if(user)
        {
            response.statusMessage = `A user already exists with the given email "${email}"!`;
            response.status(400).end();
            console.log(response.statusMessage);
            return;   
        }

        // Validate phone number format
        if(phone && !this.validatePhoneNumber(phone))
        {
            response.statusMessage = `Given phone number "${phone}" does not match format XXX-XXX-XXXX`;
            response.status(400).end();
            console.log(response.statusMessage);
            return;  
        }

        console.log(`Creating new user with email "${email}".`);
        var newUser: User | null = this.storage.createUser(email, password, phone);
        if(!newUser)
        {
            response.statusMessage = "Internal error during user creation, try again.";
            response.status(500).end();
            console.log(response.statusMessage);
            return;
        }

        response.json(newUser);
    }
    
    // Responds to all PUT requests on the url /users/:userId
    updateUser = (request: express.Request, response: express.Response) =>
    {
        var userId: string = request.params.userId
        if(!userId)
        {
            response.statusMessage = "User Id parameter must be provided!";
            response.status(400).end();
            console.log(response.statusMessage);
            return;
        }

        userId = userId.trim();
        console.log(`Fetching user with requested id "${userId}" for update.`);
        var user: User | null = this.storage.getById(userId);
        if(!user)
        {
            response.statusMessage = `No user was found with given id "${userId}"!`;
            response.status(404).end();
            console.log(response.statusMessage);
            return;   
        }

        var updatedEmail: string = request.body.email;
        var updatedPassword: string = request.body.password;
        var updatedPhone: string = request.body.phone;

        updatedEmail = (updatedEmail) ? updatedEmail.trim() : updatedEmail;
        updatedPassword = (updatedPassword) ? updatedPassword.trim() : updatedPassword;
        updatedPhone = (updatedPhone) ? updatedPhone.trim() : updatedPhone;

        console.log(`Looking for existing user with the requested email"${updatedEmail}".`);
        var userWithSameEmail: User | null = (updatedEmail) ? this.storage.getByEmail(updatedEmail) : null;

        // Found a user with the same email that's not the user we're trying to update
        // aka updating to requested email would result in a conflict
        if(userWithSameEmail && userWithSameEmail.id != userId)
        {
            response.statusMessage = `A user already exists with the requested email "${updatedEmail}"!`;
            response.status(400).end();
            console.log(response.statusMessage);
            return;   
        }


        // Validate phone number format
        if(updatedPhone && !this.validatePhoneNumber(updatedPhone))
        {
            response.statusMessage = `Given phone number "${updatedPhone}" does not match format XXX-XXX-XXXX`;
            response.status(400).end();
            console.log(response.statusMessage);
            return;  
        }

        /* Check if we actually need to write anything, though we 
         * might want to always write just to capture that there 
         * was a requested updated as well the update timestamp. */
        var shouldUpdate: boolean = ((updatedEmail != null  && updatedEmail != user.email) || 
                                        (updatedPassword != null && updatedPassword != user.password) || 
                                        (updatedPhone != null && updatedPhone != user.phone));

        // Save updated data
        if(shouldUpdate)
        {
            // Only updated if values are provided. This provides no way of
            // un-setting data, but it's unclear if that is a valid use case.
            user.email = (updatedEmail) ? updatedEmail : user.email;
            user.password = (updatedPassword) ? updatedPassword : user.password;
            user.phone = (updatedPhone) ? updatedPhone : user.phone;

            // update last modified timestamp
            user.updated = new Date();
            console.log(`Updating data for user ${userId}`);
            this.storage.updateUser(userId, user);
        }
        else
        {
            console.log(`No updates required for user ${userId}`);
        }

        response.json(user);
    }
    

    validatePhoneNumber(phoneNumber: string): boolean
    {
        return UsersController.PHONE_NUMBER_PATTERN.test(phoneNumber);
    }
}