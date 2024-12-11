document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/resenas/todas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de reseñas');
            }
            return response.json();
        })
        .then(data => {
            mostrarResenas(data);
        })
        .catch(error => {
            console.error('Error cargando las reseñas:', error);
            mostrarMensajeError('No se pudieron cargar las reseñas. Inténtelo más tarde.');
        });
});

function mostrarResenas(resenas) {
    const tbody = document.querySelector('#resenasTabla tbody');
    if (!tbody) {
        console.error('No se encontró el tbody de la tabla');
        return;
    }

    tbody.innerHTML = '';

    if (resenas.length === 0) {
        mostrarMensajeError('No hay reseñas para mostrar.');
        return;
    }

    resenas.forEach(resena => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${resena.idResena}</td>
            <td>${resena.tituloResena}</td>
            <td>${resena.descripcionResena}</td>
            <td>${resena.fechaResena}</td>
            <td>${resena.valoracionResena}</td>
            <td>${resena.idUsuario}</td>
            <td>${resena.estadoResena}</td>
        `;

        fila.addEventListener('click', () => {
            window.location.href = `gestionarResena.html?idResena=${resena.idResena}`;
        });

        tbody.appendChild(fila);
    });
}

function mostrarMensajeError(mensaje) {
    const main = document.querySelector('main');
    const errorMensaje = document.createElement('p');
    errorMensaje.style.color = 'red';
    errorMensaje.textContent = mensaje;
    main.appendChild(errorMensaje);
}
