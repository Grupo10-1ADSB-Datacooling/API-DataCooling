/* REGRA DE NEGÓCIO

	* PLANO PARA EMPRESA:
    
		UM PLANO PODE SER ADQUIRIDO POR MUITAS EMPRESAS;
		UMA EMPRESA SÓ PODE ADQUIRIR UM PLANO;
        
        RELAÇÃO 1:N
        
	* USUÁRIO PARA CARGO
    
		UM CARGO PODE SER DE MUITOS USUÁRIOS;
		UM USUÁRIO SÓ PODE TER UM CARGO;
        
        RELAÇÃO 1:N
        
    * EMPRESA PARA USUÁRIO:
    
		UMA EMPRESA PODE TER MUITOS USUÁRIOS;
		UM USUÁRIO SÓ PODE SER DE UMA EMPRESA;
        
        RELAÇÃO 1:N
        
	* EMPRESA PARA SENSOR
	
		UMA EMPRESA PODE TER MUITOS SENSORES;
		UM SENSOR SÓ PODE SER DE UMA EMPRESA;
        
        RELAÇÃO 1:N
    
    * SENSOR PARA SETOR
    
		UM SETOR/LOCAL PODE TER VÁRIOS SENSORES;
		UM SENSOR SÓ PODE ESTAR EM UM SETOR/LOCAL;
        
        RELAÇÃO 0:N
    
    * SENSOR PARA REGISTRO
    
		UM SENSOR PODE TER MUITOS REGISTROS;
		UM REGISTRO SÓ PODE SER DE UM SENSOR;
        
        RELAÇÃO 0:N

*/

-- CRIANDO O BANCO DE DADOS

	CREATE DATABASE DataCooling;

-- SELECIONANDO O BANCO DE DADOS

	USE DataCooling;
    
-- TABELA DOS PLANOS

	CREATE TABLE Plano (
    idPlano INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    CONSTRAINT chkNome CHECK (nome IN ('Basic', 'Padrão', 'Premium'))
    );

-- INSERÇÃO DE REGISTROS NA TABELA PLANO

	INSERT INTO Plano VALUES
		(null, 'Basic'),
		(null, 'Padrão'),
		(null, 'Premium');
        
-- EXIBINDO OS DADOS DA TABELA DE PLANOS

	SELECT * FROM Plano;

-- TABELA DA EMPRESA

	CREATE TABLE cadastroEmpresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	razaoSocial VARCHAR(45) NOT NULL,
	cnpj CHAR(14) NOT NULL UNIQUE,
	email VARCHAR(45) NOT NULL UNIQUE, CONSTRAINT chkEmailEmpresa CHECK (email LIKE ('%@%')),
	senha VARCHAR(45) NOT NULL,
	telFixo CHAR(12),
	cep CHAR(9) NOT NULL,
    fkPlano INT,
    CONSTRAINT fkPlano FOREIGN KEY (fkPlano) REFERENCES Plano(idPlano)
	);
    
-- INSERÇÃO DE REGISTROS NA TABELA DE CADASTRO_EMPRESA

	INSERT INTO cadastroEmpresa VALUES
		(null, 'Clebinho Datacenter', '01234567890001', 'cleber@clebinhocenter.com', 'cleber1234', null, '01001001', 2),
		(null, 'Datacenter guib', '01234567890002', 'guibao@guibcenter.com', 'guib1234', null, '01001002', 1),
		(null, 'Rogers Datacenter', '01234567890003', 'rodrigo@rogercenter.com', 'roger1234', null, '01001003', 3);
        
-- EXIBINDO OS DADOS DA TABELA DE CADASTRO_EMPRESA

	SELECT * FROM cadastroEmpresa;
	
-- TABELA DE CARGOS DOS USUÁRIOS
	
    CREATE TABLE Cargo(
    idCargo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
    ) AUTO_INCREMENT = 50;
    
-- INSERÇÃO DE REGISTROS NA TABELA DE CARGOS

	INSERT INTO Cargo VALUES
		(null, 'Gerente de TI'),
		(null, 'Subgerente de TI'),
		(null, 'Arquiteto de TI');

-- EXIBINDO OS DADOS DA TABELA DE CARGOS

	SELECT * FROM Cargo;
    
-- TABELA DE PERFIS DA EMPRESA

	CREATE TABLE Usuario (
	idUsuario INT AUTO_INCREMENT,
	fkEmpresa INT,
	nome VARCHAR(45) NOT NULL,
	sobrenome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkCargo INT,
	CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES cadastroEmpresa(idEmpresa), -- FOREIGN KEY PARA IDENTIFICAR A EMPRESA QUE POSSUI O USUÁRIO
	CONSTRAINT fkCargo FOREIGN KEY (fkCargo) REFERENCES Cargo(idCargo), -- FOREIGN KEY PARA IDENTIFICAR O CARGO QUE O USUÁRIO ATUA
	CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkEmpresa) -- PRIMARY KEY COMPOSTA DOS CAMPOS FK_EMPRESA E ID_USUARIO
	)AUTO_INCREMENT = 10;

-- INSERÇÃO DE REGISTROS NA TABELA DE USUÁRIO

	INSERT INTO Usuario VALUES
		(null, 1, 'Marlos', 'Kalika', 'marlos.kalika@clebinhocenter.com', 'LeiteComMangaNaoFazMal', 50),
		(null, 1, 'Célia', 'Soares', 'celia.soares@clebinhocenter.com', '#CenterData', 51),
		(null, 2, 'Luíza', 'Venoza', 'luiza.venoza@guibcenter.com', 'SalonLine', 52),
		(null, 2, 'Luís', 'Barros', 'luis.barros@guibcenter.com', 'XampsonMoraes', 50),
		(null, 3, 'Cássio', 'Dias', 'cassio.dias@rogercenter.com', '51EhPinga', 51),
		(null, 3, 'Yuri', 'Martins', 'yuri.martins@rogercenter.com', 'PalmeirasNaoTemMundial', 50);
        
-- EXIBINDO OS DADOS DA TABELA DE USUÁRIO

	SELECT * FROM Usuario;
    
-- TABELA DOS SETORES

	CREATE TABLE Setor(
    idSetor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
    );
    
-- INSERÇÃO DE REGISTROS NA TABELA DE SETORES

	INSERT INTO Setor VALUES
		(null, 'Setor A'),
		(null, 'Setor B'),
		(null, 'Setor C');
    
-- EXIBINDO OS DADOS DA TABELA DOS SETORES

	SELECT * FROM Setor;

-- TABELA DO SENSOR

	CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	tipo CHAR(5), CONSTRAINT chkTipoSensor CHECK (tipo IN('DHT11')),
	statusSensor VARCHAR(15), CONSTRAINT chkStatusSensor CHECK (statusSensor IN ('Ativo', 'Inativo', 'Manutenção')), -- STATUS DO SENSOR PODENDO TER SOMENTE OS TRÊS VALORES DA CHECK
    fkSetor INT,
	fkEmpresa INT,
    CONSTRAINT fkSetorSensor FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor), -- FOREIGN KEY PARA IDENTIFICAR O SETOR QUE ESTÁ LOCALIZADO O SENSOR
	CONSTRAINT fkEmpresaSensor FOREIGN KEY (fkEmpresa) REFERENCES cadastroEmpresa(idEmpresa) -- FOREIGN KEY PARA IDENTIFICAR A EMPRESA QUE POSSUI O SENSOR
	) AUTO_INCREMENT = 100;

-- INSERÇÃO DE REGISTROS NA TABELA DE SENSOR

	INSERT INTO Sensor VALUES
		(null, 'DHT11', 'Ativo', 1, 1),
		(null, 'DHT11', 'Ativo', 2, 1),
		(null, 'DHT11', 'Manutenção', null, 2),
		(null, 'DHT11', 'Ativo', 2, 2),
		(null, 'DHT11', 'Inativo', 3, 2),
		(null, 'DHT11', 'Ativo', 1, 3),
		(null, 'DHT11', 'Inativo', 2, 3);

-- EXIBINDO OS DADOS DA TABELA DE SENSOR

	SELECT * FROM Sensor;

-- TABELA DOS REGISTROS(DADOS) DO SENSOR

	CREATE TABLE dadosSensor (
	dataHora DATETIME,
	fkSensor INT,
	temperatura DOUBLE,
	umidade DOUBLE,
	CONSTRAINT fkSensor FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor), -- FOREIGN KEY PARA IDENTIFICAR O SENSOR QUE CAPTA OS DADOS
	CONSTRAINT pkCompostaDados PRIMARY KEY (dataHora, fkSensor)
	) AUTO_INCREMENT = 1000;

-- INSERÇÃO DE REGISTRO NA TABELA DE DADOS_SENSOR

	INSERT INTO dadosSensor VALUES
		('2023-03-10 22:20:00', 100, 24, 50),
		('2023-03-10 22:21:00', 100, 23.5, 50),
		('2023-03-10 22:20:00', 101, 24, 49),
		('2023-03-10 22:21:00', 103, 24, 49),
		('2023-03-10 22:20:00', 103, 26, 51),
		('2023-03-10 22:20:00', 104, null, null),
		('2023-03-10 22:20:00', 105, 45.1, 47),
		('2023-03-10 22:21:00', 105, 46, 47),
		('2023-03-10 22:22:00', 106, null, null);

        
-- EXIBINDO OS DADOS DA TABELA DE DADOS_SENSOR

	SELECT * FROM dadosSensor;

-- EXIBINDO OS DADOS DAS QUATRO TABELAS SEPARADAMENTE
	
		SELECT * FROM Plano;

		SELECT * FROM cadastroEmpresa;
        
		SELECT * FROM Usuario;
        
        SELECT * FROM Setor;
        
		SELECT * FROM Sensor;
        
		SELECT * FROM dadosSensor;

-- EXIBINDO O CEP DAS EMPRESAS QUE POSSUEM DETERMINADO CNPJ

	SELECT cep FROM cadastroEmpresa WHERE cnpj = '01234567890002';
    
	SELECT cep FROM cadastroEmpresa WHERE cnpj IN ('01234567890001', '01234567890003');

-- EXBINDO O EMAIL E TELEFONE DA EMPRESA QUE POSSUI DETERMINADO CNPJ

	SELECT email, telFixo FROM cadastroEmpresa WHERE cnpj = '01234567890003';

-- EXIBINDO SENSORES ATIVOS, INATIVOS OU EM MANUTENÇÃO

	SELECT * FROM Sensor WHERE statusSensor = 'Ativo';
    
	SELECT * FROM Sensor WHERE statusSensor = 'Inativo';
    
	SELECT * FROM Sensor WHERE statusSensor = 'Manutenção';

-- EXIBINDO A EMPRESA A QUAL O SENSOR PERTENCE

	SELECT Sensor.idSensor, Empresa.razaoSocial AS razaoSocialEmpresa FROM Sensor
		JOIN cadastroEmpresa AS Empresa ON Sensor.fkEmpresa = Empresa.idEmpresa;

-- EXIBINDO A ALOCAÇÃO DO SENSOR E SEU STATUS DE DETERMINADA EMPRESA

	SELECT Setor.nome AS setorAlocacao, Sensor.statusSensor FROM Sensor 
		JOIN Setor ON Setor.idSetor = Sensor.fkSetor
		WHERE fkEmpresa = 1;

-- EXIBINDO OS DADOS DE UM SENSOR COM TEMPERATURA E UMIDADE ACIMA DO IDEAL

	SELECT * FROM dadosSensor WHERE temperatura > 27 OR umidade >= 65;

-- EXIBINDO OS DADOS DE UM SENSOR COM TEMPERATURA E UMIDADE IDEAL

	SELECT * FROM dadosSensor WHERE temperatura >= 23 AND temperatura <= 27 OR umidade > 35 AND umidade < 65;

-- EXIBINDO OS DADOS DE UM SENSOR TEMPERATURA E UMIDADE ABAIXO DO IDEAL

	SELECT * FROM dadosSensor WHERE temperatura < 23 OR umidade <= 35;
    
-- EXIBINDO OS DADOS DAS EMPRESAS JUNTO COM SEUS RESPECTIVOS PLANOS

	SELECT * FROM cadastroEmpresa
		JOIN Plano ON cadastroEmpresa.fkPlano = Plano.idPlano;
        
-- EXIBINDO O NOME DA EMPRESA E O NOME DO SEU PLANO 

	SELECT cadastroEmpresa.razaoSocial, Plano.nome AS nomePlano FROM cadastroEmpresa
		JOIN Plano ON cadastroEmpresa.fkPlano = Plano.idPlano;

-- EXIBINDO OS DADOS DAS EMPRESAS JUNTO COM SEUS RESPECTIVOS USUÁRIOS

	SELECT * FROM cadastroEmpresa 
		JOIN Usuario ON cadastroEmpresa.idEmpresa = Usuario.fkEmpresa;
		
-- EXIBINDO OS DADOS DAS EMPRESAS JUNTO COM SEUS RESPECTIVOS SENSORES

	SELECT * FROM cadastroEmpresa
		JOIN Sensor ON cadastroEmpresa.idEmpresa = Sensor.fkEmpresa;

-- EXIBINDO OS DADOS DOS USUÁRIOS JUNTO COM OS SEUS RESPECTIVOS CARGOS

	SELECT * FROM Usuario 	
		JOIN Cargo ON Usuario.fkCargo = Cargo.idCargo;
            
-- EXIBINDO OS DADOS DOS USUÁRIOS JUNTO COM OS DADOS DA EMPRESA E OS DADOS DOS PLANOS

	SELECT * FROM Usuario 
		JOIN cadastroEmpresa ON Usuario.fkEmpresa = cadastroEmpresa.idEmpresa
			JOIN Plano ON cadastroEmpresa.fkPlano = Plano.idPlano;

-- EXIBINDO OS DADOS DOS SENSORES JUNTO COM SEUS RESPECTIVOS REGISTROS

	SELECT * FROM Sensor
		JOIN dadosSensor ON Sensor.idSensor = dadosSensor.fkSensor;
        
-- EXIBINDO OS DADOS DOS SENSORES JUNTO COM SEUS RESPECTIVOS SENSORES

	SELECT * FROM Sensor 
		JOIN Setor ON Sensor.fkSetor = Setor.idSetor;
        
-- EXIBINDO OS DADOS DOS SENSORES JUNTO COM SEUS RESPECTIVOS SETORES E JUNTO COM OS SEUS RESPECTIVOS REGISTROS

	SELECT * FROM Sensor
		JOIN Setor ON Sensor.fkSetor = Setor.idSetor
			JOIN dadosSensor ON dadosSensor.fkSensor = Sensor.idSensor;