$(principal);
function principal() {
    consulta_todo();
    escuchar_elementos();
}
function consulta_todo() {
    consulta_proveedores(function () {
        consultar_todos_los_productos_en_stock($("#proveedor").val());
    });
}
function consultar_todos_los_productos_en_stock(proveedor) {
    $.post("./modulos/inventario/consultar_todos_los_productos_en_stock.php",
        {
            proveedor: proveedor
        },
        function (respuesta) {
            dibujar_tabla(respuesta.decodificar());
        });
}
function consulta_proveedores(callback) {
    $.get("./modulos/proveedores/consultar_proveedores_en_productos.php", function (proveedores) {
        var f = JSON.parse(proveedores);
        llenar_select(f);
        callback();
    });
}
function escuchar_elementos() {
    $("#proveedor").change(function () {
        consultar_todos_los_productos_en_stock($(this).val());
    });
}
function llenar_select(proveedores) {
    var $contenedorProveedor = $("#proveedor");
    $contenedorProveedor
        .empty()
        .append(
            $("<option>", {
                val: "*",
                text: "--Todas--"
            })
        );
    proveedores.forEach(function (proveedor) {
        $contenedorProveedor.append(
            $("<option>", {
                val: proveedor.proveedor,
                text: proveedor.proveedor
            })
        );
    });
}
function dibujar_tabla(datos) {
    var longitud = datos.length,
        $cuerpoTabla = $("#cuerpo_tabla");
    $cuerpoTabla.empty();
    for (var x = 0; x < longitud; x++) {
        $cuerpoTabla.append(
            $("<tr>")
                .append(
                    $("<td>").html(datos[x].codigo),
                    $("<td>").html(datos[x].nombre),
                    $("<td>").html(datos[x].existencia),
                    $("<td>").html(datos[x].stock),
                    $("<td>").html(datos[x].proveedor)
                )
        );
    }

}