CREATE DATABASE DataCooling;
USE DataCooling;

CREATE TABLE CadastroPj(
idPj INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(80),
email VARCHAR(100),
senha VARCHAR(20),
telefone CHAR(12),
celular CHAR(13),
cnpj CHAR(14),
cep CHAR(8)
);

CREATE TABLE CadastroPf(
idPf INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80),
email VARCHAR(100),
senha VARCHAR(20),
telefone CHAR(12),
celular CHAR(13),
cpf CHAR(11),
cep CHAR(8)
);

CREATE TABLE Sensores(
idSensores INT PRIMARY KEY AUTO_INCREMENT,
tipoSensor CHAR(5),
setor VARCHAR(3),
statusSensor VARCHAR(15), CONSTRAINT chkstatus CHECK (statusSensor IN ('ativo', 'inativo', 'manutenção'))
);

CREATE TABLE Dados(
idDados INT PRIMARY KEY AUTO_INCREMENT,
temperatura DOUBLE,
umidade DOUBLE,
medMin DATETIME
);

INSERT INTO cadastroPf VALUES
	(NULL, 'Vitor', 'vitor.rsilva@sptech.school', 'senha', '123456789012', NULL, '12345678901', '12345678');
    
INSERT INTO cadastropf VALUES
	(NULL,'Nicolas','nicolas.prates@sptech.school','senha','123456789012',NULL,'12345678901','12345678'),
	(NULL,'Matheus','matheus.aguiar@sptech.school','senha','123456789012',NULL,'12345678901','12345678'),
	(NULL,'Miguel','miguel.eduardo@sptech.school','senha','123456789012',NULL,'12345678901','12345678'),
	(NULL,'Pedro','pedro.araujo@sptech.school','senha','123456789012',NULL,'12345678901','12345678'),
	(NULL,'Erick','erick.matias@sptech.school','senha','123456789012',NULL,'12345678901','12345678'),
	(NULL,'Gustavo','gustavo.jesus@sptech.school','senha','123456789012',NULL,'12345678901','12345678');

INSERT INTO cadastroPj VALUES
	(NULL,'C6','c6@bank.br','12345C','123456789012','1234567890123','12345678901234','12345678'),
	(NULL,'Box','box@delivery.br','12345B','123456789012','1234567890123','12345678901234','12345678'),
	(NULL,'Stefanini','stefanini@grup.br','12345S','123456789012','1234567890123','12345678901234','12345678'),
	(NULL,'Bradesco','bradesco@bank.br','12345B','123456789012','1234567890123','12345678901234','12345678');
    
INSERT INTO Sensores VALUES
	(NULL,'DTH11','A','ativo');
    
INSERT INTO Sensores VALUES
	(NULL,'DTH11','A','ativo'),
	(NULL,'DTH11','C','manutenção'),
	(NULL,'DTH11','B','inativo'),
	(NULL,'DTH11','B','inativo'),
	(NULL,'DTH11','C','manutenção');
    
INSERT INTO Dados VALUES
	(NULL,'303','7400','2023-03-10 00:00:00'),
	(NULL,'362','4509','2023-03-10 00:00:00'),
	(NULL,'404','8000','2023-03-10 00:00:00');
    
SELECT * FROM cadastroPf;
SELECT * FROM cadastroPj;
SELECT * FROM Dados;
SELECT * FROM Sensores;




    




    



    


