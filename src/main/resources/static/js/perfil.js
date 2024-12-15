document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const correoUsuario = sessionStorage.getItem('correoUsuario');
    const editButton = document.getElementById('editProfile');
    const editUser = document.getElementById('editUser');
    const cancelEdit = document.getElementById('cancelEdit');
    const mainMenu = document.getElementById('mainMenu');

    if (!nombreUsuario || !correoUsuario) {
        Swal.fire({
            icon: 'warning',
            title: 'No has iniciado sesión',
            text: 'Debes iniciar sesión para generar un presupuesto.',
            confirmButtonText: 'Aceptar'
        });
        window.location.href = 'login.html';
    } else {

        editButton.addEventListener('click', () => {
            editUser.style.display = 'grid';
            mainMenu.style.display = 'none';
        });

        cancelEdit.addEventListener('click', () => {
            editUser.style.display = 'none';
            mainMenu.style.display = 'grid';
        });
    }
});