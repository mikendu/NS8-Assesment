"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsersLocalStorage = /** @class */ (function () {
    function UsersLocalStorage() {
    }
    UsersLocalStorage.prototype.nextId = function () {
        return "0";
    };
    UsersLocalStorage.prototype.listUsers = function () {
        return [];
    };
    UsersLocalStorage.prototype.getById = function (userId) {
        return null;
    };
    UsersLocalStorage.prototype.createUser = function (email, password, phone) {
        return null;
    };
    UsersLocalStorage.prototype.updateUser = function (userId, userData) {
        return null;
    };
    return UsersLocalStorage;
}());
exports.UsersLocalStorage = UsersLocalStorage;
