"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
describe('Testes Unitários do Controller', function () {
    describe('Método Create', function () {
        it('Deve criar um novo Usuário', function () {
            var novoUsuario = {
                id: 1,
                name: 'Novo Usuario',
                email: 'novousuario@email.com',
                password: '1234'
            };
            var user = new service_1.default();
            return user.create(novoUsuario)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', function () {
        it('Deve atualizar um usuário', function () {
            var usuarioUpdate = {
                name: 'Novo Usuario Update',
                email: 'update@email.com'
            };
            var user = new service_1.default();
            return user.update(1, usuarioUpdate).then(function (data) {
                helpers_1.expect(data[0]).to.be.eq(1);
            });
        });
    });
    describe('Método GET Users', function () {
        it('Deve retornar uma lista com todos usuários', function () {
            var user = new service_1.default();
            return user.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.have.all.keys([
                    'email', 'id', 'email', 'password'
                ]);
            });
        });
    });
    describe('Método getById', function () {
        it('Retornar um usuário de acordo com o ID passado', function () {
            var user = new service_1.default();
            return user.getById(1).then(function (data) {
                helpers_1.expect(data).to.have.keys([
                    'email', 'id', 'email', 'password'
                ]);
                helpers_1.expect(data['id']).to.be.eq(1);
            });
        });
    });
    describe('Método getByEmail', function () {
        it('Retornar um usuário de acordo com o Email passado', function () {
            var user = new service_1.default();
            return user.getByEmail('update@email.com').then(function (data) {
                helpers_1.expect(data).to.have.keys([
                    'email', 'id', 'email', 'password'
                ]);
                helpers_1.expect(data['email']).to.be.eq('update@email.com');
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve deletar um usuário', function () {
            var user = new service_1.default();
            return user.delete(1).then(function (data) {
                helpers_1.expect(data).to.be.eq(1);
            });
        });
    });
});
