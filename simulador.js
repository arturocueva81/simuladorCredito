//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    // Leer ingresos y egresos como números decimales
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    // Llamar a la función calcularDisponible
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidad.toFixed(2);

    let monto = parseInt(document.getElementById("txtMonto").value);
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseInt(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes.toFixed(2);

    let total= calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + total.toFixed(2);

    let cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuota.toFixed(2);

    let esAprobado = aprobarCredito(capacidad, cuota);
    let componenteEstado = document.getElementById("spnEstadoCredito");

    if (esAprobado) {
        componenteEstado.textContent = "CREDITO APROBADO";
        componenteEstado.style.color = "green";
    } else {
        componenteEstado.textContent = "CREDITO RECHAZADO";
        componenteEstado.style.color = "red";
    }
}
document.getElementById("btnCalcularCredito").onclick = calcular;

function reiniciar() {
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnDisponible").textContent = "";
    document.getElementById("spnCapacidadPago").textContent = "";
    document.getElementById("spnInteresPagar").textContent = "";
    document.getElementById("spnTotalPrestamo").textContent = "";
    document.getElementById("spnCuotaMensual").textContent = "";

    let componenteEstado = document.getElementById("spnEstadoCredito");
    componenteEstado.textContent = "ANALIZANDO...";
    componenteEstado.style.color = "#2c3e50"; // Color original (gris oscuro/azul)
}

document.getElementById("btnReiniciar").onclick = reiniciar;