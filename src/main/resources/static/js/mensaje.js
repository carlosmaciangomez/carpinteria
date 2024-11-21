document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const correoUsuario = sessionStorage.getItem('correoUsuario');
    const enviarButton = document.querySelector('button[type="submit"]');

    if (!nombreUsuario || !correoUsuario) {
        Swal.fire({
            icon: 'warning',
            title: 'No has iniciado sesión',
            text: 'Debes iniciar sesión para enviar un mensaje.',
            confirmButtonText: 'Aceptar'
        });
        enviarButton.disabled = true;
        enviarButton.classList.add('disabled');
    } else {
        document.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault();
            clearErrors();

            const correoContacto = document.getElementById("correoContacto").value;
            const asuntoMensaje = document.getElementById("asuntoMensaje").value;
            const textoMensaje = document.getElementById("textoMensaje").value;

            let errorMessages = [];

            if (!validateField(correoContacto, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                errorMessages.push("Introduce un correo válido.");
            }
            if (!validateField(asuntoMensaje, /.+/)) {
                errorMessages.push("El asunto no puede estar vacío.");
            }
            if (!validateField(textoMensaje, /.+/)) {
                errorMessages.push("La descripción del mensaje no puede estar vacía.");
            }

            if (errorMessages.length > 0) {
                displayError(errorMessages[0]);
                return;
            }

            fetch("/mensajes/send_message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correoUsuario: correoUsuario,
                    correoContacto: correoContacto,
                    asuntoMensaje: asuntoMensaje,
                    textoMensaje: textoMensaje
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en el servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Mensaje enviado con éxito',
                        showConfirmButton: false,
                        timer: 1400
                    }).then(() => {
                        document.querySelector('form').reset();
                    });
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error al enviar el mensaje: ${error.message}`,
                        confirmButtonText: 'OK'
                    });
                    console.error("Error:", error);
                });
        });
    }
});

//Función para validar campos
function validateField(value, regex) {
    return regex.test(value.trim());
}

//Función para mostrar mensajes de error
function displayError(errorMessage) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = errorMessage;
    errorDiv.style.display = "block";
}

//Función para limpiar mensajes de error
function clearErrors() {
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
}
