import { testDouble, expect} from './config/helpers';
import User from '../../server/modules/User/service';
import { executionAsyncId } from 'async_hooks';

describe('Testes Unitários do Controller', () => {
    describe('Método Create', () => {
        it('Deve criar um novo Usuário', () => {
            const novoUsuario = {
                id: 1,
                name: 'Novo Usuario',
                email: 'novousuario@email.com',
                password: '1234'
            };
            const user = new User();
            return user.create(novoUsuario)
                .then(data => {
                    expect(data.dataValues).to.have.all.keys(
                        ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                        )
                })
        });
    });


    describe('Método Update',() =>{
        it('Deve atualizar um usuário', () =>{
            
            const usuarioUpdate = {
                name: 'Novo Usuario Update',
                email: 'update@email.com'
            }
            const user = new User();
            return user.update(1,usuarioUpdate).then(data => {
                expect(data[0]).to.be.eq(1);
            })
        });
    });

    describe('Método GET Users',() =>{
        it('Deve retornar uma lista com todos usuários', () =>{
            const user = new User();
            return user.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys([
                    'email', 'id', 'email', 'password'
                ])
            });
        })
    });

    describe('Método getById', () =>{
        it('Retornar um usuário de acordo com o ID passado', () => {
            const user = new User();
            return user.getById(1).then(data =>{
                expect(data).to.have.keys([
                    'email', 'id', 'email', 'password'
                ]);
                expect(data['id']).to.be.eq(1);
            })
        })
    });

    describe('Método getByEmail', () =>{
        it('Retornar um usuário de acordo com o Email passado', () => {
            const user = new User();
            return user.getByEmail('update@email.com').then(data =>{
                expect(data).to.have.keys([
                    'email', 'id', 'email', 'password'
                ]);
                expect(data['email']).to.be.eq('update@email.com');
            })
        })
    });

    describe('Método Delete',() =>{
        it('Deve deletar um usuário', () =>{
            const user = new User()         ;
            return user.delete(1).then(data =>{
                expect(data).to.be.eq(1);
            })
        });
    });
});