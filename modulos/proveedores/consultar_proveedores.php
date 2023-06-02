<?php

if (!defined("RAIZ")) {
    define("RAIZ", dirname(dirname(dirname(__FILE__))));
}
require_once RAIZ . "/modulos/db.php";
require_once RAIZ . "/modulos/proveedores/proveedores.php";
$proveedores = consultar_proveedores();
echo json_encode($proveedores);