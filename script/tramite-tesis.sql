-- DROP DATABASE IF EXISTS `u472469844_grupo1`;

-- CREATE DATABASE `u472469844_grupo1` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- USE `u472469844_grupo1`;


DROP DATABASE IF EXISTS `tramite_tesis`;

CREATE DATABASE `tramite_tesis` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `tramite_tesis`;

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `cod_rol` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(64) NOT NULL,
  `permisos` JSON NOT NULL,
  PRIMARY KEY (`cod_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `cod_usuario` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_rol` SMALLINT UNSIGNED NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `apellidos` VARCHAR(255) NOT NULL,
  `dni` VARCHAR(10) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `telefono` VARCHAR(12) NOT NULL,
  `correo` VARCHAR(255) NOT NULL UNIQUE,
  `direccion` VARCHAR(255) NOT NULL,
  `grado_academico` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`cod_usuario`),
  FOREIGN KEY (`cod_rol`) REFERENCES `rol`(`cod_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos para simular el login
INSERT INTO `rol` (`cod_rol`, `nombre`, `permisos`) 
VALUES
(1,'TESISTA', '{ "solicitud": 1, "tesis": 1, "portafolio": 1, "reporte": 1}'),
(2,'PROFESOR', '{ "solicitud": 1, "tesis": 1, "reporte": 1}'),
(3,'SECRETARIA', '{ "solicitud": 1, "reporte": 1 }'),
(4,'DIRECTOR ESCUELA', '{ "comite": 1, "jurado": 1, "reporte": 1}'),
(5, 'ADMINISTRADOR', '{"usuarios": 1, "solicitud": 1, "tesis": 1, "reporte": 1, "comite": 1, "jurado": 1}');

INSERT INTO `usuario`(`cod_usuario`, `cod_rol`, `nombre`, `apellidos`, `dni`, `password`, `fecha_nacimiento`, `telefono`, `correo`, `direccion`, `grado_academico`)
VALUES
('1', '5', 'NOM_ADMININSTRADOR', 'APELL_ADMINISTRADOR', '11111111', '$2a$10$.ogamKfOuOjJjQmkb79Heenc8hjxZPkVexobqh8rcev3NXF/p64UC', '2023-10-02', '987654321', 'administrador@gmail.com', 'AV MIRAFLORES', 'GRADO_ADMINISTRADOR'),
('2', '4', 'NOM_DIRECTOR', 'APELL_DIRECTOR', '22222222', '$2a$10$qjiN2lr5hAuMHYu4ul76EOTVsEqan9BRd1VDgFcCM3mwGamwAk8uG', '2023-10-09', '987654321', 'director@gmail.com', 'AV DIRECTOR DE ESCUELA', 'DOCTORADO'),
('3', '3', 'NOM_SECRETARIA', 'APELL_SECRETARIA', '33333333', '$2a$10$2pYAZ6J0Bt1LdRkf0jASq.ro373A0xNi6cr5Mjq4pHGjvYES9/1.2', '2023-02-22', '987654321', 'secretaria@gmail.com', 'AV SECRETARIA', 'BACHILLER'),
('4', '2', 'MOM_PROFESOR1', 'APELL_PROFESOR1', '44444444', '$2a$10$sDPihv1BmyVJe89yPcWUMu25TmmxTX1ULyitVQhN3pZprygVB9ATi', '2003-10-10', '987654321', 'profesor1@gmail.com', 'AV PROFESOR', 'MAESTRIA'),
('5', '2', 'NOM_PROFESOR2', 'APELL_PROFESOR2', '55555555', '$2a$10$sDPihv1BmyVJe89yPcWUMu25TmmxTX1ULyitVQhN3pZprygVB9ATi', '2003-10-10', '987654321', 'profesor2@gmail.com', 'AV PROFESOR', 'MAESTRIA'),
('6', '2', 'NOM_PROFESOR3', 'APELL_PROFESOR3', '66666666', '$2a$10$sDPihv1BmyVJe89yPcWUMu25TmmxTX1ULyitVQhN3pZprygVB9ATi', '2003-10-10', '987654321', 'profesor3@gmail.com', 'AV PROFESOR', 'MAESTRIA'),
('7', '2', 'NOM_PROFESOR4', 'APELL_PROFESOR4', '77777777', '$2a$10$sDPihv1BmyVJe89yPcWUMu25TmmxTX1ULyitVQhN3pZprygVB9ATi', '2003-10-10', '987654321', 'profesor4@gmail.com', 'AV PROFESOR', 'MAESTRIA'),
('8', '2', 'NOM_PROFESOR5', 'APELL_PROFESOR5', '88888888', '$2a$10$sDPihv1BmyVJe89yPcWUMu25TmmxTX1ULyitVQhN3pZprygVB9ATi', '2003-10-10', '987654321', 'profesor5@gmail.com', 'AV PROFESOR', 'MAESTRIA'),
('9', '1', 'OSCAR ALEJANDRO', 'CHOQUE SURCO', '99999999', '$2a$10$sLSbDd/j30W0Xqx8KaJzXeCdHHUNvZokaUv6HjaFuRvPHksP3n47a', '2023-10-02', '987654321', 'oachoques@gmail.com', 'AV MIRAFLORES', 'BACHILLER')
;

DROP TABLE IF EXISTS `tipo_documento`;
CREATE TABLE `tipo_documento` (
  `cod_doc` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cod_doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tipo_documento`(`cod_doc`, `nombre`)
VALUES
('1', 'SOLICITUD SIMPLE'),
('2', 'RECIBO POR DERECHO DE TITULACIÓN'),
('3', 'COPIA DEL GRADO ACADÉMICO DE BACHILLER'),
('4', 'RECIBO DEL PAGO POR CONCEPTO DE PUBLICACIÓN EN EL REPOSITORIO INSTITUCIONAL'), 
('5', 'TESIS'),
('6', 'CONSTANCIA DE NO ADEUDO DE BIENES A LA UNJBG'),
('7', 'FOTOGRAFÍA TAMAÑO PASAPORTE')
;

DROP TABLE IF EXISTS `folio`;
CREATE TABLE `folio` (
  `cod_folio` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_usuario` SMALLINT UNSIGNED NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cod_folio`),
  FOREIGN KEY (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `detalle_folio`;
CREATE TABLE `detalle_folio` (
  `cod_detalle_folio` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_folio` SMALLINT UNSIGNED NOT NULL,
  `cod_doc` SMALLINT UNSIGNED NOT NULL,
  `nombreArchivo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cod_detalle_folio`),
  FOREIGN KEY (`cod_folio`) REFERENCES `folio`(`cod_folio`),
  FOREIGN KEY (`cod_doc`) REFERENCES `tipo_documento`(`cod_doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tramite`;
CREATE TABLE `tramite` (
  `cod_tramite` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_usuario` SMALLINT UNSIGNED NOT NULL,
  `estado` enum('APROBADO', 'EN PROCESO', 'RECHAZADO') NOT NULL DEFAULT 'EN PROCESO',
  `fecha_registro` DATETIME NOT NULL DEFAULT current_timestamp(),
  `cod_asesor_propuesto` SMALLINT UNSIGNED NOT NULL,
  `versionInicial` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cod_tramite`),
  FOREIGN KEY (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`),
  FOREIGN KEY (`cod_asesor_propuesto`) REFERENCES `usuario`(`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `comite`;
CREATE TABLE `comite` (
  `cod_comite` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `num_integrantes` INT NOT NULL,
  PRIMARY KEY (`cod_comite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `integrantes_comite`;
CREATE TABLE `integrantes_comite` (
  `cod_comite` SMALLINT UNSIGNED NOT NULL,
  `cod_usuario_comite` SMALLINT UNSIGNED NOT NULL,
  FOREIGN KEY (`cod_comite`) REFERENCES `comite`(`cod_comite`),
  FOREIGN KEY (`cod_usuario_comite`) REFERENCES `usuario`(`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `comite` (`cod_comite`, `num_integrantes`) VALUES (1, 2);
INSERT INTO `integrantes_comite` (`cod_comite`, `cod_usuario_comite`)
VALUES (1,4), (1, 5);

DROP TABLE IF EXISTS `revision_comite`;
CREATE TABLE `revision_comite` (
  `cod_revision_comite` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_comite` SMALLINT UNSIGNED NOT NULL,
  `cod_tramite` SMALLINT UNSIGNED NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  `observacion` VARCHAR(255),
  `corregido` VARCHAR(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`cod_revision_comite`),
  FOREIGN KEY (`cod_comite`) REFERENCES `comite`(`cod_comite`),
  FOREIGN KEY (`cod_tramite`) REFERENCES `tramite`(`cod_tramite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tesis`;
CREATE TABLE `tesis` (
  `cod_tesis` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_usuario` SMALLINT UNSIGNED NOT NULL,
  `cod_tramite` SMALLINT UNSIGNED NOT NULL,
  `estado` enum('APROBADO', 'EN PROCESO', 'RECHAZADO', 'APROBADO ASESOR', 'PARA SUSTENTACIÓN') DEFAULT 'EN PROCESO',
  `titulo` VARCHAR(255) NOT NULL,
  `fecha_inicio` DATETIME NOT NULL DEFAULT current_timestamp(),
  `fecha_fin` DATETIME NOT NULL DEFAULT current_timestamp(),
  `versionInicial` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cod_tesis`),
  FOREIGN key (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `asesor`;
CREATE TABLE `asesor` (
  `cod_asesor` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  `cod_usuario` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`cod_asesor`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis`(`cod_tesis`),
  FOREIGN KEY (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `revision_asesor`;
CREATE TABLE `revision_asesor` (
  `cod_revision_asesor` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_asesor` SMALLINT UNSIGNED NOT NULL,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  `observacion` VARCHAR(255) NOT NULL,
  `corregido` VARCHAR(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`cod_revision_asesor`),
  FOREIGN KEY (`cod_asesor`) REFERENCES `asesor`(`cod_asesor`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis`(`cod_tesis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `jurado`;
CREATE TABLE `jurado` (
  `cod_jurado` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  `cod_usuario` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`cod_jurado`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis`(`cod_tesis`),
  FOREIGN KEY (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `rol_jurado`;
CREATE TABLE `rol_jurado` (
  `cod_rol_jurado` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_jurado` SMALLINT UNSIGNED NOT NULL,
  `tipo_rol` JSON NOT NULL, -- PRESIDENTE, SECRETARIO, VOCAL, SUPLENTE
  PRIMARY key (`cod_rol_jurado`),
  FOREIGN key (`cod_jurado`) REFERENCES `jurado`(`cod_jurado`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `revision_jurado`;
CREATE TABLE `revision_jurado` (
  `cod_revision_jurado` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_jurado` SMALLINT UNSIGNED NOT NULL,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  `observacion` VARCHAR(255) NOT NULL,
  `corregido` VARCHAR(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`cod_revision_jurado`),
  FOREIGN KEY (`cod_jurado`) REFERENCES `jurado`(`cod_jurado`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis`(`cod_tesis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP FUNCTION IF EXISTS `validarUser`;
DELIMITER //
CREATE FUNCTION `validarUser` (`id_user` INT,`d_dni` INT, `d_correo` VARCHAR(255)) RETURNS INT DETERMINISTIC
BEGIN
	-- 0 NO HAY NADA
	-- 1 YA EXISTE DNI
	-- 2 YA EXISTE CORREO
	DECLARE `estado` INT;
    SET `estado` = ( SELECT COUNT(*) FROM `usuario` WHERE `dni` = `d_dni` AND `cod_usuario` != `id_user`);
    IF `estado` > 0 THEN 
		RETURN 1;
	END IF;
    
    SET `estado` = ( SELECT COUNT(*) FROM `usuario` WHERE `correo` = `d_correo` AND `cod_usuario` != `id_user` );
    IF `estado` > 0 THEN
		RETURN 2;
	END IF;
    
    RETURN 0;
END //
DELIMITER ;
-- SELECT validarUser('0', '12345678', 'asc@.com') AS estado;

DROP PROCEDURE IF EXISTS `saveUser`;
DELIMITER //
CREATE PROCEDURE `saveUser`(IN `cod_rol` INT, IN `nombre` VARCHAR(255), IN `apellidos` VARCHAR(255), IN `dni` VARCHAR(10), IN `password` VARCHAR(255), IN `fecha_nacimiento` DATE, IN `telefono` VARCHAR(12), IN `correo` VARCHAR(255), IN `direccion` VARCHAR(255), IN `grado_academico` VARCHAR(255))
BEGIN
    INSERT INTO `usuario` (`cod_rol`, `nombre`, `apellidos`, `dni`, `password`, `fecha_nacimiento`, `telefono`, `correo`, `direccion`, `grado_academico`)
    VALUES (`cod_rol`, `nombre`, `apellidos`, `dni`, `password`, `fecha_nacimiento`, `telefono`, `correo`, `direccion`, `grado_academico`);
    SELECT * FROM `usuario` ORDER BY `cod_usuario` DESC LIMIT 1;
END //
DELIMITER ;
-- CALL saveUser(1, 'PROCEDURE', 'TEST', '98765432', '123', '2023-02-02', '987654321', 'C@CORRE.COM', 'AV MIRAZFLORES') ;

DROP PROCEDURE IF EXISTS `deleteUser`;
DELIMITER //
CREATE PROCEDURE `deleteUser`(IN `id_user` INT)
BEGIN
	DECLARE `affectedRows` INT;
	DELETE FROM `usuario` WHERE `cod_usuario` = `id_user`;
	SET `affectedRows` = ROW_COUNT();
  SELECT affectedRows;
END //
DELIMITER ;
-- CALL deleteUser(6);

DROP PROCEDURE IF EXISTS `updateUser`;
DELIMITER //
CREATE PROCEDURE `updateUser`(IN `id_user` INT, IN `cod_rol` INT, IN `nombre` VARCHAR(255), IN `apellidos` VARCHAR(255), IN `dni` VARCHAR(10), IN `password` VARCHAR(255), IN `fecha_nacimiento` DATE, IN `telefono` VARCHAR(12), IN `correo` VARCHAR(255), IN `direccion` VARCHAR(255), IN `grado_academico` VARCHAR(255))
BEGIN
    UPDATE `usuario` SET `cod_rol` = `cod_rol`, `nombre` = `nombre`, `apellidos` = `apellidos`, `dni` = `dni`, `password` = `password`, `fecha_nacimiento` = `fecha_nacimiento`, `telefono` = `telefono`, `correo` = `correo`, `direccion` = `direccion`, `grado_academico` = `grado_academico`
    WHERE `cod_usuario` = `id_user`;
    SELECT * FROM `usuario` WHERE `cod_usuario` = `id_user`;
END //
DELIMITER ;

/* Procedimiento para almacenar en folio */
DROP PROCEDURE IF EXISTS `saveFile`;
DELIMITER //
CREATE PROCEDURE `saveFile` (IN `idUser` INT, IN `tipo_doc` INT, IN `fileName` VARCHAR(100)) 
BEGIN 
	DECLARE idFolio INT;
    SET idFolio = (SELECT cod_folio FROM folio WHERE cod_usuario = idUser);
    
    -- No hay folio, entonces procedemos a crear
    IF idFolio IS NULL THEN
        INSERT INTO folio (cod_usuario) VALUES (idUser);
         SET idFolio = (SELECT cod_folio FROM folio WHERE cod_usuario = idUser);
    END IF;
    
    -- Si existe un folio, entonces solo se inserta el desalle de folio
	-- SELECT idFolio, "HAY FOLIO";
	INSERT INTO detalle_folio (cod_folio, cod_doc, nombreArchivo)
	VALUES (idFolio, tipo_doc, fileName);
    
    SELECT row_count() AS rowAffected;
END //
DELIMITER ;

/* Procedimientos relacionados a comite */
DROP PROCEDURE IF EXISTS `saveComite`;
DELIMITER //
CREATE PROCEDURE `saveComite` (IN num INT)
BEGIN
	INSERT INTO comite (num_integrantes) 
    VALUES (num);
    SELECT cod_comite FROM comite ORDER BY cod_comite DESC LIMIT 1;
END //
DELIMITER ;


/* Procedimientos para tramite */

DROP PROCEDURE IF EXISTS `getTramites`;
DELIMITER //
CREATE PROCEDURE `getTramites` (IN id_user INT)
BEGIN
	DECLARE tipoUser VARCHAR(60);
    SET tipoUser = (SELECT rol.nombre FROM rol INNER JOIN usuario u ON u.cod_rol = rol.cod_rol WHERE u.cod_usuario = id_user);
-- Si el que solicita es tesista se le devuelve sus propias solicitudes sino todas las que existen
	IF tipoUser = 'TESISTA' THEN
		SELECT cod_tramite, t.cod_usuario, u.dni, estado, DATE(t.fecha_registro) AS fecha FROM tramite t
        INNER JOIN usuario u ON u.cod_usuario = t.cod_usuario
        WHERE t.cod_usuario = id_user ORDER BY t.cod_tramite DESC;
	ELSE
		IF (SELECT cod_comite FROM integrantes_comite WHERE cod_usuario_comite = id_user) IS NOT NULL THEN
			SELECT cod_tramite, t.cod_usuario, u.dni, estado, DATE(fecha_registro) AS fecha FROM tramite t
			INNER JOIN usuario u ON u.cod_usuario = t.cod_usuario
			ORDER BY t.cod_tramite DESC;
        END IF;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `saveTramite`;
DELIMITER //
CREATE PROCEDURE `saveTramite` (IN `cod_usuario` INT, IN `cod_asesor_propuesto` INT, `versionInicial` VARCHAR(100))
BEGIN
	INSERT INTO `tramite` (`cod_usuario`, `cod_asesor_propuesto`, `versionInicial`)
    VALUES (`cod_usuario`, `cod_asesor_propuesto`, `versionInicial`);
    SELECT * FROM `tramite` ORDER BY `cod_tramite` DESC LIMIT 1;
END //
DELIMITER ; 

DROP FUNCTION IF EXISTS getNameFile; 
DELIMITER //
CREATE FUNCTION getNameFile (idUser INT, tipoDoc INT) RETURNS VARCHAR(100) DETERMINISTIC
BEGIN
	DECLARE fileName VARCHAR(100);
	SET fileName = (
		SELECT df.nombreArchivo FROM detalle_folio df WHERE df.cod_folio = (
			SELECT f.cod_folio FROM folio f WHERE f.cod_usuario = idUser
		) AND df.cod_doc = tipoDoc
        ORDER BY df.cod_detalle_folio DESC LIMIT 1
	);
    RETURN fileName;
END //
DELIMITER ;

-- Obtener la última version del documento
DROP FUNCTION IF EXISTS getFileName;
DELIMITER //
CREATE FUNCTION getFileName (idTramite INT) RETURNS VARCHAR(100) DETERMINISTIC
BEGIN
	DECLARE fileName VARCHAR(100);
	
    -- Si no hay revisiones de comite, se muestra la versionIncial del tramite
    IF ( SELECT corregido FROM revision_comite WHERE cod_tramite = idTramite LIMIT 1 ) IS NULL OR ( SELECT corregido FROM revision_comite WHERE cod_tramite = idTramite LIMIT 1 ) = '' THEN
		SET fileName = (SELECT versionInicial FROM tramite WHERE cod_tramite = idTramite);
	ELSE 
		-- Si existe observaciones, se muestra la ultima version del documento
		SET fileName = (
				SELECT corregido FROM revision_comite WHERE cod_tramite = idTramite ORDER BY cod_revision_comite DESC LIMIT 1
		);
		
        -- Si la ultima observacion aun no esta corregida, me muestra el penultimo documento cargado
		IF fileName = '' THEN
			SET fileName = (
				SELECT corregido FROM revision_comite WHERE cod_tramite = idTramite ORDER BY cod_revision_comite DESC LIMIT 1 OFFSET 1
			);
        END IF;
    END IF;
    
	RETURN fileName;
END //
DELIMITER ;

DROP FUNCTION IF EXISTS buscarComite;
DELIMITER //
CREATE FUNCTION buscarComite(idUser INT) RETURNS INT DETERMINISTIC
BEGIN
	RETURN (SELECT cod_comite FROM integrantes_comite WHERE cod_usuario_comite = idUser);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS saveObservacion;
DELIMITER //
CREATE PROCEDURE saveObservacion(IN idUser INT, IN idTramite INT, IN obs VARCHAR(255))
BEGIN 
	DECLARE idComite INT;
    SET idComite = (SELECT buscarComite(idUser) );
	INSERT INTO revision_comite(cod_comite, cod_tramite, observacion)
    VALUES (idComite, idTramite, obs);
    SELECT * FROM revision_comite ORDER BY cod_revision_comite DESC LIMIT 1;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getTesis;
DELIMITER //
CREATE PROCEDURE getTesis (IN id_user INT)
BEGIN
-- Si el que solicita es tesista se le devuelve sus propias tesis sino todas las que existen
	IF (SELECT rol.nombre FROM rol INNER JOIN usuario u ON u.cod_rol = rol.cod_rol WHERE u.cod_usuario = id_user ) = 'TESISTA' THEN
		SELECT cod_tesis, t.titulo, t.cod_usuario, u.dni, estado, DATE(t.fecha_inicio) AS fecha FROM tesis t
        INNER JOIN usuario u ON u.cod_usuario = t.cod_usuario
        WHERE t.cod_usuario = id_user ORDER BY t.cod_tesis DESC;
	ELSE
		SELECT t.cod_tesis, t.titulo, t.cod_usuario, u.dni, estado, DATE(fecha_inicio) AS fecha FROM tesis t
        INNER JOIN usuario u ON u.cod_usuario = t.cod_usuario
        INNER JOIN asesor a ON a.cod_tesis = t.cod_tesis
        WHERE a.cod_usuario = id_user
        ORDER BY t.cod_tesis DESC;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS saveTesis;
DELIMITER //
CREATE PROCEDURE saveTesis(IN idUser INT, IN idTramite INT, IN titulo VARCHAR(255), IN fileName VARCHAR(100))
BEGIN
	DECLARE idTesis INT;
    DECLARE idAsesorPropuesto INT;
    
	INSERT INTO tesis(cod_usuario, cod_tramite, titulo, versionInicial)
    VALUES (idUser, idTramite, titulo, fileName);
    
    IF row_count() >= 1 THEN
		SET idTesis = (SELECT cod_tesis FROM tesis ORDER BY cod_tesis DESC LIMIT 1);

        IF idTesis IS NOT NULL THEN
			SET idAsesorPropuesto = (SELECT cod_asesor_propuesto FROM tramite WHERE cod_tramite = idTramite);
			INSERT INTO asesor(cod_tesis, cod_usuario)
            VALUES (idTesis, idAsesorPropuesto);
        END IF;
    END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS saveObservacionAsesor;
DELIMITER //
CREATE PROCEDURE saveObservacionAsesor(IN idUser INT, IN idTesis INT, IN obs VARCHAR(255))
BEGIN 
	DECLARE idAsesor INT;
    SET idAsesor = (SELECT cod_asesor FROM asesor WHERE cod_tesis = idTesis);
    INSERT INTO revision_asesor (cod_asesor, cod_tesis, observacion)
	VALUES (idAsesor, idTesis, obs);
    SELECT * FROM revision_asesor ORDER BY cod_revision_asesor DESC LIMIT 1;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS saveObservacionJurado;
DELIMITER //
CREATE PROCEDURE saveObservacionJurado(IN idUser INT, IN idTesis INT, IN obs VARCHAR(255))
BEGIN 
	DECLARE idJurado INT;
    SET idJurado = (SELECT cod_jurado FROM jurado WHERE cod_tesis = idTesis);
    INSERT INTO revision_jurado (cod_jurado, cod_tesis, observacion)
	VALUES (idJurado, idTesis, obs);
    SELECT * FROM revision_jurado ORDER BY cod_revision_jurado DESC LIMIT 1;
END //
DELIMITER ;

DROP FUNCTION IF EXISTS existeTesis;
DELIMITER //
CREATE FUNCTION existeTesis(idTramite INT) RETURNS INT DETERMINISTIC
BEGIN
	IF (SELECT COUNT(*) FROM tesis WHERE cod_tramite = idTramite) >= 1 THEN
		RETURN 1;
	ELSE 
		RETURN 0;
	END IF;
END //
DELIMITER ;

DROP FUNCTION IF EXISTS getFileTesis;
DELIMITER //
CREATE FUNCTION getFileTesis(idTesis INT) RETURNS VARCHAR(100) DETERMINISTIC
BEGIN
	DECLARE fileName VARCHAR(100); 
    
    -- Si no hay revision de asesor, se muestra la version de inicial
    IF (SELECT corregido FROM revision_asesor WHERE cod_tesis = idTesis LIMIT 1) IS NULL OR (SELECT corregido FROM revision_asesor WHERE cod_tesis = idTesis LIMIT 1) = '' THEN
		SET fileName = (SELECT versionInicial FROM tesis WHERE cod_tesis = idTesis);
	ELSE
		IF ( SELECT estado FROM tesis WHERE cod_tesis = idTesis ) = 'APROBADO ASESOR' THEN
        
			IF (SELECT corregido FROM revision_jurado WHERE cod_tesis = idTesis LIMIT 1) IS NULL OR (SELECT corregido FROM revision_jurado WHERE cod_tesis = idTesis LIMIT 1) = '' THEN
				SET fileName = (
					SELECT corregido FROM revision_asesor WHERE cod_tesis = idTesis ORDER BY cod_revision_asesor DESC LIMIT 1
				);
            ELSE
				
                SET fileName = (
					SELECT corregido FROM revision_jurado WHERE cod_tesis = idTesis ORDER BY cod_revision_jurado DESC LIMIT 1
                );
                
                IF fileName = '' THEN
					SET fileName = (
						SELECT corregido FROM revision_jurado WHERE cod_tesis = idTesis ORDER BY cod_revision_jurado DESC LIMIT 1 OFFSET 1
                    );
				END IF;
                
            END IF;
		ELSE 
    
			-- SI EXISTE OBSERVACIONES, SE MUESTRA LA ULTIMA VERSION DEL DOCUMENTO
			SET fileName = (
				SELECT corregido FROM revision_asesor WHERE cod_tesis = idTesis ORDER BY cod_revision_asesor DESC LIMIT 1
			);
        
			-- SI LA ULTIMA OBSERVACION AUN NO ESTA CORREGIDO
			IF fileName = '' THEN
				SET fileName = (
					SELECT corregido FROM revision_asesor WHERE cod_tesis = idTesis ORDER BY cod_revision_asesor DESC LIMIT 1 OFFSET 1
				);
			END IF;
		END IF;
    END IF;
    
    RETURN fileName;
END //
DELIMITER ;