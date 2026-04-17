function limpiarErrores() {
    document.getElementById("errIngresos").textContent = "";
    document.getElementById("errEgresos").textContent = "";
    document.getElementById("errMonto").textContent = "";
    document.getElementById("errPlazo").textContent = "";
    document.getElementById("errTasaInteres").textContent = "";
}

function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarError(idError) {
    document.getElementById(idError).textContent = "";
}

function validarIngresos() {
    let campo = document.getElementById("txtIngresos");
    let valor = campo.value.trim();

    if (valor === "") {
        mostrarError("errIngresos", "Los ingresos son obligatorios.");
        return false;
    }

    let numero = parseFloat(valor);

    if (isNaN(numero)) {
        mostrarError("errIngresos", "Ingrese un valor numérico válido.");
        return false;
    }

    if (numero <= 0) {
        mostrarError("errIngresos", "Los ingresos deben ser mayores que 0.");
        return false;
    }

    limpiarError("errIngresos");
    return true;
}

function validarEgresos() {
    let campo = document.getElementById("txtEgresos");
    let valor = campo.value.trim();

    if (valor === "") {
        mostrarError("errEgresos", "Los egresos son obligatorios.");
        return false;
    }

    let numero = parseFloat(valor);

    if (isNaN(numero)) {
        mostrarError("errEgresos", "Ingrese un valor numérico válido.");
        return false;
    }

    if (numero < 0) {
        mostrarError("errEgresos", "Los egresos no pueden ser negativos.");
        return false;
    }

    limpiarError("errEgresos");
    return true;
}

function validarMonto() {
    let campo = document.getElementById("txtMonto");
    let valor = campo.value.trim();

    if (valor === "") {
        mostrarError("errMonto", "El monto es obligatorio.");
        return false;
    }

    let numero = parseFloat(valor);

    if (isNaN(numero)) {
        mostrarError("errMonto", "Ingrese un valor numérico válido.");
        return false;
    }

    if (numero <= 0) {
        mostrarError("errMonto", "El monto debe ser mayor que 0.");
        return false;
    }

    limpiarError("errMonto");
    return true;
}

function validarPlazo() {
    let campo = document.getElementById("txtPlazo");
    let valor = campo.value.trim();

    if (valor === "") {
        mostrarError("errPlazo", "El plazo es obligatorio.");
        return false;
    }

    let numero = parseInt(valor);

    if (isNaN(numero)) {
        mostrarError("errPlazo", "Ingrese un número entero válido.");
        return false;
    }

    if (!Number.isInteger(Number(valor))) {
        mostrarError("errPlazo", "El plazo debe ser un número entero.");
        return false;
    }

    if (numero < 1 || numero > 30) {
        mostrarError("errPlazo", "El plazo debe estar entre 1 y 30 años.");
        return false;
    }

    limpiarError("errPlazo");
    return true;
}

function validarTasa() {
    let campo = document.getElementById("txtTasaInteres");
    let valor = campo.value.trim();

    if (valor === "") {
        mostrarError("errTasaInteres", "La tasa de interés es obligatoria.");
        return false;
    }

    let numero = parseFloat(valor);

    if (isNaN(numero)) {
        mostrarError("errTasaInteres", "Ingrese un valor numérico válido.");
        return false;
    }

    if (numero <= 0) {
        mostrarError("errTasaInteres", "La tasa debe ser mayor que 0.");
        return false;
    }

    if (numero > 100) {
        mostrarError("errTasaInteres", "La tasa no puede ser mayor que 100.");
        return false;
    }

    limpiarError("errTasaInteres");
    return true;
}

function validarFormulario() {
    let okIngresos = validarIngresos();
    let okEgresos = validarEgresos();
    let okMonto = validarMonto();
    let okPlazo = validarPlazo();
    let okTasa = validarTasa();

    return okIngresos && okEgresos && okMonto && okPlazo && okTasa;
}

function calcular() {
    if (!validarFormulario()) {
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidad.toFixed(2);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes.toFixed(2);

    let total = calcularTotalPagar(monto, interes);
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
    componenteEstado.style.color = "#2c3e50";

    limpiarErrores();
}

function iniciarValidacionesEnBlur() {
    document.getElementById("txtIngresos").addEventListener("blur", validarIngresos);
    document.getElementById("txtEgresos").addEventListener("blur", validarEgresos);
    document.getElementById("txtMonto").addEventListener("blur", validarMonto);
    document.getElementById("txtPlazo").addEventListener("blur", validarPlazo);
    document.getElementById("txtTasaInteres").addEventListener("blur", validarTasa);
}

document.getElementById("btnCalcularCredito").onclick = calcular;
document.getElementById("btnReiniciar").onclick = reiniciar;
iniciarValidacionesEnBlur();