document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const logoutButton = document.getElementById('logoutB');
    const registrosDiv = document.getElementById('noRegistro');
    const bienvenidaDiv = document.getElementById('bienvenida');
    const nombreUsuarioNav = document.getElementById('nombreUsuarioNav');
    const nombreUsuarioDisplay = document.getElementById('nombreUsuarioDisplay');

    if (nombreUsuario) {
        nombreUsuarioNav.textContent = nombreUsuario;
        nombreUsuarioDisplay.textContent = nombreUsuario;

        logoutButton.style.display = 'block';
        registrosDiv.style.display = 'none';
        bienvenidaDiv.style.display = 'block';
    } else {
        logoutButton.style.display = 'none';
        registrosDiv.style.display = 'block';
        bienvenidaDiv.style.display = 'none';
    }
});