//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIOfunction calcularDisponible(ingresos, egresos) {
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible) {
    let capacidad = montoDisponible * 0.5;
    return capacidad;
}