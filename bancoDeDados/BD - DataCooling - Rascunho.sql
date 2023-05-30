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

	update cadastroEmpresa set telFixo = '(11) 3820-2990' where idEmpresa = 6;

        SELECT Plano.nome AS nomePlano, idEmpresa, razaoSocial, email, cnpj, cep, telFixo FROM cadastroEmpresa JOIN Plano ON Plano.idPlano = cadastroEmpresa.fkPlano;
        SELECT * FROM Plano JOIN cadastroEmpresa ON Plano.idPlano = cadastroEmpresa.fkPlano WHERE email = 'admin@bambam.datacenter' AND senha = '#Kb0123';


	CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	razaoSocial VARCHAR(45) NOT NULL,
	cnpj CHAR(14) NOT NULL UNIQUE,
	telFixo CHAR(14),
	cep CHAR(9) NOT NULL,
    numero INT NOT NULL,
    fkPlano INT,
    CONSTRAINT fkPlano FOREIGN KEY (fkPlano) REFERENCES Plano(idPlano)
	);
        
-- INSERÇÃO DE REGISTROS NA TABELA DE EMPRESA

	INSERT INTO Empresa VALUES
		(null, 'Clebinho Datacenter', '01234567890001', 'cleber@clebinhocenter.com', 'cleber1234', null, '01001001', 2),
		(null, 'Datacenter guib', '01234567890002', 'guibao@guibcenter.com', 'guib1234', null, '01001002', 1),
		(null, 'Rogers Datacenter', '01234567890003', 'rodrigo@rogercenter.com', 'roger1234', null, '01001003', 3);
        
-- EXIBINDO OS DADOS DA TABELA DE EMPRESA

	SELECT * FROM cadastroEmpresa;
    
-- TABELA DE PERFIS DA EMPRESA

	CREATE TABLE Usuario (
	idUsuario INT AUTO_INCREMENT,
	fkEmpresa INT,
	nome VARCHAR(45) NOT NULL,
	sobrenome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
	CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa), -- FOREIGN KEY PARA IDENTIFICAR A EMPRESA QUE POSSUI O USUÁRIO
	CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkEmpresa), -- PRIMARY KEY COMPOSTA DOS CAMPOS FK_EMPRESA E ID_USUARIO
    UNIQUE KEY (email)
	)AUTO_INCREMENT = 10;

-- INSERÇÃO DE REGISTROS NA TABELA DE USUÁRIO

	INSERT INTO Usuario VALUES
		(null, 1, 'Marlos', 'Kalika', 'marlos.kalika@clebinhocenter.com', 'LeiteComMangaNaoFazMal'),
		(null, 1, 'Célia', 'Soares', 'celia.soares@clebinhocenter.com', '#CenterData'),
		(null, 2, 'Luíza', 'Venoza', 'luiza.venoza@guibcenter.com', 'SalonLine'),
		(null, 2, 'Luís', 'Barros', 'luis.barros@guibcenter.com', 'XampsonMoraes'),
		(null, 3, 'Cássio', 'Dias', 'cassio.dias@rogercenter.com', '51EhPinga'),
		(null, 3, 'Yuri', 'Martins', 'yuri.martins@rogercenter.com', 'PalmeirasNaoTemMundial');
        
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
		(null, 'Setor C'),
		(null, 'Setor D');
        
-- EXIBINDO OS DADOS DA TABELA DOS SETORES

	SELECT * FROM Setor;
    
            SELECT nome AS nomeSetor, idSensor, tipo, statusSensor FROM Setor RIGHT JOIN Sensor ON Sensor.fkSetor = Setor.idSetor  WHERE fkEmpresa = 6 ;


-- TABELA DO SENSOR

	CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	tipo CHAR(5), CONSTRAINT chkTipoSensor CHECK (tipo IN('DHT11')),
	statusSensor VARCHAR(15), CONSTRAINT chkStatusSensor CHECK (statusSensor IN ('Ativo', 'Inativo', 'Manutenção')), -- STATUS DO SENSOR PODENDO TER SOMENTE OS TRÊS VALORES DA CHECK
    fkSetor INT,
	fkEmpresa INT,
    CONSTRAINT fkSetorSensor FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor), -- FOREIGN KEY PARA IDENTIFICAR O SETOR QUE ESTÁ LOCALIZADO O SENSOR
	CONSTRAINT fkEmpresaSensor FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) -- FOREIGN KEY PARA IDENTIFICAR A EMPRESA QUE POSSUI O SENSOR
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

	INSERT INTO Sensor VALUES
		(112, 'DHT11', 'Ativo', 1, 6),
		(113, 'DHT11', 'Ativo', 2, 6),
		(114, 'DHT11', 'Ativo', 3, 6),
		(115, 'DHT11', 'Manutenção', null, 6);

select * from sensor;

-- EXIBINDO OS DADOS DA TABELA DE SENSOR

	SELECT * FROM Sensor;
    
    select temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from setor
	        join sensor on sensor.fkSetor = setor.idSetor
		        join dadosSensor on dadosSensor.fkSensor = sensor.idSensor
			        where fkSensor = 107 order by dataHora desc limit 5;


select fkSensor, temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from setor
	        join sensor on sensor.fkSetor = setor.idSetor
		        right join dadosSensor on dadosSensor.fkSensor = sensor.idSensor
			        where fkSensor = 114 order by dataHora desc limit 4;

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
		('2023-03-10 22:20:53', 112, 24, 50),
		('2023-03-10 22:21:5', 114, 23.5, 50),
		('2023-03-10 22:20:2', 113, 24, 49),
		('2023-03-10 22:21:25', 112, 24, 49),
		('2023-03-10 22:20:06', 113, 26, 51),
		('2023-03-10 22:20:10', 114, 45.1, 47),
		('2023-03-10 22:21:20', 112, 46, 47);
        
	INSERT INTO dadosSensor VALUES
		('2023-05-27 22:01:00', 114, 23.5, 50),
		('2023-05-27 22:01:01', 114, 24, 49),
		('2023-05-27 22:01:02', 114, 24, 49),
		('2023-05-27 22:01:03', 114, 26, 51),
		('2023-05-27 22:01:04', 115, null, null),
		('2023-05-27 22:01:05', 114, 45.1, 47),
		('2023-05-27 22:01:06', 114, 46, 47),
		('2023-05-27 22:01:07', 115, null, null);
        
        insert into dadosSensor values
			(now(), 114, 50, 100);
            
            select statusSensor, temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s'), nome, fkSensor as momento_grafico from setor
        right join sensor on sensor.fkSetor = setor.idSetor
            right join dadosSensor on dadosSensor.fkSensor = sensor.idSensor
                where fkSensor = 114 order by dataHora desc limit 1;
            
            select * from setor;
            
        select temperatura, umidade, DATE_FORMAT(dataHora, '%', DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from setor
	        right join sensor on sensor.fkSetor = setor.idSetor
		        right join dadosSensor on dadosSensor.fkSensor = sensor.idSensor;
			        where fkSensor = 114 and dataHora = (SELECT dataHora FROM dadosSensor 
                    WHERE dataHora LIKE DATE_FORMAT(now(), '%Y:m:%d') order by dataHora desc limit 7;
                    SELECT dataHora FROM dadosSensor
                    WHERE DATE_FORMAT(dataHora, '%Y-%m-%d') = (SELECT DATE_FORMAT(now(), '%Y-%m-%d') AS dtRegistro FROM dadosSensor
                    WHERE fkSensor = 114 GROUP BY dtRegistro);
                    SELECT DATE_FORMAT(now(), '%Y-%m-%d') AS dtRegistro FROM dadosSensor
                    WHERE fkSensor = 114 GROUP BY dtRegistro
                    
                    SELECT concat(DATE_FORMAT(dataHora, '%Y-%m-%d')) AS dtRegistro FROM dadosSensor
                    WHERE fkSensor = 114 AND dtRegistro = '' GROUP BY dtRegistro;
                    
                    select * from dadosSensor;
                    
                    
                    
                    
                    SELECT DATE_FORMAT(dataHora, '%Y-%m-%d') AS dataRegistro, DATE_FORMAT(dataHora,'%d/%m/%Y') AS dataFormatada, dataHora FROM dadosSensor
    JOIN Sensor ON dadosSensor.fkSensor = Sensor.idSensor
        WHERE Sensor.fkEmpresa = 6 AND Sensor.idSensor = 112 GROUP BY dataRegistro;
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    select temperatura, umidade, dataHora, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from setor
        right join sensor on sensor.fkSetor = setor.idSetor
            right join dadosSensor on dadosSensor.fkSensor = sensor.idSensor
                where fkSensor = 114 AND dataHora LIKE '2023-05-27'  group by dataHora order by dataHora desc limit 1;
                    
            drop table dadosSensor;
            
                    
                    
                    
-- EXIBINDO OS DADOS DA TABELA DE DADOS_SENSOR

	SELECT * FROM dadosSensor;
    
	SELECT nome AS nomeSetor, idSensor, tipo, statusSensor, dataHora, temperatura, umi	dade FROM Setor 
		RIGHT JOIN Sensor ON Sensor.fkSetor = Setor.idSetor 
			JOIN dadosSensor ON dadosSensor.fkSensor = Sensor.idSensor WHERE Sensor.fkEmpresa = 6 
				GROUP BY idSensor;


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
	select * from datacooling.cadastroempresa;

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