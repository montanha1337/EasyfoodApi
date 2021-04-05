import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async(req, res, next)=> {
   const {cep,bairro,numero,rua,cidade,complemento,referencia} = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `endereco`(`Cep`, `Bairro`, `Numero`, `Rua`, `Cidade`, `Complemento`, `PontoReferencia`) VALUES (?,?,?,?,?,?,?)',
    [cep,bairro,numero,rua,cidade,complemento,referencia]);
    const texto = 'id:'+rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async(req, res, next)=>{
    const [rows] = await Banco.connection.promise().query('Select * from endereco');
    res.status(200).json(rows)
    next();//usado para ficar em standby
})
router.get('/buscarum', async(req, res, next)=>{
    const {id} = req.body
    const [rows] = await Banco.connection.promise().query('Select * from endereco p where p.idendereco=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.delete('/deletaendereco', async(req, res, next)=>{
    const {endereco} = req.body
    const [rows] = await Banco.connection.promise().execute('delete from endereco p where p.idendereco=? ',[endereco]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async(req, res, next)=>{/////////////////////////////////////////////////Rotas do desenvolvedor

    const [rows] = await Banco.connection.promise().execute('delete from endereco');
    res.status(200).json('Registros apagados')
})



module.exports = router