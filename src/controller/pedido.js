import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {cliente, status,total,troco,observacao,pagamento, data, frete, filial} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `pedidoc`(`Iduser`, `Status`, `Total`, `Troco`, `Observacao`, `IdPagamento`, `Data`, `IdFrete`, `IdFilial`) VALUES (?,?,?,?,?,?,?,?,?)',
    [cliente, status,total,troco,observacao,pagamento, data, frete, filial]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from pedido');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarpedido', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from pessoa p where p.idpedido=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletapedido', async(req, res, next)=>{
    const {pedido} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from pedido p where p.idpedido=? ',[pedido]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{

    const [rows] = await Banco.connection.promise().execute('delete from pedido');
    res.status(200).json('Registros apagados')
})



module.exports = router