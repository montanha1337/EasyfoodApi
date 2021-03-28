-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Tempo de geração: 14-Mar-2021 às 15:45
-- Versão do servidor: 8.0.18
-- versão do PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `easyfood`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `IdCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`IdCategoria`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `IdEmpresa` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Telefone` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Cnpj` varchar(14) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `IdEndereco` int(11) NOT NULL,
  PRIMARY KEY (`IdEmpresa`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco`
--

DROP TABLE IF EXISTS `endereco`;
CREATE TABLE IF NOT EXISTS `endereco` (
  `IdEndereco` int(11) NOT NULL AUTO_INCREMENT,
  `Cep` varchar(8) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Bairro` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Numero` int(11) NOT NULL,
  `Rua` varchar(100) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Cidade` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Complemento` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `PontoReferencia` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`IdEndereco`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `filial`
--

DROP TABLE IF EXISTS `filial`;
CREATE TABLE IF NOT EXISTS `filial` (
  `IdFilial` int(11) NOT NULL AUTO_INCREMENT,
  `IdEmpresa` int(11) NOT NULL,
  `IdPessoa` int(11) NOT NULL,
  PRIMARY KEY (`IdFilial`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `frete`
--

DROP TABLE IF EXISTS `frete`;
CREATE TABLE IF NOT EXISTS `frete` (
  `IdFrete` int(11) NOT NULL AUTO_INCREMENT,
  `Local` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Valor` double NOT NULL,
  `IdFilial` int(11) NOT NULL,
  PRIMARY KEY (`IdFrete`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pagamento`
--

DROP TABLE IF EXISTS `pagamento`;
CREATE TABLE IF NOT EXISTS `pagamento` (
  `IdPagamento` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `IdFilial` int(11) NOT NULL,
  PRIMARY KEY (`IdPagamento`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidoc`
--

DROP TABLE IF EXISTS `pedidoc`;
CREATE TABLE IF NOT EXISTS `pedidoc` (
  `IdPedido` int(11) NOT NULL AUTO_INCREMENT,
  `Iduser` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `Total` double NOT NULL,
  `Troco` double NOT NULL,
  `Observacao` varchar(100) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `IdPagamento` int(11) NOT NULL,
  `Data` date NOT NULL,
  `IdFrete` int(11) NOT NULL,
  `IdFilial` int(11) NOT NULL,
  PRIMARY KEY (`IdPedido`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
CREATE TABLE IF NOT EXISTS `pessoa` (
  `IdPessoa` int(11) NOT NULL,
  `Nome` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Telefone` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `IdEndereco` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

DROP TABLE IF EXISTS `produto`;
CREATE TABLE IF NOT EXISTS `produto` (
  `IdProduto` int(11) NOT NULL,
  `Descricao` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Valor` double NOT NULL,
  `Nome` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `IdCategoria` int(11) NOT NULL,
  `LocImagem` varchar(200) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Bloqueado` tinyint(1) NOT NULL DEFAULT '0',
  `IdFilial` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtoi`
--

DROP TABLE IF EXISTS `produtoi`;
CREATE TABLE IF NOT EXISTS `produtoi` (
  `IdPedidoI` int(11) NOT NULL AUTO_INCREMENT,
  `IdPedido` int(11) NOT NULL,
  `IdProduto` int(11) NOT NULL,
  `Quantidade` double NOT NULL,
  PRIMARY KEY (`IdPedidoI`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `Iduser` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `Password` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `IdPessoa` int(11) NOT NULL,
  PRIMARY KEY (`Iduser`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`Iduser`, `Email`, `Password`, `IdPessoa`) VALUES
(1, 'teste@teste.com', 'matheus1', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
