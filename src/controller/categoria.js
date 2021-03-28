import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {categoria} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `categoria`(`Nome`) VALUES (?)',
    [categoria]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from categoria');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from categoria p where p.idcategoria=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletacategoria', async(req, res, next)=>{
    const {categoria} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from categoria p where p.idcategoria=? ',[categoria]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{

    const [rows] = await Banco.connection.promise().execute('delete from categoria');
    res.status(200).json('Registros apagados')
})



module.exports = router