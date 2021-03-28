import { Router } from 'express';
import teste from './controller/teste';
import user from './controller/user';

const routes = new Router();

// rotas modulares verificar como está acessando no arquivo importado
routes.use('/teste',teste)
routes.use('/user', user)

  module.exports = routes;