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
                helpers_1.expect(data.dataValues).to.have.all.keys([
                    'email', 'id', 'name', 'password', 'updatedAt', 'createdAt'
                ]);
            });
        });
    });
    // describe('Método Update',() =>{
    //     it('Deve atualizar um usuário', () =>{
    //     });
    // });
    // describe('Método GET Users',() =>{
    //     it('Deve retornar uma lista com todos usuários', () =>{
    //     });
    // });
    // describe('Método Delete',() =>{
    //     it('Deve deletar um usuário', () =>{
    //     });
    // });
});
