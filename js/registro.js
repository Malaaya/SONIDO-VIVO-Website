
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-registro");
    const inputRun = document.getElementById("run");

    // 1. Limitador de caracteres
    if (inputRun) {
        inputRun.addEventListener("input", (e) => {
        let val = e.target.value.toUpperCase().replace(/[^0-9K\-]/g, "");
        if (val.length > 10) val = val.slice(0, 10);
        e.target.value = val;
        });
    }

  // 2. Algoritmo para RUT chileno
    function validarRutChileno(rutCompleto) {
        const limpio = rutCompleto.replace(/[^0-9kK]/g, "").toUpperCase();
        if (limpio.length < 8) return false;

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i), 10);
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvCalculado = 11 - (suma % 11);
    let dvEsperado = "";
    if (dvCalculado === 11) dvEsperado = "0";
    else if (dvCalculado === 10) dvEsperado = "K";
    else dvEsperado = dvCalculado.toString();

    return dv === dvEsperado;
    }

    function mostrarError(id, mensaje) {
        const span = document.getElementById(id);
        if (span) {
        span.textContent = mensaje;
        span.style.display = "block";
        }
    }

    // 3. Captura del evento submit y despliegue del modal
    if (form) {
        form.addEventListener("submit", (e) => {
        e.preventDefault();
        let esValido = true;

        // Limpiar mensajes de error previos
        document.querySelectorAll(".msg-error").forEach(span => {
            span.textContent = "";
            span.style.display = "none";
        });

        const run = document.getElementById("run").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm-password").value;

        if (!validarRutChileno(run)) {
            mostrarError("error-run", "El RUN ingresado no es válido (ej: 19876543-4).");
            esValido = false;
        }

        if (nombre.length < 3) {
            mostrarError("error-nombre", "Ingrese un nombre y apellido válido.");
            esValido = false;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            mostrarError("error-email", "Ingrese un correo electrónico válido.");
            esValido = false;
        }

        if (telefono.length < 8) {
            mostrarError("error-telefono", "Ingrese un teléfono de contacto válido.");
            esValido = false;
        }

        if (password.length < 6) {
            mostrarError("error-password", "La contraseña debe tener al menos 6 caracteres.");
            esValido = false;
        } else if (password !== confirm) {
            mostrarError("error-confirm", "Las contraseñas no coinciden.");
            esValido = false;
        }

        // 4. Guardar en localStorage y mostrar el modal
        if (esValido) {
            const usuarios = JSON.parse(localStorage.getItem("sonido_vivo_usuarios")) || [];

        if (usuarios.some(u => u.run === run)) {
            mostrarError("error-run", "Este RUN ya se encuentra registrado.");
            return;
        }

        usuarios.push({ run, nombre, email, telefono, password });
        localStorage.setItem("sonido_vivo_usuarios", JSON.stringify(usuarios));

        const modal = document.getElementById("modal-exito-registro");
        const btnIrLogin = document.getElementById("btn-ir-login");

        if (modal) {
            modal.style.display = "flex";
        }

        if (btnIrLogin) {
            btnIrLogin.addEventListener("click", () => {
            window.location.href = "login.html";
            });
        }
        }
    });
    }
});