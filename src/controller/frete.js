import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {local,valor,filial} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `frete`(`Local`, `Valor`, `IdFilial`) VALUES (?,?,?)',
    [local,valor,filial]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from frete');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from frete p where p.idfrete=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletafrete', async(req, res, next)=>{
    const {frete} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from frete p where p.idfrete=? ',[frete]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{/////////////////////////////////////////////////Rotas do desenvolvedor

    const [rows] = await Banco.connection.promise().execute('delete from frete');
    res.status(200).json('Registros apagados')
})



module.exports = router