"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage = require("node-persist");
var UsersLocalStorage = /** @class */ (function () {
    function UsersLocalStorage() {
    }
    UsersLocalStorage.prototype.nextId = function () {
        var lastId = storage.getItemSync(UsersLocalStorage.USER_ID_KEY);
        lastId = (lastId) ? lastId : 0;
        var newId = lastId + 1;
        storage.setItemSync(UsersLocalStorage.USER_ID_KEY, newId);
        var newIdString = newId.toString().padStart(4, "0");
        return newIdString;
    };
    UsersLocalStorage.prototype.listUsers = function () {
        return storage.valuesWithKeyMatch(UsersLocalStorage.USER_ID_PREFIX);
    };
    UsersLocalStorage.prototype.uniqueId = function (userId) { return UsersLocalStorage.USER_ID_PREFIX + userId; };
    UsersLocalStorage.prototype.getById = function (userId) {
        return storage.getItemSync(this.uniqueId(userId));
    };
    UsersLocalStorage.prototype.getByEmail = function (email) {
        // Get all users and find the right one
        // Can be greatly optimized by tweaking the schema
        var allUsers = this.listUsers();
        var filtered = allUsers.filter(function (item) { return item.email == email; });
        // Should likely throw an exception if len > 1 (aka there's already a duplicate)
        return (filtered.length == 1) ? filtered[0] : null;
    };
    UsersLocalStorage.prototype.createUser = function (email, password, phone) {
        var userId = this.nextId();
        var currentTime = new Date();
        var userPhone = (phone) ? phone : "";
        var newUser = {
            id: userId,
            email: email,
            password: password,
            phone: userPhone,
            created: currentTime,
            updated: currentTime
        };
        var storedUser;
        // TODO - Better error handling
        // TODO - Handle duplicates
        // TODO - Make async
        try {
            storage.setItemSync(this.uniqueId(userId), newUser);
            storedUser = storage.getItemSync(this.uniqueId(userId));
        }
        catch (error) {
            return null;
        }
        return storedUser;
    };
    UsersLocalStorage.prototype.updateUser = function (userId, userData) {
        var storedUser;
        // TODO - Better error handling
        // TODO - Handle duplicates
        // TODO - Make async
        try {
            storage.setItemSync(this.uniqueId(userId), userData);
            storedUser = storage.getItemSync(this.uniqueId(userId));
        }
        catch (error) {
            return null;
        }
        return storedUser;
    };
    UsersLocalStorage.USER_ID_KEY = "user_id_inc";
    UsersLocalStorage.USER_ID_PREFIX = "user/";
    return UsersLocalStorage;
}());
exports.UsersLocalStorage = UsersLocalStorage;
