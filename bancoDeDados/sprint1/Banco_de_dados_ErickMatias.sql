CREATE DATABASE DataCooling;
USE DataCooling;

CREATE TABLE cadastroEmpresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(80) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
emailEmpresa VARCHAR(60) NOT NULL UNIQUE, CONSTRAINT chkEmailEmpresa CHECK (emailEmpresa LIKE ('%@%')),
senhaEmpresa VARCHAR(20) NOT NULL,
telefone CHAR(12),
cep CHAR(8) NOT NULL
);

CREATE TABLE cadastroAfiliados (
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

-- Inserção de registros

INSERT INTO cadastroEmpresa VALUES
	(null, 'Clebinho Datacenter', '01234567890001', 'cleber@clebinhocenter.com', 'cleber1234', null, '01001001'),
    (null, 'Datacenter guib', '01234567890002', 'guibao@guibcenter.com', 'guib1234', null, '01001002'),
    (null, 'Rogers Datacenter', '01234567890003', 'rodrigo@rogercenter.com', 'roger1234', null, '01001003');
    
INSERT INTO cadastroAfiliados VALUES
	(null, 'Larissa Machado', '12345678901', '5511900001234', 'larissa.machado@clebinhocenter.com', 'larissa1234'),
    (null, 'Leonardo Machado', '12345678902', '5511900005678', 'leonardo.machado@clebinhocenter.com', 'leonardo1234'),
    (null, 'Camila Furtado', '12345678903', '5511912340000', 'camila.furtado@guibcenter.com', 'camila1234'),
    (null, 'Caroline Gomes', '12345678904', null, 'caroline.gomes@guibcenter.com', 'caroline1234'),
    (null, 'Renata Silva', '12345678905', '5511956780000', 'renata.silva@rogercenter.com', 'renata5678'),
    (null, 'Larissa Machado', '12345678906', null, 'larissa.machado@rogercenter.com', 'larissa5678');
    
INSERT INTO sensor VALUES
	(null, 'DHT11', 'Clebinho Datacenter', '01', 'ativo'),
    (null, 'DHT11', 'Clebinho Datacenter', '02', 'ativo'),
    (null, 'DHT11', 'Datacenter guib', null, 'manutenção'),
    (null, 'DHT11', 'Datacenter guib', '05', 'ativo'),
    (null, 'DHT11', 'Datacenter guib', '02', 'inativo'),
    (null, 'DHT11', 'Rogers Datacenter', '01', 'ativo');
    
INSERT INTO dados VALUES
	(null, 1, 24, 50, '2023-03-10 22:20:00'),
    (null, 1, 23.5, 50, '2023-03-10 22:21:00'),
    (null, 2, 24, 49, '2023-03-10 22:20:00'),
    (null, 2, 24, 49, '2023-03-10 22:21:00'),
    (null, 4, 26, 51, '2023-03-10 22:20:00'),
    (null, 5, null, null, '2023-03-10 22:20:00'),
    (null, 6, 45.1, 47, '2023-03-10 22:20:00'),
    (null, 6, 46, 47, '2023-03-10 22:21:00');
    
-- Consulta de dados

/* Consultar todos os dados das tabelas */ 
SELECT * FROM cadastroEmpresa;
SELECT * FROM cadastroAfiliados;
SELECT * FROM sensor;
SELECT * FROM dados;

/* Consultar local de determinada empresa */
SELECT cep FROM cadastroEmpresa WHERE cnpj = '01234567890002';
SELECT cep FROM cadastroEmpresa WHERE cnpj IN ('01234567890001', '01234567890003');

/* Consultar possíveis meios de contato com a empresa */
SELECT emailEmpresa, telefone FROM cadastroEmpresa WHERE cnpj = '01234567890003';

/* Consultar todos os afiliados de uma empresa específica */
SELECT * FROM cadastroAfiliados WHERE emailAfiliado LIKE '%@clebinhocenter.com';

/* Consultar meios de contato dos afiliados de uma empresa específica */
SELECT emailAfiliado, celular FROM cadastroAfiliados WHERE emailAfiliado LIKE '%@rogercenter.com';

/* Consultar sensores ativos, inativos ou em manutenção */
SELECT * FROM sensor WHERE statusSensor = 'Ativo';
SELECT * FROM sensor WHERE statusSensor = 'Inativo';
SELECT * FROM sensor WHERE statusSensor = 'Manutenção';

/* Consultar qual empresa o sensor pertence */
SELECT empresaSensor FROM sensor WHERE idSensor IN (1, 3);

/* Consultar alocação do sensor e seu status em determinada empresa */
SELECT setorDeAlocação, statusSensor FROM sensor WHERE empresaSensor = 'Datacenter guib';

/* Consultar dados captados pelo sensor de uma só empresa */
SELECT * FROM dados WHERE idSensor IN (3, 4, 5);

/* Consultar dados onde a temperatura ou umidade está "perigosa" */
SELECT * FROM dados WHERE temperatura > 27 OR umidade >= 65;

/* Consultar dados onde a temperatura ou umidade está ideal */
SELECT * FROM dados WHERE temperatura >= 23 AND temperatura <= 27 OR umidade > 35 AND umidade < 65;

/* Consultar dados onde a temperatura ou umidade está baixa */
SELECT * FROM dados WHERE temperatura < 23 OR umidade <= 35;



