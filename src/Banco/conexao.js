const mysql = require('mysql2');

// criar conexão com a base de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'easyfood',
  port: '3306',
  namedPlaceholders: true
});
//Funçao para testar a conexão
async function testaconexao() {
  const teste = await connection.connect();
  return 'Conexão realizada';
}


module.exports = { testaconexao, connection }
