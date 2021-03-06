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
router.get('/login', async(req,res,next)=>{
    const {email, password}=req.body;
    const [rows] = await Banco.connection.promise().execute('select u.Iduser from user u where email=? and Password=?', [email,password]);
    const user = rows;
    if(rows.length){
        const [rows] = await Banco.connection.promise().execute('SELECT f.IdFilial from user u inner join filial f on u.IdPessoa= f.IdPessoa where u.Email=? and u.Password=?',[email,password]);
        if(rows.length){
        res.status(200).json({login:user,rows});
    }else{
        res.json({login:user});
    }
}else{
    res.status(406).json({erro:"Nao encontrado"});
    }

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