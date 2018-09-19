"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("./service");
var _ = require("lodash");
var errorHandler_1 = require("../../api/responses/errorHandler");
var successHandler_1 = require("../../api/responses/successHandler");
var dbErrorHandler_1 = require("../../config/dbErrorHandler");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.userService
            .getAll()
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao buscar todos os usuários'));
    };
    UserController.prototype.createUser = function (req, res) {
        this.userService
            .create(req.body)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao cadastrar o usuário'));
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.userService
            .getById(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao buscar usuário pelo ID'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        this.userService.update(userId, props)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao atualizar o usuário'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.userService
            .delete(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao excluir o usuário'));
    };
    return UserController;
}());
exports.default = UserController;
