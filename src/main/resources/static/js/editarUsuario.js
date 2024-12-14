document.addEventListener('DOMContentLoaded', () => {
    const userId = getUserIdFromUrl();
    cargarUsuario(userId);

    document.getElementById('editUserForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            actualizarUsuario(userId);
        }
    });

    const inputs = document.querySelectorAll('#editUserForm input');
    inputs.forEach(input => {
        input.addEventListener('focus', showHelp);
    });
});

function showHelp(event) {
    const helpText = {
        nombre: 'El nombre debe tener entre 2 y 20 caracteres.',
        apellidos: 'Los apellidos deben tener entre 2 y 45 caracteres.',
        correo: 'El correo debe tener un @ y un dominio válido.',
        contrasena: 'La contraseña debe tener entre 2 y 20 caracteres, incluyendo letras mayúsculas, minúsculas, números y al menos un carácter especial.',
        telefono: 'El teléfono debe tener exactamente 9 números.',
        estado: 'El estado debe ser una sola letra mayúscula: A, I, o S.',
        rol: 'El rol debe ser una sola letra mayúscula: A, C, o O.'
    };

    const input = event.target;

    
    const helpContainer = document.getElementById('helpContainer');
    helpContainer.innerHTML = '';

    
    const helpDiv = document.createElement('div');
    helpDiv.className = 'help-text';
    helpDiv.textContent = helpText[input.id] || 'No hay información disponible.';
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
            document.getElementById('nombre').value = usuario.nombreUsuario;
            document.getElementById('apellidos').value = usuario.apellidosUsuario;
            document.getElementById('correo').value = usuario.correoUsuario;
            document.getElementById('contrasena').value = usuario.contrasenaUsuario;
            document.getElementById('telefono').value = usuario.telefonoUsuario;
            document.getElementById('estado').value = usuario.estadoUsuario;
            document.getElementById('rol').value = usuario.rolUsuario;

            document.getElementById('username').textContent = usuario.nombreUsuario;
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

function actualizarUsuario(id) {
    const usuario = {
        nombreUsuario: document.getElementById('nombre').value,
        apellidosUsuario: document.getElementById('apellidos').value,
        correoUsuario: document.getElementById('correo').value,
        contrasenaUsuario: document.getElementById('contrasena').value,
        telefonoUsuario: document.getElementById('telefono').value,
        estadoUsuario: document.getElementById('estado').value,
        rolUsuario: document.getElementById('rol').value
    };

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
        console.log('Usuario actualizado:', data);
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario actualizado exitosamente.'
        }).then(() => {
            window.location.href = 'adminUsuarios.html';
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

function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('idUsuario');
    
    if (!id) {
        console.error('ID de usuario no encontrado en la URL');
        throw new Error('ID de usuario no encontrado en la URL');
    }
    
    return id;
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

    const nombre = document.getElementById('nombre');
    const nombreValue = nombre.value.trim();
    if (nombreValue === '') {
        isValid = false;
        showError('El nombre no puede estar en blanco');
    } else if (nombreValue.length < 2 || nombreValue.length > 20) {
        isValid = false;
        showError('El nombre debe tener entre 2 y 20 caracteres.');
    }

    const apellidos = document.getElementById('apellidos');
    const apellidosValue = apellidos.value.trim();
    if (apellidosValue === '') {
        isValid = false;
        showError('Los apellidos no pueden estar en blanco');
    } else if (apellidosValue.length < 2 || apellidosValue.length > 45) {
        isValid = false;
        showError('Los apellidos deben tener entre 2 y 45 caracteres.');
    }

    const correo = document.getElementById('correo');
    const correoValue = correo.value.trim();
    const correoPattern = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    if (correoValue === '') {
        isValid = false;
        showError('El correo no puede estar en blanco');
    } else if (!correoPattern.test(correoValue)) {
        isValid = false;
        showError('El correo debe tener un @ y un dominio válido.');
    }

    const contrasena = document.getElementById('contrasena');
    const contrasenaValue = contrasena.value.trim();
    const contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{2,20}$/;
    if (contrasenaValue === '') {
        isValid = false;
        showError('La contraseña no puede estar en blanco');
    } else if (!contrasenaPattern.test(contrasenaValue)) {
        isValid = false;
        showError('La contraseña debe tener entre 2 y 20 caracteres, incluyendo letras mayúsculas, minúsculas, números y al menos un carácter especial.');
    }

    const telefono = document.getElementById('telefono');
    const telefonoValue = telefono.value.trim();
    const telefonoPattern = /^\d{9}$/;
    if (telefonoValue === '') {
        isValid = false;
        showError('El teléfono no puede estar en blanco');
    } else if (!telefonoPattern.test(telefonoValue)) {
        isValid = false;
        showError('El teléfono debe tener exactamente 9 números.');
    }

    const estado = document.getElementById('estado');
    const estadoValue = estado.value.trim();
    const estadoPattern = /^[AIS]$/;
    if (estadoValue === '') {
        isValid = false;
        showError('El estado no puede estar en blanco');
    } else if (!estadoPattern.test(estadoValue)) {
        isValid = false;
        showError('El estado debe ser una sola letra mayúscula: A, I, o S.');
    }

    const rol = document.getElementById('rol');
    const rolValue = rol.value.trim();
    const rolPattern = /^[ACO]$/;
    if (rolValue === '') {
        isValid = false;
        showError('El rol no puede estar en blanco');
    } else if (!rolPattern.test(rolValue)) {
        isValid = false;
        showError('El rol debe ser una sola letra mayúscula: A, C, o O.');
    }

    return isValid;
}

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('contrasena');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.classList.add('hide');
    } else {
        passwordInput.type = 'password';
        this.classList.remove('hide');
    }
});