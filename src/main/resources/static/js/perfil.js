document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const correoUsuario = sessionStorage.getItem('correoUsuario');

    //Valida si está iniciado sesión y sino redirige a login
    if (!nombreUsuario || !correoUsuario) {
        Swal.fire({
            icon: 'warning',
            title: 'No has iniciado sesión',
            text: 'Debes iniciar sesión para ver tu perfil.',
            confirmButtonText: 'Iniciar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'login.html';
            }
        });
    }
});