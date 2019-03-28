"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Controller class that contains a handler for each
 * user related url that we serve
 */
var UsersController = /** @class */ (function () {
    function UsersController(dataAccessLayer) {
        var _this = this;
        // Responds to all GET requests on the url /users
        this.listUsers = function (request, response) {
            console.log("Listing all users.");
            var userList = _this.storage.listUsers();
            console.log("List users request returned with " + userList.length + " users");
            response.json(userList);
        };
        // Responds to all GET requests on the url /users/:userId
        this.getUser = function (request, response) {
            var userId = request.params.userId;
            if (!userId) {
                response.statusMessage = "User Id parameter must be provided!";
                response.status(400).end();
                console.log(response.statusMessage);
                return;
            }
            userId = userId.trim();
            console.log("Fetching user with requested id \"" + userId + "\".");
            var user = _this.storage.getById(userId);
            if (!user) {
                response.statusMessage = "No user was found with given id \"" + userId + "\"!";
                response.status(404).end();
                console.log(response.statusMessage);
                return;
            }
            response.json(user);
        };
        // Responds to all POST requests on the url /users
        this.createUser = function (request, response) {
            var email = request.body.email;
            var password = request.body.password;
            var phone = request.body.phone;
            if (!email || !password) {
                response.statusMessage = "Email and password must be provided!";
                response.status(400).end();
                console.log(response.statusMessage);
                return;
            }
            email = email.trim();
            password = password.trim();
            phone = (phone) ? phone.trim() : phone;
            console.log("Looking for existing user with the given email \"" + email + "\".");
            var user = _this.storage.getByEmail(email);
            if (user) {
                response.statusMessage = "A user already exists with the given email \"" + email + "\"!";
                response.status(400).end();
                console.log(response.statusMessage);
                return;
            }
            // Validate phone number format
            if (phone && !_this.validatePhoneNumber(phone)) {
                response.statusMessage = "Given phone number \"" + phone + "\" does not match format XXX-XXX-XXXX";
                response.status(400).end();
                console.log(response.statusMessage);
                return;
            }
            console.log("Creating new user with email \"" + email + "\".");
            var newUser = _this.storage.createUser(email, password, phone);
            if (!newUser) {
                response.statusMessage = "Internal error during user creation, try again.";
                response.status(500).end();
                console.log(response.statusMessage);
                return;
            }
            response.json(newUser);
        };
        // Responds to all PUT requests on the url /users/:userId
        this.updateUser = function (request, response) {
            var userId = request.params.userId;
            if (!userId) {
                response.statusMessage = "User Id parameter must be provided!";
                response.status(400).end();
                console.log(response.statusMessage);
                return;
            }
            userId = userId.trim();
            console.log("Fetching user with requested id \"" + userId + "\" for update.");
            var user = _this.storage.getById(userId);
            if (!user) {
                response.statusMessage = "No user was found with given id \"" + userId + "\"!";
                response.status(404).end();
                console.log(response.statusMessage);
                return;
            }
            var updatedEmail = request.body.email;
            var updatedPassword = request.body.password;
            var updatedPhone = request.body.phone;
            updatedEmail = (updatedEmail) ? updatedEmail.trim() : updatedEmail;
            updatedPassword = (updatedPassword) ? updatedPassword.trim() : updatedPassword;
            updatedPhone = (updatedPhone) ? updatedPhone.trim() : updatedPhone;
            console.log("Looking for existing user with the requested email\"" + updatedEmail + "\".");
            var userWithSameEmail = (updatedEmail) ? _this.storage.getByEmail(updatedEmail) : null;
            // Found a user with the same email that's not the user we're trying to update
            // aka updating to requested email would result in a conflict
            if (userWithSameEmail && userWithSameEmail.id != userId) {
                response.statusMessage = "A user already exists with the requested email \"" + updatedEmail + "\"!";
                response.status(400).end();
                console.log(response.statusMessage);
                return;
            }
            // Validate phone number format
            if (updatedPhone && !_this.validatePhoneNumber(updatedPhone)) {
                response.statusMessage = "Given phone number \"" + updatedPhone + "\" does not match format XXX-XXX-XXXX";
                response.status(400).end();
                console.log(response.statusMessage);
                return;
            }
            /* Check if we actually need to write anything, though we
             * might want to always write just to capture that there
             * was a requested updated as well the update timestamp. */
            var shouldUpdate = ((updatedEmail != null && updatedEmail != user.email) ||
                (updatedPassword != null && updatedPassword != user.password) ||
                (updatedPhone != null && updatedPhone != user.phone));
            // Save updated data
            if (shouldUpdate) {
                // Only updated if values are provided. This provides no way of
                // un-setting data, but it's unclear if that is a valid use case.
                user.email = (updatedEmail) ? updatedEmail : user.email;
                user.password = (updatedPassword) ? updatedPassword : user.password;
                user.phone = (updatedPhone) ? updatedPhone : user.phone;
                // update last modified timestamp
                user.updated = new Date();
                console.log("Updating data for user " + userId);
                _this.storage.updateUser(userId, user);
            }
            else {
                console.log("No updates required for user " + userId);
            }
            response.json(user);
        };
        this.storage = dataAccessLayer;
    }
    UsersController.prototype.validatePhoneNumber = function (phoneNumber) {
        return UsersController.PHONE_NUMBER_PATTERN.test(phoneNumber);
    };
    UsersController.PHONE_NUMBER_PATTERN = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;
    return UsersController;
}());
exports.UsersController = UsersController;
