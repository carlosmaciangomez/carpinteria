document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const logoutButton = document.getElementById('logoutB');
    const nombreUsuarioNav = document.getElementById('nombreUsuarioNav');

    if (nombreUsuario) {
        nombreUsuarioNav.textContent = nombreUsuario;
        logoutButton.style.display = 'block';
    } else {
        logoutButton.style.display = 'none';
    }
});