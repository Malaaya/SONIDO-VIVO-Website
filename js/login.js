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
        // asignamos rol
        const esAdmin = (usuarioEncontrado.email === "admin@sonidovivo.cl" || usuarioEncontrado.run === "11111111-1");

        const sesionActiva = {
          run: usuarioEncontrado.run,
          nombre: usuarioEncontrado.nombre,
          email: usuarioEncontrado.email,
          rol: esAdmin ? "admin" : "cliente"
        };
        localStorage.setItem("sonido_vivo_sesion", JSON.stringify(sesionActiva));


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
          if (esAdmin) {
            btnCatalogo.textContent = "Ir al Panel Admin";
            btnCatalogo.onclick = () => { window.location.href = "admin.html"; };
          } else {
            btnCatalogo.textContent = "Ir a la Tienda";
            btnCatalogo.onclick = () => { window.location.href = "index.html"; };
          }
        }
        
        if (modal) {
          modal.style.display = "flex";
        }

        if (btnCatalogo) {
          if (esAdmin) {
            btnCatalogo.textContent = "Ir al Panel Admin";
            btnCatalogo.onclick = () => { window.location.href = "admin.html"; };
          } else {
            btnCatalogo.textContent = "Ir a la Tienda";
            btnCatalogo.onclick = () => { window.location.href = "index.html"; };
          }
        }
      } else {
        mostrarError("error-login-password", "RUN o contraseña incorrectos.");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const enlacesAdmin = document.querySelectorAll(".link-panel-admin");

  enlacesAdmin.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));

      if (sesion && sesion.rol === "admin") {
        window.location.href = "admin.html";
      } else {
        alert("Debes iniciar sesión con una cuenta de Administrador para acceder.");
        window.location.href = "login.html";
      }
    });
  });
});

// Actualizar el botón del Header si hay sesión activa en cualquier página
document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sonido_vivo_sesion"));
  const botonesAuth = document.querySelectorAll(".btn-auth-pill");

  if (sesion && sesion.nombre) {
    const primerNombre = sesion.nombre.split(" ")[0];
    

    botonesAuth.forEach(btn => {
      if (sesion.rol === "admin") {
        btn.textContent = `Admin: ${primerNombre}`;
        btn.href = "admin.html";
      } else {
        btn.textContent = `👋 Hola, ${primerNombre}`;
        btn.href = "perfil.html";
      }
      btn.onclick = null;
    });
  }
});