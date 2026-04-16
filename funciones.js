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

function calcularTotalPagar(monto, interes) {
    let total = monto + interes + 100;
    return total;
}

function calcularCuotaMensual(total, plazoAnios) {
    let meses = plazoAnios * 12;
    let cuota = total / meses;
    return cuota;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago >= cuotaMensual) {
        return true;
    } else {
        return false;
    }
}