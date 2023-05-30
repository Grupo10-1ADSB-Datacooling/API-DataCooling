create database datacooling;
use datacooling;
CREATE TABLE cadCNPJ (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(80) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
emailEmpresa VARCHAR(60) NOT NULL UNIQUE, CONSTRAINT chkEmailEmpresa CHECK (emailEmpresa LIKE ('%@%')),
senhaEmpresa VARCHAR(20) NOT NULL,
telefone CHAR(12),
cep CHAR(8) NOT NULL
);
CREATE TABLE cadAfiliados (
idAfiliado INT PRIMARY KEY AUTO_INCREMENT,
nomeAfiliado VARCHAR(80) NOT NULL,
cpfAfiliado CHAR(11) NOT NULL UNIQUE,
celular CHAR(13),
emailAfiliado VARCHAR(60) NOT NULL UNIQUE, CONSTRAINT chkEmailAfiliado CHECK (emailAfiliado LIKE ('%@%')),
senhaAfiliado VARCHAR(20) NOT NULL
);
CREATE TABLE sensores (
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
INSERT INTO cadCNPJ VALUES
	(null, 'MCDatacenter', '01234567890001', 'MC@datacenter.com', 'mcdata1234', null, '01234567'),
    (null, 'DatacenterBK', '01234567890002', 'BK@datacenter.com', 'bkdata1234', null, '12345678'),
    (null, 'KFCDatacenter', '01234567890003', 'KFC@datacenter.com', 'kfc1234', null, '23456789');
INSERT INTO cadAfiliados VALUES
	(null, 'Roberto Carlos', '12345678901', '5511900001234', 'roberto@carlos.com', 'roberto1234'),
    (null, 'Rubens Barrichelo', '12345678902', '5511900005678', 'rubens@barrichelo.com', 'rubens1234'),
    (null, 'Ronaldo Gaucho', '12345678903', '5511912340000', 'ronaldo@gaucho.com', 'ronaldo1234'),
    (null, 'Xuxa Meneghel', '12345678904', null, 'xuxa@meneghel.com', 'xuxa1234'),
    (null, 'Tiago Leifert', '12345678905', '5511956780000', 'tiago@leifert.com', 'tiago5678'),
    (null, 'Marcos Mion', '12345678906', null, 'marcos@mion.com', 'mion5678');
INSERT INTO sensores VALUES
	(null, 'DHT11', 'MCDatacenter', '01', 'ativo'),
    (null, 'DHT11', 'MCDatacenter', '02', 'ativo'),
    (null, 'DHT11', 'DatacenterBK', null, 'manutenção'),
    (null, 'DHT11', 'DatacenterBK', '05', 'ativo'),
    (null, 'DHT11', 'DatacenterBK', '02', 'inativo'),
    (null, 'DHT11', 'KFCDatacenter', '01', 'ativo');
INSERT INTO dados VALUES
	(null, 1, 24, 50, '2023-03-10 22:20:00'),
    (null, 1, 23.5, 50, '2023-03-10 22:21:00'),
    (null, 2, 24, 49, '2023-03-10 22:20:00'),
    (null, 2, 24, 49, '2023-03-10 22:21:00'),
    (null, 4, 26, 51, '2023-03-10 22:20:00'),
    (null, 5, null, null, '2023-03-10 22:20:00'),
    (null, 6, 45.1, 47, '2023-03-10 22:20:00'),
    (null, 6, 46, 47, '2023-03-10 22:21:00');

SELECT * FROM cadCNPJ;
SELECT * FROM cadAfiliados;
SELECT * FROM sensores;
SELECT * FROM dados;

/* Consultar local de determinada empresa */
SELECT cep FROM cadCNPJ WHERE cnpj = '01234567890002';
SELECT cep FROM cadCNPJ WHERE cnpj IN ('01234567890001', '01234567890003');

/* Consultar possíveis meios de contato com a empresa */
SELECT emailEmpresa, telefone FROM cadCNPJ WHERE cnpj = '01234567890003';

/* Consultar todos os afiliados de uma empresa específica */
SELECT * FROM cadAfiliados WHERE emailAfiliado LIKE '%@mion.com';

/* Consultar meios de contato dos afiliados de uma empresa específica */
SELECT emailAfiliado, celular FROM cadAfiliados WHERE emailAfiliado LIKE '%@meneghel.com';

/* Consultar sensores ativos, inativos ou em manutenção */
SELECT * FROM sensores WHERE statusSensor = 'Ativo';
SELECT * FROM sensores WHERE statusSensor = 'Inativo';
SELECT * FROM sensores WHERE statusSensor = 'Manutenção';

/* Consultar qual empresa o sensor pertence */
SELECT empresaSensor FROM sensores WHERE idSensor IN (1, 3);

/* Consultar alocação do sensor e seu status em determinada empresa */
SELECT setorDeAlocação, statusSensor FROM sensores WHERE empresaSensor = 'DatacenterBK';

/* Consultar dados captados pelo sensor de uma só empresa */
SELECT * FROM dados WHERE idSensor IN (3, 4, 5);

/* Consultar dados onde a temperatura ou umidade está "perigosa" */
SELECT * FROM dados WHERE temperatura > 27 OR umidade >= 65;

/* Consultar dados onde a temperatura ou umidade está ideal */
SELECT * FROM dados WHERE temperatura >= 23 AND temperatura <= 27 OR umidade > 35 AND umidade < 65;

/* Consultar dados onde a temperatura ou umidade está baixa */
SELECT * FROM dados WHERE temperatura < 23 OR umidade <= 35;

