-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-03-2024 a las 22:37:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Ae`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Asignaciones`
--

CREATE TABLE `Asignaciones` (
  `asignacion_id` int(11) NOT NULL,
  `documento_id` int(11) DEFAULT NULL,
  `evidencia_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Asignaciones`
--

INSERT INTO `Asignaciones` (`asignacion_id`, `documento_id`, `evidencia_id`) VALUES
(15, 11141111, 74),
(16, 11141111, 75),
(17, 11141111, 76),
(18, 11141111, 77),
(19, 11141111, 78),
(20, 11141111, 79),
(21, 11141111, 80),
(22, 1016912184, 81);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EquipoTrabajo`
--

CREATE TABLE `EquipoTrabajo` (
  `equipo_trabajo_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `EquipoTrabajo`
--

INSERT INTO `EquipoTrabajo` (`equipo_trabajo_id`, `nombre`) VALUES
(1, 'Coordinación'),
(2, 'Administración archivo central'),
(3, 'Lineamientos archivos de gestión'),
(4, 'Administración documental SGDEA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EvidenciaTrabajo`
--

CREATE TABLE `EvidenciaTrabajo` (
  `evidencia_trabajo_id` int(11) NOT NULL,
  `equipo_trabajo_id` int(11) DEFAULT NULL,
  `funcionario_id` int(11) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `archivoPdf` blob DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(40) NOT NULL DEFAULT 'Pendiente',
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `EvidenciaTrabajo`
--

INSERT INTO `EvidenciaTrabajo` (`evidencia_trabajo_id`, `equipo_trabajo_id`, `funcionario_id`, `titulo`, `descripcion`, `fecha_entrega`, `archivoPdf`, `fecha_creacion`, `fecha_actualizacion`, `estado`, `user_id`) VALUES
(74, NULL, 11141111, 'Adjuntar Matriz Excel', 'datos desde el 2021', '2024-03-28', 0x527574696e6120762e312e322e706466, '2024-03-06 19:47:53', '2024-03-06 20:22:07', 'Entregado', NULL),
(75, NULL, 11141111, 'prueba de matias', 'matias funcional', '2024-03-27', 0x546f646173206c6173207075626c69636163696f6e657320c3a2c280c2a220496e7374616772616d2e706466, '2024-03-06 19:49:01', '2024-03-06 20:02:19', 'Entregado', NULL),
(76, NULL, 11141111, 'asasa', 'asasas', '2024-03-29', 0x527574696e6120762e312e322e7064662e706466, '2024-03-06 19:51:34', '2024-03-06 20:22:13', 'Entregado', NULL),
(77, NULL, 11141111, 'sdsds', 'dsdsdsd', '2024-03-30', 0x546f646173206c6173207075626c69636163696f6e657320c3a2c280c2a220496e7374616772616d2e706466, '2024-03-06 19:52:01', '2024-03-06 20:22:19', 'Entregado', NULL),
(78, NULL, 11141111, 'sasa', 'sasas', '2024-04-03', 0x527574696e6120762e312e322e706466202831292e706466, '2024-03-06 20:06:16', '2024-03-06 20:22:25', 'Entregado', NULL),
(79, NULL, 11141111, 'sasasa', 'asasasasa', '2024-03-27', 0x527574696e6120762e312e322e706466, '2024-03-06 20:06:23', '2024-03-06 20:22:32', 'Entregado', NULL),
(80, NULL, 11141111, 'bbb', 'bbbbbbb', '2024-03-30', 0x546f646173206c6173207075626c69636163696f6e657320c3a2c280c2a220496e7374616772616d202831292e706466, '2024-03-06 20:17:17', '2024-03-06 20:34:53', 'Entregado', NULL),
(81, NULL, 1016912184, 'jugar free', 'llegar a heroico', '2024-03-27', 0x436f6e6669726d616369c383c2b36e5f496e736372697063696f6e5f454b3230323431303838303639302e706466, '2024-03-06 20:36:34', '2024-03-06 20:36:45', 'Entregado', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Funcionario`
--

CREATE TABLE `Funcionario` (
  `documento_id` int(255) NOT NULL,
  `nombres` varchar(255) DEFAULT 'CAMBIAR!',
  `apellidos` varchar(255) NOT NULL DEFAULT 'CAMBIAR!',
  `telefono` varchar(255) NOT NULL DEFAULT 'CAMBIAR!',
  `rol_id` int(11) DEFAULT 2,
  `correo` varchar(255) NOT NULL,
  `contrasenia` varchar(100) DEFAULT NULL,
  `equipo_trabajo_id` int(11) DEFAULT NULL,
  `instrumento_archivistico_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Funcionario`
--

INSERT INTO `Funcionario` (`documento_id`, `nombres`, `apellidos`, `telefono`, `rol_id`, `correo`, `contrasenia`, `equipo_trabajo_id`, `instrumento_archivistico_id`, `fecha_creacion`) VALUES
(777, 'CAMBIAR!', 'CAMBIAR!', 'CAMBIAR!', 2, 'marta@gmail.com', '$2a$10$SrHzNkCoqA0TMumO6Tew8u8JqLIANp.V05RuXtqevuPYMs2ezGgpG', NULL, NULL, '2024-03-06 16:03:49'),
(11141111, 'Matias ', 'Londoño', '1234', 2, 'fun1@gmail.com', '$2a$10$4XMb4wqCNBE5OQYVM/kg1.2Jgr/Lfw7uOo9H/aeWepzRSjggzOvM2', 3, 2005, '2024-03-06 17:35:18'),
(1013580753, 'Jhoann Sebastian', 'Zamudio', '3168184492', 1, 'sebas@gmail.com', '$2a$10$ixOW6qJFPFc.42PS3k6YsOcjNyI1e5J8IYGtLwPjULn5BJrPLyRq2', 1, 1001, '2024-03-06 16:01:31'),
(1016912184, 'Jhonatan', 'Aldir', '3203973723', 2, 'david@gmail.com', '$2a$10$mkovGLCf6/1uhHJnAjbVH.fl/yCEV0GZilkAPyDb872hZI233.z.C', 2, 2002, '2024-03-06 15:59:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `InstrumentoArchivistico`
--

CREATE TABLE `InstrumentoArchivistico` (
  `instrumento_archivistico_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `InstrumentoArchivistico`
--

INSERT INTO `InstrumentoArchivistico` (`instrumento_archivistico_id`, `nombre`) VALUES
(1001, 'NA'),
(2001, 'TVD'),
(2002, 'CCD'),
(2003, 'TRD'),
(2004, 'Inventarios'),
(2005, 'PGD'),
(2006, 'Pinar'),
(2007, 'SIC'),
(2008, 'TCA'),
(3001, 'Inventarios'),
(3002, 'NA'),
(4001, 'MOREQ'),
(4002, 'NA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol`
--

CREATE TABLE `Rol` (
  `rol_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Rol`
--

INSERT INTO `Rol` (`rol_id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Funcionario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RolPermiso`
--

CREATE TABLE `RolPermiso` (
  `rol_id` int(11) DEFAULT NULL,
  `permiso` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('1HhQMfKnsHbK8-wN8SxMhjsihXJe5L5G', 1709758611, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('1sUnD42ms0zcaSkWxjMT8a3fq9mdd376', 1709831867, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('X9v4jcWfiUQiJawRAKYoRcPmJozslQzh', 1709758613, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('cLHuFiKNVU_GIEz8j4Yc3XFjW5kKxUmf', 1709843816, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1013580753},\"flash\":{}}'),
('htyUOfy88-0Ozi2Iuq5eQ_8Kv3MM0f95', 1709761050, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('lqMiWALirtxRS_lYsNxPtX7LDRpmCrp9', 1709832926, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('sqYcyfPuKPFGJ_B3fIRPweeO0l0pzJKL', 1709843806, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1016912184},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UsuarioRol`
--

CREATE TABLE `UsuarioRol` (
  `usuario_id` int(11) DEFAULT NULL,
  `rol_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Asignaciones`
--
ALTER TABLE `Asignaciones`
  ADD PRIMARY KEY (`asignacion_id`),
  ADD KEY `documento_id` (`documento_id`),
  ADD KEY `evidencia_id` (`evidencia_id`);

--
-- Indices de la tabla `EquipoTrabajo`
--
ALTER TABLE `EquipoTrabajo`
  ADD PRIMARY KEY (`equipo_trabajo_id`);

--
-- Indices de la tabla `EvidenciaTrabajo`
--
ALTER TABLE `EvidenciaTrabajo`
  ADD PRIMARY KEY (`evidencia_trabajo_id`),
  ADD KEY `equipo_trabajo_id` (`equipo_trabajo_id`),
  ADD KEY `funcionario_id` (`funcionario_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indices de la tabla `Funcionario`
--
ALTER TABLE `Funcionario`
  ADD PRIMARY KEY (`documento_id`),
  ADD KEY `equipo_trabajo_id` (`equipo_trabajo_id`),
  ADD KEY `instrumento_archivistico_id` (`instrumento_archivistico_id`),
  ADD KEY `fk_rol` (`rol_id`);

--
-- Indices de la tabla `InstrumentoArchivistico`
--
ALTER TABLE `InstrumentoArchivistico`
  ADD PRIMARY KEY (`instrumento_archivistico_id`);

--
-- Indices de la tabla `Rol`
--
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `RolPermiso`
--
ALTER TABLE `RolPermiso`
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `UsuarioRol`
--
ALTER TABLE `UsuarioRol`
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Asignaciones`
--
ALTER TABLE `Asignaciones`
  MODIFY `asignacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `EvidenciaTrabajo`
--
ALTER TABLE `EvidenciaTrabajo`
  MODIFY `evidencia_trabajo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Asignaciones`
--
ALTER TABLE `Asignaciones`
  ADD CONSTRAINT `Asignaciones_ibfk_1` FOREIGN KEY (`documento_id`) REFERENCES `Funcionario` (`documento_id`),
  ADD CONSTRAINT `Asignaciones_ibfk_2` FOREIGN KEY (`evidencia_id`) REFERENCES `EvidenciaTrabajo` (`evidencia_trabajo_id`);

--
-- Filtros para la tabla `EvidenciaTrabajo`
--
ALTER TABLE `EvidenciaTrabajo`
  ADD CONSTRAINT `EvidenciaTrabajo_ibfk_1` FOREIGN KEY (`equipo_trabajo_id`) REFERENCES `EquipoTrabajo` (`equipo_trabajo_id`),
  ADD CONSTRAINT `EvidenciaTrabajo_ibfk_2` FOREIGN KEY (`funcionario_id`) REFERENCES `Funcionario` (`documento_id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `Funcionario` (`documento_id`);

--
-- Filtros para la tabla `Funcionario`
--
ALTER TABLE `Funcionario`
  ADD CONSTRAINT `Funcionario_ibfk_1` FOREIGN KEY (`equipo_trabajo_id`) REFERENCES `EquipoTrabajo` (`equipo_trabajo_id`),
  ADD CONSTRAINT `Funcionario_ibfk_2` FOREIGN KEY (`instrumento_archivistico_id`) REFERENCES `InstrumentoArchivistico` (`instrumento_archivistico_id`),
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`rol_id`) REFERENCES `Rol` (`rol_id`);

--
-- Filtros para la tabla `RolPermiso`
--
ALTER TABLE `RolPermiso`
  ADD CONSTRAINT `RolPermiso_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `Rol` (`rol_id`);

--
-- Filtros para la tabla `UsuarioRol`
--
ALTER TABLE `UsuarioRol`
  ADD CONSTRAINT `UsuarioRol_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Funcionario` (`documento_id`),
  ADD CONSTRAINT `UsuarioRol_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `Rol` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
