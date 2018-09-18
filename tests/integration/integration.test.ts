import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () =>{

    'use strict';
    const config = require('../../server/config/env/config');
    const model = require('../../server/models');

    let id;

    const userTest ={
        id: 100,
        name: 'Usuário Teste',
        email: 'teste@email.com',
        password: 'teste'
    };

    const userDefault ={
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'
    };

    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
        .then(() =>{
            return model.User.create(userDefault);
        })
        .then(user =>{
            model.User.create(userTest)
            .then(() => {
                done();
            })
        }) //limpa a base para realizar um teste

    });

    describe('GET /api/users/all', () => {
        it('Deve retornar um Array com todos os usuários', done => {
            request(app)
                .get('/api/users/all')
                .end((error, res) =>{
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                    done(error);
                });
        });
    });

    describe('GET /api/users/:id', () => {
        it('Deve retornar um Json com apenas um usuário', done => {
            request(app)
            .get(`/api/users/${userDefault.id}`)
            .end((error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id).to.be.eq(userDefault.id);
                expect(res.body.payload.name).to.be.eq(userDefault.name);
                expect(res.body.payload.email).to.be.eq(userDefault.email);
                expect(res.body.payload).to.have.all.keys([
                    'id','name','email','password'
                ]);
                id = res.body.payload.id;
                done(error);
            });
        });
    });

    describe('POST /api/users/create', () => {
        it('Deve criar um novo usuário', done => {
            const user = {
                id: 2,
                name: "Usuário Teste",
                email: "usuario@email.com",
                password: 'novouser'
            };
            request(app)
            .post('/api/users/create')
            .send(user)
            .end((error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id).to.be.eq(user.id);
                expect(res.body.payload.name).to.be.eq(user.name);
                expect(res.body.payload.email).to.be.eq(user.email);
                done(error);
            });
        });
    });

    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um usuário', done => {
            const userUpdate = {
                name: "TesteUpdate",
                email: "update@email.com"
            }
            request(app)
            .put(`/api/users/${id}/update`)
            .send(userUpdate)
            .end((error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.name).to.be.eq(userUpdate.name);
                expect(res.body.payload.email).to.be.eq(userUpdate.email);
                done(error);
            });
        });
    });

    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve deletar um usuários', done => {
            request(app)
            .delete(`/api/users/${id}/destroy`)
            .end((error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id).to.be.equal(id);
                done(error);
            });
        });
    });
});