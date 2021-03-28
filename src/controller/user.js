import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {email, password, pessoa} = req.body
    const [rows] = await Banco.connection.promise().query('insert into user(email, password, IdPessoa) values (?,?,?)',[email, password,pessoa]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select u.iduser, u.email, u.password from user u');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select u.iduser, u.email, u.password from user u where u.iduser=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.put('/atualizasenha', async(req,res,next)=>{
    const {user, password}=req.body;
    const [rows] = await Banco.connection.promise().execute('update user set Password=? where Iduser=?', [password,user]);
    res.status(200).json("alterado com sucesso");
})
router.delete('/deletauser', async(req, res, next)=>{
    const {user} = req.body
    const teste = await Banco.connection.promise().execute('delete from user u where u.iduser=? ',[user]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{

    const rows = await Banco.connection.promise().execute('delete from user');
    res.status(200).json('Registros apagados')
})



module.exports = router