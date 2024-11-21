document.addEventListener('DOMContentLoaded', () => {
    fetch('/mensajes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de mensajes');
            }
            return response.json();
        })
        .then(data => {
            mostrarMensajes(data);
        })
        .catch(error => {
            console.error('Error cargando los mensajes:', error);
        });
});

function mostrarMensajes(mensajes) {
    const contenedor = document.getElementById('mensajesTable').getElementsByTagName('tbody')[0];

    if (contenedor) {
        contenedor.innerHTML = ''; // Limpiar la tabla

        mensajes.forEach(mensaje => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${mensaje.idMensaje}</td>
                <td>${mensaje.correoUsuario}</td>
                <td>${mensaje.asuntoMensaje}</td>
                <td>${mensaje.textoMensaje}</td>
                <td>${mensaje.correoContacto}</td>
            `;
            contenedor.appendChild(fila);
        });
    } else {
        console.error('No se encontró el contenedor de la tabla');
    }
}
