import express from 'express'
import Banco from '../Banco/conexao'
const router = express.Router()


router.get('/', (req, res)=> { // Rota de teste para testar a rota.
    res.json('Backend  Online!!')
})
router.get('/conexaobanco',async(req, res)=>{ // rota de teste para testar a conexão do banco via rota.
    const conexao= await Banco.testaconexao()
    res.json(conexao)
})

module.exports = router