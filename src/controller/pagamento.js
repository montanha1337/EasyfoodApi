import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {nome,filial} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `pagamento`( `Nome`, `IdFilial`) VALUES (?,?)',
    [nome,filial]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from pagamento');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from pagamento p where p.idpagamento=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletapagamento', async(req, res, next)=>{
    const {pagamento} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from pagamento p where p.idpagamento=? ',[pagamento]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{

    const [rows] = await Banco.connection.promise().execute('delete from pagamento');
    res.status(200).json('Registros apagados')
})



module.exports = router