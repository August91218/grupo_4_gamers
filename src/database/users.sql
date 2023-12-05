-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2023 a las 15:02:00
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `database`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` smallint(5) NOT NULL,
  `fullName` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(30) NOT NULL,
  `avatar` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

--
-- Estructura de tabla para la tabla `order`
--
CREATE TABLE `order` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_user` smallint(5) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  -- Otros campos relacionados con la orden
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices de la tabla `order`
--
ALTER TABLE `order`
  ADD INDEX `id_user` (`id_user`);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
