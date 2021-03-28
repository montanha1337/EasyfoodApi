import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {nome, telefone, cnpj, endereco} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `empresa`(`Nome`, `Telefone`, `Cnpj`, `IdEndereco`) VALUES (?,?,?,?)',
    [nome, telefone, cnpj, endereco]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from empresa');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from empresa p where p.idempresa=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletaempresa', async(req, res, next)=>{
    const {empresa} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from empresa p where p.idempresa=? ',[empresa]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{

    const [rows] = await Banco.connection.promise().execute('delete from empresa');
    res.status(200).json('Registros apagados')
})



module.exports = router