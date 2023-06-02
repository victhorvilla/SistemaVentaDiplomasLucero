<?php

function consultar_proveedores()
{
    global $base_de_datos;
    $sentencia = $base_de_datos->prepare("SELECT proveedor FROM ventas GROUP BY proveedor;");
    $sentencia->execute();
    return $sentencia->fetchAll();
}
function consultar_proveedores_en_productos()
{
    global $base_de_datos;
    $sentencia = $base_de_datos->prepare("SELECT proveedor FROM inventario GROUP BY proveedor;");
    $sentencia->execute();
    return $sentencia->fetchAll();
}