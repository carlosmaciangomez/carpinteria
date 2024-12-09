document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessageElement = document.getElementById('errorMessage');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();

        if (!correo || !contrasena) {
            errorMessageElement.textContent = 'Por favor, completa todos los campos.';
            errorMessageElement.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    correo: correo,
                    contrasena: contrasena
                })
            });

            if (response.ok) {
                const data = await response.json();
                const rolUsuario = data.rolUsuario;
                const nombreUsuario = data.nombreUsuario;

                sessionStorage.setItem('rolUsuario', rolUsuario);
                sessionStorage.setItem('nombreUsuario', nombreUsuario);
                sessionStorage.setItem('correoUsuario', correo);

                if (rolUsuario === 'A') {
                    window.location.href = 'administracion.html';
                } else if (rolUsuario === 'C') {
                    window.location.href = 'resenas.html';
                } else if (rolUsuario === 'O') {
                    window.location.href = 'index.html';
                }
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error en la autenticación. Por favor, revisa tus credenciales.';
                errorMessageElement.textContent = errorMessage;
                errorMessageElement.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessageElement.textContent = 'Ocurrió un error en el servidor.';
            errorMessageElement.style.display = 'block';
        }
    });
});
