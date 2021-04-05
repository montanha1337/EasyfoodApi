import express from 'express'
import Banco from '../Banco/conexao'

const router = express.Router()

router.post('/cadastro', async (req, res, next) => {
    const { descricao, valor, nome, idcategoria, locimagem, idfilial } = req.body
    const [rows] = await Banco.connection.promise().query('INSERT INTO `produto`(`Descricao`, `Valor`, `Nome`, `IdCategoria`, `LocImagem`, `Bloqueado`, `IdFilial`) VALUES (?,?,?,?,?,0,?)', [descricao, valor, nome, idcategoria, locimagem, idfilial]);
    const texto = 'id:' + rows.insertId
    res.status(201).json([texto])
    next();//usado para ficar em standby
})
router.get('/buscartodos', async (req, res, next) => {
    const [rows] = await Banco.connection.promise().query('Select * from produto');
    res.status(200).json({ 'produtos': rows })
    next();//usado para ficar em standby
})
router.get('/buscarum', async (req, res, next) => {
    const { id } = req.body
    const [rows] = await Banco.connection.promise().query('Select * from produto p where p.idproduto=?', [id]);
    res.status(200).json(rows)
    next();//usado para ficar em standby
})

router.put('/atualizapreco', async (req, res, next) => {
    const { produto, preco } = req.body;
    const [rows] = await Banco.connection.promise().execute('update produto set valor=? where Idproduto=?', [preco, produto]);
    res.status(200).json("alterado com sucesso");
})
router.put('/atualizadescricao', async (req, res, next) => {
    const { produto, descricao } = req.body;
    const [rows] = await Banco.connection.promise().execute('update produto set Descricao=? where Idproduto=?', [descricao, produto]);
    res.status(200).json("alterado com sucesso");
})

router.delete('/deletaproduto', async (req, res, next) => {
    const { produto } = req.body
    const [rows] = await Banco.connection.promise().execute('delete from produto p where p.idproduto=? ', [produto]);
    res.status(200).json('Registro apagado')
})
router.delete('/apagatodos', async (req, res, next) => {

    const [rows] = await Banco.connection.promise().execute('delete from produto');
    res.status(200).json('Registros apagados')
})



module.exports = router