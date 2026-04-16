//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIOfunction calcularDisponible(ingresos, egresos) {
let monto;
let tasa;
let plazo;

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

function calcularInteresSimple(monto, tasa, plazo) {
    let interes = plazo * monto * (tasa / 100);
    return interes;
}