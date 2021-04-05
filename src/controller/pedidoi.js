import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {pedido, produto, quantidade} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `produtoi`( `IdPedido`, `IdProduto`, `Quantidade`) VALUES (?,?,?)',
    [pedido, produto, quantidade]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from produtoi');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscaritens', async(req, res, next)=>{//lista todos os produtos do pedido
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from produtoi p where p.idpedido=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletaitem', async(req, res, next)=>{
    const {pedido,item} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from produtoi p where p.idproduto=? and p.pedido=? ',[item,pedido]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{/////////////////////////////////////////////////Rotas do desenvolvedor

    const [rows] = await Banco.connection.promise().execute('delete from produtoi');
    res.status(200).json('Registros apagados')
})



module.exports = router