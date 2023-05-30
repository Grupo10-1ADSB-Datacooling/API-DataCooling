CREATE DATABASE DataCooling;
USE DataCooling;

CREATE TABLE cadastroDaEmpresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(80) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
emailEmpresa VARCHAR(60) NOT NULL UNIQUE, CONSTRAINT chkEmailEmpresa CHECK (emailEmpresa LIKE ('%@%')),
senhaEmpresa VARCHAR(20) NOT NULL,
telefone CHAR(12),
cep CHAR(8) NOT NULL
);

CREATE TABLE cadastroDeAfiliados (
idAfiliado INT PRIMARY KEY AUTO_INCREMENT,
nomeAfiliado VARCHAR(80) NOT NULL,
cpfAfiliado CHAR(11) NOT NULL UNIQUE,
celular CHAR(13),
emailAfiliado VARCHAR(60) NOT NULL UNIQUE, CONSTRAINT chkEmailAfiliado CHECK (emailAfiliado LIKE ('%@%')),
senhaAfiliado VARCHAR(20) NOT NULL
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
tipoSensor CHAR(5), CONSTRAINT chkTipoSensor CHECK (tipoSensor IN('DHT11')),
empresaSensor VARCHAR(80),
setorDeAlocação CHAR(2),
statusSensor VARCHAR(15), CONSTRAINT chkStatusSensor CHECK (statusSensor IN ('ativo', 'inativo', 'manutenção'))
);

CREATE TABLE dados (
idDados INT PRIMARY KEY AUTO_INCREMENT,
idSensor INT,
temperatura DOUBLE,
umidade DOUBLE,
medMinuto DATETIME
);

INSERT INTO cadastroDaEmpresa VALUES
	(null, 'zezinho Datacenter', '01234567890001', 'zezinho@zezinhocenter.com', 'zezinho1234', null, '01001001'),
    (null, 'Datacenter lilo', '01234567890002', 'lilo@lilocenter.com', 'lilo1234', null, '01001002'),
    (null, 'carlos Datacenter', '01234567890003', 'carlos@rogercenter.com', 'carlos1234', null, '01001003');

	SELECT * FROM cadastroDaEmpresa;

INSERT INTO cadastroDeAfiliados VALUES
	(null, 'cristiano ronaldo', '12345678901', '5511900001234', 'cristiano.ronaldo@zezinhocenter.com', 'cris1234'),
    (null, 'calleri', '12345678902', '5511900005678', 'calleri.spfc@zezinhocenter.com', 'calleri1234'),
    (null, 'deyverson', '12345678903', '5511912340000', 'deyverson.sccp@lilocenter.com', 'deyvin1234'),
    (null, 'gustavo gomes', '12345678904', null, 'gustavo.gomes@lilocenter.com', 'deyvin1234'),
    (null, 'bernardo silva', '12345678905', '5511956780000', 'bernardo.silva@carloscenter.com', 'bernardo5678'),
    (null, 'erick cantona', '12345678906', null, 'erick.cantona@rogercenter.com', 'erick5678');

	SELECT * FROM cadastroDeAfiliados;

INSERT INTO sensor VALUES
	(null, 'DHT11', 'zezinho Datacenter', '01', 'ativo'),
    (null, 'DHT11', 'zezinho Datacenter', '02', 'ativo'),
    (null, 'DHT11', 'Datacenter lilo', null, 'manutenção'),
    (null, 'DHT11', 'Datacenter lilo', '05', 'ativo'),
    (null, 'DHT11', 'carlos guib', '02', 'inativo'),
    (null, 'DHT11', 'carlos Datacenter', '01', 'ativo');

	SELECT * FROM sensor;

INSERT INTO dados VALUES
	(null, 1, 24, 50, '2023-03-10 22:20:00'),
    (null, 1, 23.5, 50, '2023-03-10 22:21:00'),
    (null, 2, 24, 49, '2023-03-10 22:20:00'),
    (null, 2, 24, 49, '2023-03-10 22:21:00'),
    (null, 4, 26, 51, '2023-03-10 22:20:00'),
    (null, 5, null, null, '2023-03-10 22:20:00'),
    (null, 6, 45.1, 47, '2023-03-10 22:20:00'),
    (null, 6, 46, 47, '2023-03-10 22:21:00');
    
	SELECT * FROM dados;

SELECT cep FROM cadastroDaEmpresa WHERE cnpj = '01234567890002';
SELECT cep FROM cadastroDaEmpresa WHERE cnpj IN ('01234567890001', '01234567890003');
SELECT emailEmpresa, telefone FROM cadastroDaEmpresa WHERE cnpj = '01234567890003';

SELECT * FROM sensor WHERE statusSensor = 'Ativo';
SELECT * FROM sensor WHERE statusSensor = 'Inativo';
SELECT * FROM sensor WHERE statusSensor = 'Manutenção';
