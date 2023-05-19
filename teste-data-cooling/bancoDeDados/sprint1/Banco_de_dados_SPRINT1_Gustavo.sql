/*Criando um banco de dados sprint1*/
CREATE DATABASE sprint1;
/*usando o banco de dados sprint1*/
USE sprint1;

/*Criando a tabela cadastroPessoaFisica com os valores de campo*/
CREATE TABLE cadastroPessoaFisica(
idPessoaFi int primary key auto_increment ,
nome varchar(50) not null,
endereco varchar(50) not null,
nomeEmpresa varchar(50) not null,
cpf varchar(11) not null,
telefone varchar(11),
email varchar(40)not null
);

/*Criando a tabela cadastroPessoaJuridica com os valores de campo*/
CREATE TABLE cadastroPessoaJuridica(
idPessoaJuri int primary key auto_increment,
nome varchar(50) not null,
nomeEmpresa varchar(50) not null,
cnpj varchar(20) not null,
municipio varchar(20) not null,
cidade varchar (20) not null,
estado varchar (20) not null,
endereco varchar(50) not null,
email varchar (20) not null,
telefone varchar (20) not null
);
/*Criando a tabela sensores com os valores de campo*/
CREATE TABLE sensores(
idSensor int primary key auto_increment,
setor varchar(5),
nomeSensor varchar (30),
statusSensor varchar(50),
constraint chkStatusSensor check(statusSensor in('ativo','inativo','manutencao'))
);
/*Criando a tabela dadoSensor com os valores de campo*/
CREATE TABLE dadoSensor( 
idDadoSensor int primary key auto_increment,
setor varchar(5),
nomeSensor varchar(30),
temperatura double,
umidade double
);

/*inserindo dados na tabela cadastroPessoaFisica*/
insert into cadastroPessoaFisica values
(null, 'Beatriz '  ,'Av. Nove de Julho 3186' ,'C6 Bank'     ,'1234567891,','40028922','c6bank@gmail.com'),
(null, 'Fabio'     ,'Av. Eusébio Matoso 1375','Stefanini'   ,'1234567890' ,'40028923','stefanini@gmail.com'),
(null, 'Raimunda'  ,'Av. Pompéia 1380'       ,'Linx'        ,'1234567892' ,'40028954','linx@gmail.com'),
(null, 'Ronaldinho','Rua Haddock Lobo 595'   ,'Box Delivery','1234567894' ,'40028456','boxdelivery@gmail.com');

/*inserindo dados na tabela cadastroPessoaJuridica*/
insert into cadastroPessoaJuridica values
(null,'Albert'      ,'Steam'      ,'0123456' ,'São Paulo','São Paulo', 'SP','Rua C','steam@gmail.com','440028977'),
(null,'Jordan'      ,'Xbox'       ,'56734529','São Paulo','São Paulo', 'SP','Rua A','xbox@gmail.com' ,'40028985' ),
(null,'Pelé'        ,'Playstation','09786457','São Paulo','São Paulo', 'SP','Rua B','playn@gmail.com','400324567'),
(null,'Lebron James','Microsoft'  ,'4567893' ,'São Paulo','São Paulo', 'SP','Rua C','micro@gmail.com','400987356');

/*inserindo dados na tabela dadoSensor*/
insert into dadoSensor values
(null, 'St1', 'HDT11', 34, 54),
(null, 'St2', 'HDT11', 36, 12),
(null, 'St3', 'HDT11', 20, 20),
(null, 'St4', 'HDT11', 10, 35);

/*inserindo dados na tabela sensores*/
insert into sensores values
(null,'st1','HDT11','ativo'),
(null,'st2','HDT11','inativo'),
(null,'st3','HDT11','ativo'),
(null,'st4','HDT11','manutencao');

/*conferindo os dados das respectivas tabelas*/
select*from sensores;
select*from dadoSensor;
select*from cadastroPessoaJuridica;
select*from cadastroPessoaFisica;