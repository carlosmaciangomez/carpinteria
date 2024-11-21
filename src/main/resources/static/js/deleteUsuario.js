document.addEventListener('DOMContentLoaded', () => {
    // Obtén el ID del usuario de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('idUsuario'); // Suponiendo que tu URL es algo como /editarUsuario.html?idUsuario=5

    // Agrega un event listener al botón de eliminar
    document.getElementById("deleteButton").addEventListener("click", function() {
        eliminarUsuario(userId);
    });
});

function eliminarUsuario(userId) {
    // Usar SweetAlert2 para pedir confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirma, hacer la petición DELETE
            fetch(`http://localhost:8080/api/usuarios/eliminarUsuario/${userId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire(
                        'Eliminado!',
                        'El usuario ha sido eliminado.',
                        'success'
                    );
                    // Redirigir a otra página o actualizar la lista de usuarios
                    window.location.href = "adminUsuarios.html"; // Cambia esto según sea necesario
                } else {
                    throw new Error("Error al eliminar el usuario: " + response.statusText);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire(
                    'Error!',
                    'No se pudo eliminar el usuario.',
                    'error'
                );
            });
        }
    });
}