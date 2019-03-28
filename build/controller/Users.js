"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Controller class that contains a handler for each
 * user related url that we serve
 */
var UsersController = /** @class */ (function () {
    function UsersController(dataAccessLayer) {
        this.storage = dataAccessLayer;
    }
    // Responds to all GET requests on the url /users
    UsersController.prototype.listUsers = function (request, response) {
        console.log("List users");
        response.send("List Users");
    };
    // Responds to all GET requests on the url /users/:userId
    UsersController.prototype.getUser = function (request, response) {
        console.log("Get user");
        response.send("Get User");
    };
    // Responds to all POST requests on the url /users
    UsersController.prototype.createUser = function (request, response) {
        console.log("Create users");
        response.send("Create Users");
    };
    // Responds to all PUT requests on the url /users/:userId
    UsersController.prototype.updateUser = function (request, response) {
        console.log("Update user");
        response.send("Update User");
    };
    return UsersController;
}());
exports.UsersController = UsersController;
