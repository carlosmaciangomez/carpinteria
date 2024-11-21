document.addEventListener('DOMContentLoaded', () => {
    const rolUsuario = sessionStorage.getItem('rolUsuario');

    if (rolUsuario === 'A') {
        window.location.href = 'error.html';
    }
});
