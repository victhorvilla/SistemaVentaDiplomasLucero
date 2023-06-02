var un_dia_en_milisegundos = (24 * 60 * 60 * 1000),
    ayudante_total = 0,
    ayudante_utilidad = 0.0;
function Producto(numero, nombre) {
    this.numero = numero;
    this.nombre = nombre;
}

function Venta(numero_venta, fecha, nombre_producto, numero_productos, total, usuario, proveedor, utilidad) {
    this.numero_venta = numero_venta;
    this.fecha = fecha;
    this.lista_productos = [];
    this.numero_productos = parseFloat(numero_productos);
    this.total = total;
    this.lista_productos.push(new Producto(numero_productos, nombre_producto));
    this.usuario = usuario;
    this.proveedor = proveedor;
    this.utilidad = utilidad;
}

Venta.prototype.agrega_producto_lista = function (numero_productos, nombre_producto) {
    this.numero_productos += parseFloat(numero_productos);
    this.lista_productos.push(new Producto(numero_productos, nombre_producto));
};

Venta.prototype.productos_como_html = function () {
    var foo = "";
    for (var i = this.lista_productos.length - 1; i >= 0; i--) {
        foo +=
            this.lista_productos[i].nombre.toString()
            + ": <strong>"
            + this.lista_productos[i].numero.toString()
            + "</strong>"
            + "<br>";
    }
    return foo;
};

$(document).ready(function () {
    escuchar_elementos();
    poner_fechas();
    consulta_proveedores(function () {
        consulta_ventas_fecha($("#fecha_inicio").val(), $("#fecha_fin").val(), $("#proveedor").val());
    });
    $("li#elem_reportes").addClass("active");
});
function consulta_proveedores(callback) {
    $.get("./modulos/proveedores/consultar_proveedores.php", function (proveedores) {
        var f = JSON.parse(proveedores);
        llena_select_proveedores(f);
        callback();
    });
}
function fecha_justo_ahora() {
    var d = new Date($.now());
    var año = d.getFullYear();
    var mes_temporal = d.getMonth() + 1;
    var mes = (mes_temporal < 10) ? "0" + mes_temporal : mes_temporal;
    var dia = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
    var hora = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutos = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    return año + "-" + mes + "-" + dia + "T" + hora + ":" + minutos;
}


function fecha_justamente_mañana() {
    var d = new Date($.now() + un_dia_en_milisegundos);
    var año = d.getFullYear();
    var mes_temporal = d.getMonth() + 1;
    var mes = (mes_temporal < 10) ? "0" + mes_temporal : mes_temporal;
    var dia = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
    var hora = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutos = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    return año + "-" + mes + "-" + dia + "T" + hora + ":" + minutos;
}


function fecha_de_hoy() {
    var d = new Date($.now());
    var año = d.getFullYear();
    var mes_temporal = d.getMonth() + 1;
    var mes = (mes_temporal < 10) ? "0" + mes_temporal : mes_temporal;
    var dia = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
    var hora = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutos = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    return año + "-" + mes + "-" + dia + "T00:00";
}

function fecha_de_mañana() {
    var d = new Date($.now());
    var año = d.getFullYear();
    var mes_temporal = d.getMonth() + 1;
    var mes = (mes_temporal < 10) ? "0" + mes_temporal : mes_temporal;
    var dia = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
    var hora = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutos = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    return año + "-" + mes + "-" + dia + "T23:59";
}


function poner_fechas() {
    $("#fecha_inicio").val(fecha_de_hoy());
    $("#fecha_fin").val(fecha_de_mañana());
}
function escuchar_elementos() {
    $("#fecha_inicio, #fecha_fin, #proveedor").on("change", function () {
        consulta_ventas_fecha($("#fecha_inicio").val(), $("#fecha_fin").val(), $("#proveedor").val());
    });

    $("#generar_reporte").click(function () {
        window.print();
    });
}
function llena_select_proveedores(proveedores) {
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

function consulta_ventas_fecha(fecha_inicio, fecha_fin, proveedor) {
    $.post('./modulos/ventas/consultar_todas_las_ventas.php', {
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        proveedor: proveedor
    }, function (respuesta) {
        respuesta = JSON.parse(respuesta);
        if (respuesta !== false) {
            consulta_ventas_por_proveedor(fecha_inicio, fecha_fin);
            dibuja_tabla_ventas(respuesta);
        } else {
            //Manejar error o respuesta
        }
    });
}
function dibuja_tabla_ventas_por_proveedor(ventas) {
    var $contenedorReportePorProveedor = $("#contenedor_tabla_por_proveedor"),
        total_por_proveedor = 0.0,
        utilidad_por_proveedor = 0.0;
    $contenedorReportePorProveedor.empty();
    ventas.forEach(function (a) {
            total_por_proveedor += parseFloat(a.total);
            utilidad_por_proveedor += parseFloat(a.utilidad);
            $contenedorReportePorProveedor
                .append(
                    '<tr>' +
                    '<td>' +
                    (a.proveedor === "" ? "--Sin proveedor--" : a.proveedor) +
                    '</td>' +
                    '<td> $' +
                    a.total +
                    '</td>' +
                    '<td>' +
                    '<strong>$' +
                    a.utilidad +
                    '</strong>' +
                    '</td>' +
                    '</tr>'
                );
        }
    );
    $contenedorReportePorProveedor
        .append(
            '<tr class="success">' +
            '<td>' +
            'Totales' +
            '</td>' +
            '<td> $' +
            total_por_proveedor +
            '</td>' +
            '<td>' +
            '<strong>$' +
            utilidad_por_proveedor +
            '</strong>' +
            '</td>' +
            '</tr>'
        );
}
function consulta_ventas_por_proveedor(fecha_inicio, fecha_fin) {
    $.post('./modulos/ventas/consultar_todas_las_ventas_por_proveedor.php', {
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin
    }, function (respuesta) {
        respuesta = JSON.parse(respuesta);
        if (respuesta !== false) {
            dibuja_tabla_ventas_por_proveedor(respuesta);
        } else {
            //Manejar error o respuesta
        }
    });
}
function dame_posicion_venta(ventas, numero_venta) {
    for (var i = ventas.length - 1; i >= 0; i--) {
        if (ventas[i].numero_venta === numero_venta) return i;
    }
    return -1;
}

function dibuja_tabla_ventas(ventas) {
    $("#mostrar_total").text("").parent().hide();
    $("#generar_reporte").hide();
    $("#contenedor_tabla")
        .empty();
    if (ventas.length <= 0) return;
    ayudante_total = 0;
    ayudante_utilidad = 0;
    $("#contenedor_tabla")
        .append(
            $("<table>")
                .addClass('table table-bordered table-striped table-hover table-condensed')
                .append(
                    $("<thead>")
                        .append(
                            $("<tr>")
                                .append(
                                    $("<th>")
                                        .html('Número de venta'),

                                    $("<th>")
                                        .html('Fecha'),

                                    $("<th>")
                                        .html('Productos'),

                                    $("<th>")
                                        .html('Número de productos'),

                                    $("<th>")
                                        .html('Total'),

                                    $("<th>")
                                        .html('Utilidad'),

                                    $("<th>")
                                        .html('Usuario')
                                )
                        )
                )
                .append(
                    $("<tbody>")
                )
        );
    var ayudante_numero_venta = undefined,
        numero_productos = 0.0;
    var ventas_totales = [];
    var subtotal = 0,
        subtotal_utilidad = 0;
    for (var i = ventas.length - 1; i >= 0; i--) {
        subtotal = ventas[i].total;
        subtotal_utilidad = ventas[i].utilidad;
        if (ayudante_numero_venta === ventas[i].numero_venta) {
            var posicion = dame_posicion_venta(ventas_totales, ventas[i].numero_venta);
            ventas_totales[posicion].agrega_producto_lista(ventas[i].numero_productos, ventas[i].nombre_producto);
            ventas_totales[posicion].total = parseFloat(ventas_totales[posicion].total) + parseFloat(subtotal);
            ventas_totales[posicion].utilidad = parseFloat(ventas_totales[posicion].utilidad) + parseFloat(subtotal_utilidad);
            numero_productos += parseFloat(ventas[i].numero_productos);
        } else {
            ventas_totales.push(
                new Venta(
                    ventas[i].numero_venta,
                    ventas[i].fecha,
                    ventas[i].nombre_producto,
                    parseFloat(ventas[i].numero_productos),
                    subtotal,
                    ventas[i].usuario,
                    ventas[i].proveedor,
                    subtotal_utilidad
                )
            );
            ayudante_numero_venta = ventas[i].numero_venta;
        }
    }
    for (var i = ventas_totales.length - 1; i >= 0; i--) {
        ayudante_total += parseFloat(ventas_totales[i].total);
        ayudante_utilidad += parseFloat(ventas_totales[i].utilidad);
        $("#contenedor_tabla tbody")
            .append(
                $("<tr>")
                    .append(
                        $("<td>").html(ventas_totales[i].numero_venta),
                        $("<td>").html(ventas_totales[i].fecha),
                        $("<td>").html(ventas_totales[i].productos_como_html()),
                        $("<td>").html(ventas_totales[i].numero_productos),
                        $("<td>").html("$" + ventas_totales[i].total),
                        $("<td>").html("$" + ventas_totales[i].utilidad),
                        $("<td>").html(ventas_totales[i].usuario)
                    )
            );
    }
    $("#contenedor_tabla").animateCss("fadeInUp");
    $("#mostrar_total").text(ayudante_total).parent().show();
    $("#mostrar_utilidad").text(ayudante_utilidad).parent().show();
    $("#generar_reporte").show();
}