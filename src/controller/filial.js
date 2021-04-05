import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {empresa, gerente} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `filial`( `IdEmpresa`, `IdPessoa`) VALUES (?,?)',
    [empresa,gerente]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from filial');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from filial p where p.idfilial=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletafilial', async(req, res, next)=>{
    const {filial} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from filial p where p.idfilial=? ',[filial]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{

    const [rows] = await Banco.connection.promise().execute('delete from filial');
    res.status(200).json('Registros apagados')
})



module.exports = router