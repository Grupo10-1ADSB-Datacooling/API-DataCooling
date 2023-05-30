/* REGRA DE NEGÓCIO

	* PLANO PARA EMPRESA:
    
		UM PLANO PODE SER ADQUIRIDO POR MUITAS EMPRESAS;
		UMA EMPRESA SÓ PODE ADQUIRIR UM PLANO;
        
        RELAÇÃO 1:N
        
	* EMPRESA PARA USUÁRIO:
    
		UMA EMPRESA PODE TER MUITOS USUÁRIOS;
		UM USUÁRIO SÓ PODE SER DE UMA EMPRESA;
        
        RELAÇÃO 1:N
      
	* EMPRESA PARA SETOR
	
		UMA EMPRESA PODE POSSUI MUITOS SETORES;
		UM SETOR SÓ PODE SER DE UMA EMPRESA;
        
        RELAÇÃO 1:N
    
    * SETOR PARA SENSOR
    
		UM SETOR/LOCAL PODE TER VÁRIOS SENSORES;
		UM SENSOR SÓ PODE ESTAR EM UM SETOR/LOCAL;
        
        RELAÇÃO 0:N
    
    * SENSOR PARA REGISTRO / DADOS_SENSOR
    
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
		(null, 'Clebinho Datacenter', '01234567890001', null, '01001001', 100, 2),
		(null, 'Datacenter guib', '01234567890002', null, '01001002', 250, 1),
		(null, 'Rogers Datacenter', '7579878798457', null, '04747772', 600, 3),
		(null, 'Elena Datacenter', '01234567890003', null, '08594003', 1200, 1),
		(null, 'Luiza Datacenter', '08924567895783', null, '03891003', 875, 3),
		(null, 'Bambam Datacenter', '01234590174838', null, '05898403', 478, 2);
        
-- EXIBINDO OS DADOS DA TABELA DE EMPRESA

	SELECT * FROM Empresa;
    
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
		(null, 3, 'Yuri', 'Martins', 'yuri.martins@rogercenter.com', 'PalmeirasNaoTemMundial'),
		(null, 6, 'Kleber', 'Bambam', 'admin@bambam.datacenter', '#Kb0123'),
		(null, 6, 'Martha', 'Santos', 'martha.santos@bambam.datacenter', 'Batata123'),
		(null, 6, 'Carolina', 'Bambam', 'carolina@bambam.datacenter', '#Cb0123');
        
-- EXIBINDO OS DADOS DA TABELA DE USUÁRIO

	SELECT * FROM Usuario;
    
-- TABELA DOS SETORES

	CREATE TABLE Setor(
    idSetor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    fkEmpresa INT,
    CONSTRAINT fkSetorEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
    );
    
-- INSERÇÃO DE REGISTROS NA TABELA DE SETORES

	INSERT INTO Setor VALUES
		(null, 'Setor A', 6),
		(null, 'Setor B', 6),
		(null, 'Setor C', 6),
		(null, 'Setor D', 6);
        
-- EXIBINDO OS DADOS DA TABELA DOS SETORES

	SELECT * FROM Setor;

-- TABELA DO SENSOR

	CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	statusSensor VARCHAR(15), CONSTRAINT chkStatusSensor CHECK (statusSensor IN ('Ativo', 'Inativo', 'Manutenção')), -- STATUS DO SENSOR PODENDO TER SOMENTE OS TRÊS VALORES DA CHECK
    fkSetor INT,
    CONSTRAINT fkSetorSensor FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor) -- FOREIGN KEY PARA IDENTIFICAR O SETOR QUE ESTÁ LOCALIZADO O SENSOR
	) AUTO_INCREMENT = 100;

-- INSERÇÃO DE REGISTROS NA TABELA DE SENSOR

	INSERT INTO Sensor VALUES
		(112, 'Ativo', 1),
		(113, 'Ativo', 2),
		(114, 'Ativo', 3),
		(115, 'Manutenção', null);

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
	);

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
        
        SELECT * FROM cadastroEmpresa;
        
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