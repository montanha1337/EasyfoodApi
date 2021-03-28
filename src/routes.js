import { Router } from 'express';
import teste from './controller/teste';
import user from './controller/user';
import produtos from './controller/produto'

const routes = new Router();

// rotas modulares verificar como está acessando no arquivo importado
routes.use('/teste',teste)
routes.use('/user', user)
routes.use('/produto',produtos)

  module.exports = routes;