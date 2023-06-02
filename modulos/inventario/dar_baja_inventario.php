<?php
if( !isset( $_POST["numero_mercaderia"] ) ) exit();
#Definimos la raíz del directorio
if ( !defined( "RAIZ" ) ) 
{
    define( "RAIZ", dirname( dirname( dirname( __FILE__ ) ) ) );
}

$rowid = $_POST["rowid"];
$numero_mercaderia = $_POST["numero_mercaderia"];
$razon_baja = $_POST["razon_baja"];
require_once RAIZ . "/modulos/db.php";
require_once RAIZ . "/modulos/funciones.php";
require_once RAIZ . "/modulos/inventario/inventario.php";
inicia_sesion_segura();
if ($_SESSION["administrador"] !== 1) {
	echo json_encode("Tú no eres administrador");
	exit();
}  
$usuario = $_SESSION["nombre_de_usuario"];
$resultado = dar_baja( $rowid, $numero_mercaderia, $razon_baja, $usuario );
echo json_encode($resultado);
?>