document.addEventListener('DOMContentLoaded', () => {
    const userId = sessionStorage.getItem('idUsuario');
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const correoUsuario = sessionStorage.getItem('correoUsuario');
    
    if (!nombreUsuario || !correoUsuario) {
        Swal.fire({
            icon: 'warning',
            title: 'No has iniciado sesión',
            text: 'Debes iniciar sesión para generar un presupuesto.',
            confirmButtonText: 'Aceptar'
        });
        window.location.href = 'login.html';
    } else {
        cargarUsuario(userId);

        document.getElementById('formUsuario').addEventListener('submit', (e) => {
            e.preventDefault();
            if (validarFormulario()) {
                actualizarUsuario(userId);
            }
        });

        const inputs = document.querySelectorAll('#formUsuario input');
        inputs.forEach(input => {
            input.addEventListener('focus', showHelp);
        });
    }
});

function showHelp(event) {
    const helpText = {
        'first-name': 'El nombre debe tener entre 2 y 20 caracteres.',
        'last-name': 'Los apellidos deben tener entre 2 y 45 caracteres.',
        'email': 'El correo debe tener un @ y un dominio válido.',
        'phone': 'El teléfono debe tener exactamente 9 números.',
        'password': 'La contraseña debe tener entre 2 y 20 caracteres, incluyendo letras mayúsculas, minúsculas, números y al menos un carácter especial.'
    };

    const input = event.target;


    const helpContainer = document.getElementById('helpContainer');
    helpContainer.innerHTML = '';


    const helpDiv = document.createElement('div');
    helpDiv.className = 'help-text';
    helpDiv.textContent = helpText[input.id];
    helpContainer.appendChild(helpDiv);
}

function cargarUsuario(id) {
    fetch(`http://localhost:8080/api/usuarios/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el usuario');
            }
            return response.json();
        })
        .then(usuario => {
            document.getElementById('first-name').value = usuario.nombreUsuario;
            document.getElementById('last-name').value = usuario.apellidosUsuario;
            document.getElementById('email').value = usuario.correoUsuario;
            document.getElementById('phone').value = usuario.telefonoUsuario;

        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al cargar el usuario.'
            });
        });
}

function validarFormulario() {
    let isValid = true;
    const helpContainer = document.getElementById('helpContainer');

    helpContainer.innerHTML = '';

    function showError(message) {
        const helpDiv = document.createElement('div');
        helpDiv.classList.add('help-text');
        helpDiv.style.color = 'red';
        helpDiv.textContent = message;
        helpContainer.appendChild(helpDiv);
    }

    const nombre = document.getElementById('first-name');
    const nombreValue = nombre.value.trim();
    if (nombreValue === '') {
        isValid = false;
        showError('El nombre no puede estar en blanco');
    } else if (nombreValue.length < 2 || nombreValue.length > 20) {
        isValid = false;
        showError('El nombre debe tener entre 2 y 20 caracteres.');
    }

    const apellidos = document.getElementById('last-name');
    const apellidosValue = apellidos.value.trim();
    if (apellidosValue === '') {
        isValid = false;
        showError('Los apellidos no pueden estar en blanco');
    } else if (apellidosValue.length < 2 || apellidosValue.length > 45) {
        isValid = false;
        showError('Los apellidos deben tener entre 2 y 45 caracteres.');
    }

    const correo = document.getElementById('email');
    const correoValue = correo.value.trim();
    const correoPattern = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    if (correoValue === '') {
        isValid = false;
        showError('El correo no puede estar en blanco');
    } else if (!correoPattern.test(correoValue)) {
        isValid = false;
        showError('El correo debe tener un @ y un dominio válido.');
    }

    const contrasena = document.getElementById('password');
    const contrasenaValue = contrasena.value.trim();
    const contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{2,20}$/;
    if (contrasenaValue === '') {
        isValid = false;
        showError('La contraseña no puede estar en blanco');
    } else if (!contrasenaPattern.test(contrasenaValue)) {
        isValid = false;
        showError('La contraseña debe tener entre 2 y 20 caracteres, incluyendo letras mayúsculas, minúsculas, números y al menos un carácter especial.');
    }

    const confirmContrasena = document.getElementById('confirm-password');
    const confirmContrasenaValue = confirmContrasena.value.trim();
    if (contrasenaValue !== confirmContrasenaValue) {
        isValid = false;
        showError('Las contraseñas no coinciden');
    }

    const telefono = document.getElementById('phone');
    const telefonoValue = telefono.value.trim();
    const telefonoPattern = /^\d{9}$/;
    if (telefonoValue === '') {
        isValid = false;
        showError('El teléfono no puede estar en blanco');
    } else if (!telefonoPattern.test(telefonoValue)) {
        isValid = false;
        showError('El teléfono debe tener exactamente 9 números.');
    }

    return isValid;
}

async function actualizarUsuario(id) {
    const bcrypt = dcodeIO.bcrypt;

    const usuario = {
        nombreUsuario: document.getElementById('first-name').value.trim(),
        apellidosUsuario: document.getElementById('last-name').value.trim(),
        correoUsuario: document.getElementById('email').value.trim(),
        telefonoUsuario: document.getElementById('phone').value.trim()
    };

    const contrasenaUsuario = document.getElementById('password').value.trim();
    if (contrasenaUsuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasenaUsuario = await bcrypt.hash(contrasenaUsuario, salt);
    }

    fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar el usuario: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            //console.log('Usuario actualizado:', data);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Usuario actualizado exitosamente.'
            }).then(() => {
                window.location.href = 'perfil.html';
            });
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar el usuario.'
            });
        });
}