document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/usuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de usuarios');
            }
            return response.json();
        })
        .then(data => {
            mostrarUsuarios(data);
        })
        .catch(error => {
            console.error('Error cargando los usuarios:', error);
        });
});

function mostrarUsuarios(usuarios) {
    const contenedor = document.getElementById('usuariosTable');
    if (contenedor) {
        contenedor.innerHTML = '';

        const tabla = document.createElement('table');
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                </tr>
            </thead>
        `;
        const tbody = document.createElement('tbody');

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            
            fila.innerHTML = `
                <td>${usuario.idUsuario}</td>
                <td>${usuario.nombreUsuario}</td>
                <td>${usuario.apellidosUsuario}</td>
                <td>${usuario.correoUsuario}</td>
                <td>${usuario.telefonoUsuario}</td>
                <td>${usuario.rolUsuario}</td>
                <td>${usuario.estadoUsuario}</td>
            `;

            fila.addEventListener('click', () => {
                window.location.href = `editarUsuario.html?idUsuario=${usuario.idUsuario}`;
            });
            tbody.appendChild(fila);
        });
        tabla.appendChild(tbody);
        contenedor.appendChild(tabla);
    } else {
        console.error('El contenedor de usuarios no se encontró');
    }
}