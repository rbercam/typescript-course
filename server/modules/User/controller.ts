import {Request, Response} from 'express';
import * as HTTPStatus from 'http-status';
import User from './service';
import * as _ from 'lodash';
import { onError } from '../../api/responses/errorHandler';
import { onSuccess } from '../../api/responses/successHandler';
import { dbErrorHandler } from '../../config/dbErrorHandler';

class UserController {

    private userService: User;

    constructor(){
        this.userService = new User();
    }

    getAll(req: Request, res: Response){
        this.userService
            .getAll()
            .then(_.partial(onSuccess,res))
            .catch(_.partial(onError, res, 'Erro ao buscar todos os usuários'));
    }

    createUser( req: Request, res: Response){
        this.userService
            .create(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao cadastrar o usuário'));
    }


    getById( req: Request, res: Response){
       const userId = parseInt(req.params.id);
       this.userService
        .getById(userId)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Erro ao buscar usuário pelo ID'));
    }


    updateUser( req: Request, res: Response){
        const userId = parseInt(req.params.id);
        const props = req.body;
        this.userService.update(userId, props)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Erro ao atualizar o usuário'))
    }


    deleteUser( req: Request, res: Response){
        const userId = parseInt(req.params.id);
        this.userService
        .delete(userId)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Erro ao excluir o usuário'));
    }
    
}

export default UserController;