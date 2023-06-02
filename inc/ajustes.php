<?php
if (!isset($_SESSION)) exit("<script>window.location.href = '../';</script>");
?>

<div class="row">
    <div class="col-xs-12">
        <h3 class="text-center">Datos de la empresa Diplomas Lucero <i class="fa fa-building"></i></h3>
        <p>Si no tienes algún dato o no quieres ponerlo, no importa, deja el campo vacío.</p>
    </div>
    <div class="col-xs-12">
        <div class="form-group">
            <label for="nombre">Nombre</label><input placeholder="Nombre" type="text" id="nombre" class="form-control">
        </div>
        <div class="form-group">
            <label for="nombre">Teléfono</label><input placeholder="Teléfono" type="tel" id="telefono" class="form-control">
        </div>
        <div class="form-group">
            <label for="ruc">RUC</label><input placeholder="RUC" type="text" id="ruc" class="form-control">
        </div>
        <div class="form-group">
            <label for="direccion">Dirección</label><input placeholder="Dirección" type="text" id="direccion" class="form-control">
        </div>
        <div class="form-group">
            <label for="giro">Giro o Rubro</label><input placeholder="Giro" type="text" id="giro" class="form-control">
        </div>
        <div class="form-group">
            <label for="cp">Código postal</label><input placeholder="Código postal" type="text" id="cp" class="form-control">
        </div>
        <div class="form-group">
            <label for="cp">Ciudad</label><input placeholder="Ciudad" type="text" id="ciudad" class="form-control">
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <div class="col-xs-12">
            <button id="guardar_datos" class="form-control btn btn-success">
                Guardar
            </button>
        </div>
    </div>
</div><br>
<div class="row"></div><br>
<script src="./js/ajustes.js"></script>