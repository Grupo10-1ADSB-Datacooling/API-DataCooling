CREATE database DataCooling;

USE DataCooling; 

CREATE TABLE CadastroPj
(id INT primary key auto_increment,
nomeEmpresa varchar (80) ,
email varchar (100) ,
senha varchar (20) ,
telefone char (12),
celular char (13) ,
cnpj char (14) ,
cep char (8) 
);

CREATE TABLE CadastroPf
(id INT primary key auto_increment,
nome varchar (80) ,
email varchar (100) ,
senha varchar (20) ,
telefone char (12),
celular char (13) ,
cpf char (11) ,
cep char (8) 
);

CREATE TABLE Sensores
(id INT primary key auto_increment,
tipoSensor char(5),
setor varchar(3),
statusSensor varchar(15), CONSTRAINT chkstatusSensor CHECK (statusSensor IN ('ativo', 'inativo', 'manutenção'))
);

CREATE TABLE Dados
(id INT primary key auto_increment,
temperatura DOUBLE,
umidade DOUBLE,
medMin datetime
);

INSERT INTO cadastropf VALUES
(null,'pedro','pedro.araujo@sptech.school','pedro123','123456789012',null,'12345678901','12345678');

INSERT INTO cadastropf VALUES
(null,'Nicolas','nicolas.prates@sptech.school','nick123','123456789012',null,'12345678901','12345678'),
(null,'Matheus','matheus.aguiar@sptech.school','math123','123456789012',null,'12345678901','12345678'),
(null,'Miguel','miguel.eduardo@sptech.school','migs123','123456789012',null,'12345678901','12345678'),
(null,'Vitor','vitor.ramos@sptech.school','vitor123','123456789012',null,'12345678901','12345678'),
(null,'Erick','erick.matias@sptech.school','erick123','123456789012',null,'12345678901','12345678'),
(null,'Gustavo','gustavo.jesus@sptech.school','nick123','123456789012',null,'12345678901','12345678');

INSERT INTO cadastropj VALUES
(null,'C6','c6@bank.br','12345C6','123456789012','1234567890123','12345678901234','12345678'),
(null,'Box','box@delivery.br','12345C6','123456789012','1234567890123','12345678901234','12345678'),
(null,'Stefanini','stefanini@grup.br','12345C6','123456789012','1234567890123','12345678901234','12345678'),
(null,'Bradesco','bradesco@bank.br','12345C6','123456789012','1234567890123','12345678901234','12345678');

INSERT INTO Sensores VALUES
(null,'DTH11','A','ativo',);

INSERT INTO Sensores VALUES
(null,'DTH11','B','inativo'),
(null,'DTH11','C','manutenção'),
(null,'XXX00','A','ativo'),
(null,'XXX00','B','manutenção'),
(null,'XXX00','C','inativo');

INSERT INTO Dados VALUES
(null,'300','7500','2023-03-10 22:51:00'),
(null,'375','6000','2023-03-10 22:51:00'),
(null,'400','4500','2023-03-10 22:51:00');

SELECT * FROM cadastropf;
SELECT * FROM cadastropj;
SELECT * FROM dados;
SELECT * FROM sensores;

