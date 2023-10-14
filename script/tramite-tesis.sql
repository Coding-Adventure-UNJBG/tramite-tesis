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
(1,'TESISTA', '{ "solicitud": 1, "tesis": 0, "reporte": 1}'),
(2,'PROFESOR', '{ "p_comite": 0, "p_asesor": 0, "p_jurado": 0, "reporte": 1}'),
(3,'SECRETARIA', '{ "solicitud": 1, "reporte": 1 }'),
(4,'DIRECTOR ESCUELA', '{ "comite": 1, "jurado": 1}'),
(5, 'ADMINISTRADOR', '{"usuarios": 1, "tramite": 1, "tesis": 1, "comite": 1}');

INSERT INTO `usuario`(`cod_usuario`, `cod_rol`, `nombre`, `apellidos`, `dni`, `password`, `fecha_nacimiento`, `telefono`, `correo`, `direccion`, `grado_academico`)
VALUES
('1', '5', 'OSCAR', 'CHOQUE', '12345678', '$2a$10$.ogamKfOuOjJjQmkb79Heenc8hjxZPkVexobqh8rcev3NXF/p64UC', '2023-10-02', '987654321', 'oscar@choque.com', 'AV MIRAFLORES', 'BACHILLER'),
('2', '1', 'userTesista', 'prueba', '11111111', '$2a$10$sLSbDd/j30W0Xqx8KaJzXeCdHHUNvZokaUv6HjaFuRvPHksP3n47a', '2002-10-11', '987654321', 'tesista@gmail.com', 'AV TESISTA', 'BACHILLER'),
('3', '2', 'userProfesor', 'prueba', '22222222', '$2a$10$sDPihv1BmyVJe89yPcWUMu25TmmxTX1ULyitVQhN3pZprygVB9ATi', '2003-10-10', '987654321', 'profesor@gmail.com', 'AV PROFESOR', 'MAESTRIA'),
('4', '4', 'userDirector', 'prueba', '33333333', '$2a$10$qjiN2lr5hAuMHYu4ul76EOTVsEqan9BRd1VDgFcCM3mwGamwAk8uG', '2023-10-09', '987654321', 'directoresis@gmail.com', 'AV DIRECTOR DE ESCUELA', 'DOCTORADO'),
('5', '3', 'userSecretaria', 'prueba', '44444444', '$2a$10$2pYAZ6J0Bt1LdRkf0jASq.ro373A0xNi6cr5Mjq4pHGjvYES9/1.2', '2023-02-22', '987654321', 'SECRETARIA@GMAIL.COM', 'AV SECRETARIA', 'BACHILLER')
;

DROP TABLE IF EXISTS `tipo_documento`;
CREATE TABLE `tipo_documento` (
  `cod_doc` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nonbre` VARCHAR(64) NOT NULL,
  `abreviatura` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`cod_doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `folio`;
CREATE TABLE `folio` (
  `cod_folio` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cod_folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `detalle_folio`;
CREATE TABLE `detalle_folio` (
  `cod_usuario` SMALLINT UNSIGNED NOT NULL,
  `cod_folio` SMALLINT UNSIGNED NOT NULL,
  `cod_doc` SMALLINT UNSIGNED NOT NULL,
  `descripcion` TINYTEXT NOT NULL,
  `documento` VARCHAR(100) NOT NULL,
  FOREIGN KEY (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`),
  FOREIGN KEY (`cod_folio`) REFERENCES `folio`(`cod_folio`),
  FOREIGN KEY (`cod_doc`) REFERENCES `tipo_documento`(`cod_doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tramite`;
CREATE TABLE `tramite` (
  `cod_tramite` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_usuario` SMALLINT UNSIGNED NOT NULL,
  `estado` enum("APROBADO", "OBSERVADO", "PENDIENTE", "RECHAZADO") NOT NULL DEFAULT "PENDIENTE",
  `fecha_registro` DATETIME NOT NULL DEFAULT current_timestamp(),
  `titulo_tesis` VARCHAR(255) NOT NULL,
  `descripcion_tesis` TEXT NOT NULL,
  PRIMARY KEY (`cod_tramite`),
  FOREIGN KEY (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`)
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

DROP TABLE IF EXISTS `revision_comite`;
CREATE TABLE `revision_comite` (
  `cod_revision_comite` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `comite_cod_comite` SMALLINT UNSIGNED NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY key (`cod_revision_comite`),
  FOREIGN KEY (`comite_cod_comite`) REFERENCES `comite`(`cod_comite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `detalle_revision_comite`;
CREATE TABLE `detalle_revision_comite` (
  `revision_proyecto` SMALLINT UNSIGNED NOT NULL,
  `cod_tramite` SMALLINT UNSIGNED NOT NULL,
  `observaciones` VARCHAR(45),
  FOREIGN KEY (`revision_proyecto`) REFERENCES `revision_comite`(`cod_revision_comite`),
  FOREIGN KEY (`cod_tramite`) REFERENCES `tramite`(`cod_tramite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tesis`;
CREATE TABLE `tesis` (
  `cod_tesis` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_folio` SMALLINT UNSIGNED NOT NULL,
  `estado` enum("APROBADO", "OBSERVADO", "PENDIENTE", "DESAPROBADO") NOT NULL DEFAULT "PENDIENTE",
  `titulo` VARCHAR(100) NOT NULL,
  `fecha_inicio` DATETIME NOT NULL,
  `fecha_fin` DATETIME NOT NULL,
  PRIMARY KEY (`cod_tesis`),
  FOREIGN KEY (`cod_folio`) REFERENCES `folio`(`cod_folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `asesor`;
CREATE TABLE `asesor` (
  `cod_asesor` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`cod_asesor`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis`(`cod_tesis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `revision_asesor`;
CREATE TABLE `revision_asesor` (
  `cod_revision` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_asesor` SMALLINT UNSIGNED NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cod_revision`),
  FOREIGN KEY (`cod_asesor`) REFERENCES `asesor`(`cod_asesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `detalle_revision_asesor`;
CREATE TABLE `detalle_revision_asesor` (
  `cod_detalle` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  `cod_revision_asesor` SMALLINT UNSIGNED NOT NULL,
  `observacion` TEXT NOT NULL,
  PRIMARY KEY (`cod_detalle`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis`(`cod_tesis`),
  FOREIGN KEY (`cod_revision_asesor`) REFERENCES `revision_asesor`(`cod_revision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `jurado`;
CREATE TABLE `jurado` (
  `cod_jurado` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`cod_jurado`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis`(`cod_tesis`)
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
  `cod_revision` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_jurado` SMALLINT UNSIGNED NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cod_revision`),
  FOREIGN KEY (`cod_jurado`) REFERENCES `jurado`(`cod_jurado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `detalle_revision_jurado`;
CREATE TABLE `detalle_revision_jurado` (
  `cod_detalle` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_tesis` SMALLINT UNSIGNED NOT NULL,
  `cod_revision_jurado` SMALLINT UNSIGNED NOT NULL,
  `observacion` TEXT NOT NULL,
  `resuelto` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`cod_detalle`),
  FOREIGN KEY (`cod_tesis`) REFERENCES `tesis` (`cod_tesis`),
  FOREIGN KEY (`cod_revision_jurado`) REFERENCES `revision_jurado`(`cod_revision`)
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
-- CALL updateUser(9,1, 'PROCEDURE updarwUser', 'TEST UPDATE', '77553322', '123', '2023-02-02', '987654321', 'MICORREO@DOMINIO.COM', 'AV MIRAZFLORES') ;

DROP PROCEDURE IF EXISTS `saveTramite`;
DELIMITER //
CREATE PROCEDURE `saveTramite` (IN `cod_usuario` INT, IN `titulo_tesis` VARCHAR(255), IN `descripcion_tesis` TEXT)
BEGIN
	INSERT INTO `tramite` (`cod_usuario`, `titulo_tesis`, `descripcion_tesis`)
    VALUES (`cod_usuario`, `titulo_tesis`, `descripcion_tesis`);
    SELECT * FROM `tramite` ORDER BY `cod_tramite` DESC LIMIT 1;
END //
DELIMITER ; 
-- CALL saveTramite(2, 'mi tesis', 'jaja no hay nada');

DROP PROCEDURE IF EXISTS `getTramites`;
DELIMITER //
CREATE PROCEDURE `getTramites` (IN id_user INT)
BEGIN
-- Si el que solicita es tesista se le devuelve sus propias solicitudes sino todas las que existen
	IF (SELECT rol.nombre FROM rol INNER JOIN usuario u ON u.cod_rol = rol.cod_rol WHERE u.cod_usuario = id_user ) = 'TESISTA' THEN
		SELECT cod_tramite, t.cod_usuario, u.dni, estado, DATE(t.fecha_registro) AS fecha, titulo_tesis, descripcion_tesis FROM tramite t
        INNER JOIN usuario u ON u.cod_usuario = t.cod_usuario
        WHERE t.cod_usuario = id_user ORDER BY t.cod_tramite DESC;
	ELSE
		SELECT cod_tramite, t.cod_usuario, u.dni, estado, DATE(fecha_registro) AS fecha, titulo_tesis, descripcion_tesis FROM tramite t
        INNER JOIN usuario u ON u.cod_usuario = t.cod_usuario
        ORDER BY t.cod_tramite DESC;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `saveComite`;
DELIMITER //
CREATE PROCEDURE `saveComite` (IN num INT)
BEGIN
	INSERT INTO comite (num_integrantes) 
    VALUES (num);
    SELECT cod_comite FROM comite ORDER BY cod_comite DESC LIMIT 1;
END //
DELIMITER ;