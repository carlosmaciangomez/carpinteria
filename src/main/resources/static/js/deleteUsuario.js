document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('idUsuario');

    document.getElementById("deleteButton").addEventListener("click", function() {
        eliminarUsuario(userId);
    });
});

function eliminarUsuario(userId) {
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
                    window.location.href = "adminUsuarios.html";
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