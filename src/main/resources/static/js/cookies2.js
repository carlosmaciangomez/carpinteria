document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const nombreUsuarioNav = document.getElementById('nombreUsuarioNav');

    if (nombreUsuario) {
        nombreUsuarioNav.textContent = nombreUsuario;
    }
});