const mysql = require('mysql2');

// criar conexão com a base de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'easyfood',
  port: '3308',
  namedPlaceholders: true
});
//Funçao para testar a conexão
async function testaconexao() {
  const teste = await connection.connect();
  return 'Banco conectado!';
}


module.exports = { testaconexao, connection }
