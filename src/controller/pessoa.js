import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {nome,cpf,telefone,endereco} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `pessoa`( `Nome`, `cpf`, `Telefone`, `IdEndereco`) VALUES (?,?,?,?)',
    [nome,cpf,telefone,endereco]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from pessoa');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from pessoa p where p.idpessoa=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletapessoa', async(req, res, next)=>{
    const {pessoa} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from pessoa p where p.idpessoa=? ',[pessoa]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{

    const [rows] = await Banco.connection.promise().execute('delete from pessoa');
    res.status(200).json('Registros apagados')
})



module.exports = router