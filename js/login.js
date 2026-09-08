document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const inputRun = document.getElementById("login-run");
  const inputPassword = document.getElementById("login-password");

  // 1. Limitar caracteres RUT
  if (inputRun) {
    inputRun.addEventListener("input", (e) => {
      let val = e.target.value.toUpperCase().replace(/[^0-9K\-]/g, "");
      if (val.length > 10) val = val.slice(0, 10);
      e.target.value = val;
    });
  }

  function mostrarError(id, mensaje) {
    const span = document.getElementById(id);
    if (span) {
      span.textContent = mensaje;
      span.style.display = "block";
    }
  }

  function limpiarErrores() {
    document.querySelectorAll(".msg-error").forEach(span => {
      span.textContent = "";
      span.style.display = "none";
    });
  }

  // 2. Procesar Login
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      limpiarErrores();

      const runIngresado = inputRun.value.trim().toUpperCase();
      const passwordIngresada = inputPassword.value;

      if (!runIngresado) {
        mostrarError("error-login-run", "Debe ingresar su RUN.");
        return;
      }

      if (!passwordIngresada) {
        mostrarError("error-login-password", "Debe ingresar su contraseña.");
        return;
      }

      // Buscar en los usuarios registrados en localStorage
      const usuarios = JSON.parse(localStorage.getItem("sonido_vivo_usuarios")) || [];

      const usuarioEncontrado = usuarios.find(
        u => u.run.toUpperCase() === runIngresado && u.password === passwordIngresada
      );

      if (usuarioEncontrado) {
        // Guardar sesión activa
        const sesionActiva = {
          run: usuarioEncontrado.run,
          nombre: usuarioEncontrado.nombre,
          email: usuarioEncontrado.email
        };
        localStorage.setItem("sonido_vivo_sesion", JSON.stringify(sesionActiva));

        actualizarEstadoAuthHeader();

        // Mostrar el modal
        const modal = document.getElementById("modal-exito-login");
        const saludo = document.getElementById("modal-login-saludo");
        const btnCatalogo = document.getElementById("btn-ir-catalogo");

        if (saludo) {
          const primerNombre = usuarioEncontrado.nombre.split(" ")[0];
          saludo.textContent = `¡Hola, ${primerNombre}!`;
        }

        if (modal) {
          modal.style.display = "flex";
        }

        if (btnCatalogo) {
          btnCatalogo.addEventListener("click", () => {
            window.location.href = "index.html";
          });
        }
      } else {
        mostrarError("error-login-password", "RUN o contraseña incorrectos.");
      }
    });
  }
});

function actualizarEstadoAuthHeader() {
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));
  const btnAuth = document.querySelector(".btn-auth");

  if (btnAuth && sesion) {
    const primerNombre = sesion.nombre.split(" ")[0];
    btnAuth.textContent = `Hola, ${primerNombre}`;
    btnAuth.href = "#";
    btnAuth.onclick = (e) => {
      e.preventDefault();
      if (confirm("¿Deseas cerrar sesión?")) {
        localStorage.removeItem("sonido_vivo_sesion");
        window.location.reload();
      }
    };
  }
}

// Actualizar el botón del Header si hay sesión activa en cualquier página
document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));
  const botonesAuth = document.querySelectorAll(".btn-auth-pill");

  if (sesion && sesion.nombre) {
    const primerNombre = sesion.nombre.split(" ")[0];
    
    botonesAuth.forEach(btn => {
      btn.textContent = `👋 Hola, ${primerNombre}`;
      btn.href = "perfil.html";
      
        btn.textContent = `👋 Hola, ${primerNombre}`;
      btn.href = "perfil.html"; // <-- Cambia el "#" por "perfil.html"
      btn.onclick = null;
    });
  }
});