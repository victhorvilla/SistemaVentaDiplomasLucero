DROP TABLE IF EXISTS `bajas_inventario`;

CREATE TABLE `bajas_inventario` (
  `rowid` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_producto` text NOT NULL,
  `nombre_producto` text NOT NULL,
  `numero_mercaderia` decimal(11,2) NOT NULL,
  `razon_baja` text NOT NULL,
  `usuario` tinytext NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`rowid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `bajas_inventario` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `caja`;

CREATE TABLE `caja` (
  `rowid` int(11) NOT NULL AUTO_INCREMENT,
  `caja_chica` decimal(11,2) unsigned NOT NULL,
  `ventas` decimal(11,2) NOT NULL,
  `gastos` decimal(11,2) NOT NULL,
  `fecha` datetime NOT NULL,
  `no_venta` text NOT NULL,
  `usuario` tinytext NOT NULL,
  PRIMARY KEY (`rowid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `caja` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `datos_empresa`;

CREATE TABLE `datos_empresa` (
  `rowid` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` tinytext NOT NULL,
  `telefono` tinytext NOT NULL,
  `ruc` text DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `giro` text DEFAULT NULL,
  `codigo_postal` tinytext DEFAULT NULL,
  PRIMARY KEY (`rowid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


LOCK TABLES `datos_empresa` WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS `gastos`;

CREATE TABLE `gastos` (
  `rowid` int(11) NOT NULL AUTO_INCREMENT,
  `importe` decimal(11,2) unsigned NOT NULL,
  `concepto` text NOT NULL,
  `descripcion` text NOT NULL,
  `numero_remision` text DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `usuario` tinytext NOT NULL,
  PRIMARY KEY (`rowid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `gastos` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `inventario`;

CREATE TABLE `inventario` (
  `rowid` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` text NOT NULL,
  `nombre` text NOT NULL,
  `precio_compra` decimal(11,2) NOT NULL,
  `precio_venta` decimal(11,2) NOT NULL,
  `utilidad` decimal(11,2) NOT NULL,
  `existencia` decimal(11,2) NOT NULL,
  `stock` decimal(11,2) NOT NULL,
  `proveedor` tinytext NOT NULL,
  PRIMARY KEY (`rowid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `inventario` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `rowid` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` tinytext NOT NULL,
  `palabra_secreta` tinytext NOT NULL,
  `administrador` bit(1) NOT NULL,
  PRIMARY KEY (`rowid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `usuarios` WRITE;

INSERT INTO `usuarios` VALUES (1,'sergio','$2y$10$oAdnaAGkoy9n/dyR0Y4ZseoL4BzR8fdXrlMrxlrpGliGO14pWEb/e','');

UNLOCK TABLES;


DROP TABLE IF EXISTS `ventas`;

CREATE TABLE `ventas` (
  `numero_venta` int(11) NOT NULL,
  `codigo_producto` text NOT NULL,
  `nombre_producto` text NOT NULL,
  `total` decimal(11,2) NOT NULL,
  `fecha` datetime NOT NULL,
  `numero_productos` decimal(11,2) NOT NULL,
  `usuario` tinytext NOT NULL,
  `proveedor` tinytext NOT NULL,
  `utilidad` decimal(8,2) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `ventas` WRITE;

UNLOCK TABLES;

