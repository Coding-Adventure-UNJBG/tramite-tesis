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
  `dni` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `telefono` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(255) NOT NULL UNIQUE,
  `direccion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`cod_usuario`),
  FOREIGN KEY (`cod_rol`) REFERENCES `rol`(`cod_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos para simular el login
insert into rol(cod_rol, nombre, permisos)
values (1, 'admin', '{"todo":true}');

insert into usuario(cod_usuario, cod_rol, nombre, apellidos, dni, password, fecha_nacimiento, telefono, correo, direccion)
values (1, 1,'OSCAR', 'CHOQUE', '12345678', '$2a$10$.ogamKfOuOjJjQmkb79Heenc8hjxZPkVexobqh8rcev3NXF/p64UC', '2023-10-02', '987654321', 'oscar@choque.com', 'AV MIRAFLORES');

DROP TABLE IF EXISTS `codigo_pago`;
CREATE TABLE `codigo_pago` (
  `cod_pago` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nonbre` VARCHAR(64) NOT NULL,
  `abreviatura` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`cod_pago`)
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
  `cod_pago` SMALLINT UNSIGNED NOT NULL,
  `descripcion` TINYTEXT NOT NULL,
  `documento` VARCHAR(100) NOT NULL,
  FOREIGN KEY (`cod_usuario`) REFERENCES `usuario`(`cod_usuario`),
  FOREIGN KEY (`cod_folio`) REFERENCES `folio`(`cod_folio`),
  FOREIGN KEY (`cod_pago`) REFERENCES `codigo_pago`(`cod_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `viabilidad`;
CREATE TABLE `viabilidad` (
  `cod_viabilidad` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cod_tesista` SMALLINT UNSIGNED NOT NULL,
  `estado` enum("APROBADO", "OBSERVADO", "PENDIENTE", "DESAPROBADO") NOT NULL DEFAULT "PENDIENTE",
  `fecha` DATETIME NOT NULL DEFAULT current_timestamp(),
  `resolucion` VARCHAR(100),
  PRIMARY KEY (`cod_viabilidad`),
  FOREIGN KEY (`cod_tesista`) REFERENCES `usuario`(`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `comite`;
CREATE TABLE `comite` (
  `cod_comite` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `grado_academico` VARCHAR(64),
  PRIMARY KEY (`cod_comite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `detalle_viabilidad`;
CREATE TABLE `detalle_viabilidad` (
  `cod_tramite` SMALLINT UNSIGNED NOT NULL,
  `cod_docente` SMALLINT UNSIGNED NOT NULL,
  `fecha_mod` DATETIME NOT NULL DEFAULT current_timestamp(),
  `observacion` TEXT NOT NULL,
  FOREIGN KEY (`cod_tramite`) REFERENCES `viabilidad`(`cod_viabilidad`),
  FOREIGN KEY (`cod_docente`) REFERENCES `comite`(`cod_comite`)
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
CREATE FUNCTION `validarUser` (`d_dni` INT, `d_correo` VARCHAR(255)) RETURNS INT DETERMINISTIC
BEGIN
	-- 0 NO HAY NADA
	-- 1 YA EXISTE DNI
	-- 2 YA EXISTE CORREO
	DECLARE `estado` INT;
    SET `estado` = ( SELECT COUNT(*) FROM `usuario` WHERE `dni` = `d_dni` );
    IF `estado` > 0 THEN 
		RETURN 1;
	END IF;
    
    SET `estado` = ( SELECT COUNT(*) FROM `usuario` WHERE `correo` = `d_correo` );
    IF `estado` > 0 THEN
		RETURN 2;
	END IF;
    
    RETURN 0;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `saveUser`;
DELIMITER //
CREATE PROCEDURE `saveUser`(IN `cod_rol` INT, IN `nombre` VARCHAR(255), IN `apellidos` VARCHAR(255), IN `dni` VARCHAR(10), IN `password` VARCHAR(255), IN `fecha_nacimiento` DATE, IN `telefono` VARCHAR(15), IN `correo` VARCHAR(255), IN `direccion` VARCHAR(255))
BEGIN
    INSERT INTO `usuario` (`cod_rol`, `nombre`, `apellidos`, `dni`, `password`, `fecha_nacimiento`, `telefono`, `correo`, `direccion`)
    VALUES (`cod_rol`, `nombre`, `apellidos`, `dni`, `password`, `fecha_nacimiento`, `telefono`, `correo`, `direccion`);
    SELECT * FROM `usuario` ORDER BY `cod_usuario` DESC LIMIT 1;
END //
DELIMITER ;
-- CALL saveUser(1, 'PROCEDURE', 'TEST', '98765432', '123', '2023-02-02', '987654321', 'C@CORRE.COM', 'AV MIRAZFLORES') ;

DROP PROCEDURE IF EXISTS `deleteUser`;
DELIMITER //
CREATE PROCEDURE `deleteUser`(IN `id_user` INT)
BEGIN
    DELETE FROM `usuario` WHERE `cod_usuario` = `id_user`;
    SELECT * FROM `usuario`;
END //
DELIMITER ;
-- CALL deleteUser(6);

DROP PROCEDURE IF EXISTS `updateUser`;
DELIMITER //
CREATE PROCEDURE `updateUser`(IN `id_user` INT, IN `cod_rol` INT, IN `nombre` VARCHAR(255), IN `apellidos` VARCHAR(255), IN `dni` VARCHAR(10), IN `password` VARCHAR(255), IN `fecha_nacimiento` DATE, IN `telefono` VARCHAR(15), IN `correo` VARCHAR(255), IN `direccion` VARCHAR(255))
BEGIN
    UPDATE `usuario` SET `cod_rol` = `cod_rol`, `nombre` = `nombre`, `apellidos` = `apellidos`, `dni` = `dni`, `password` = `password`, `fecha_nacimiento` = `fecha_nacimiento`, `telefono` = `telefono`, `correo` = `correo`, `direccion` = `direccion`
    WHERE `cod_usuario` = `id_user`;
    SELECT * FROM `usuario` WHERE `cod_usuario` = `id_user`;
END //
DELIMITER ;
-- CALL updateUser(9,1, 'PROCEDURE updarwUser', 'TEST UPDATE', '77553322', '123', '2023-02-02', '987654321', 'MICORREO@DOMINIO.COM', 'AV MIRAZFLORES') ;