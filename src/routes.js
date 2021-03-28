import { Router } from 'express'
import teste from './controller/teste'
import user from './controller/user'
import produtos from './controller/produto'
import endereco from './controller/endereco'
import empresa from './controller/empresa'
import filial from './controller/filial'
import categoria from './controller/categoria'
import pessoa from './controller/pessoa'
import pagamento from './controller/pagamento'
import frete from './controller/frete'
import pedidoi from './controller/pedidoi'
import pedido from './controller/pedido'

const routes = new Router();

// rotas modulares verificar como está acessando no arquivo importado
routes.use('/teste',teste)
routes.use('/user', user)
routes.use('/produto',produtos)
routes.use('/endereco',endereco)
routes.use('/empresa',empresa)
routes.use('/filial',filial)
routes.use('/categoria',categoria)
routes.use('/pessoa',pessoa)
routes.use('/pagamento',pagamento)
routes.use('/frete',frete)
routes.use('/pedidoi',pedidoi)
//routes.use('/pedido',pedido)


  module.exports = routes;