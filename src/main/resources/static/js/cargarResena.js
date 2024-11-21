document.addEventListener('DOMContentLoaded', () => {
    const idRes = getIdResenaFromUrl();
    if (idRes) {
        //console.log(`ID de reseña obtenido: ${idRes}`);
        cargarResena(idRes);
    } else {
        console.error('No se encontró un ID de reseña en la URL.');
    }
});

function getIdResenaFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('idResena');
}

function cargarResena(idResena) {
    fetch(`/api/resenas/${idResena}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar la reseña: ${response.status}`);
            }
            return response.json();
        })
        .then(resena => {
            //console.log('Reseña recibida:', resena);

            // Título
            const tituloElement = document.getElementById('titulo');
            if (tituloElement) {
                tituloElement.textContent = resena.tituloResena || "Título no disponible";
            } else {
                console.error("No se encontró el elemento con ID 'titulo'.");
            }

            // Valoración en estrellas
            const valContainer = document.getElementById('val');
            if (valContainer) {
                valContainer.innerHTML = '';
                const stars = createStars(resena.valoracionResena || 0);
                valContainer.appendChild(stars);
            } else {
                console.error("No se encontró el elemento con ID 'val'.");
            }

            // Fecha
            const fechaElement = document.getElementById('fecha');
            if (fechaElement) {
                fechaElement.textContent = `Fecha de publicación: ${resena.fechaResena || "Fecha no disponible"}`;
            } else {
                console.error("No se encontró el elemento con ID 'fecha'.");
            }

            // Descripción
            const descElement = document.getElementById('desc');
            if (descElement) {
                descElement.textContent = resena.descripcionResena || "Descripción no disponible";
            } else {
                console.error("No se encontró el elemento con ID 'desc'.");
            }

            // Fotos
            if (resena.fotosResena && resena.fotosResena.length > 0) {
                const thumbnailContainer = document.getElementById('thumbnailContainer');
                if (thumbnailContainer) {
                    thumbnailContainer.innerHTML = ''; // Limpia las imágenes anteriores
                    resena.fotosResena.forEach(foto => {
                        const img = document.createElement('img');
                        img.src = `/uploads/${foto}`; // Ajusta la ruta según tu servidor
                        img.alt = "Foto de la reseña";
                        img.className = "thumbnail";
                        thumbnailContainer.appendChild(img);
                    });
                } else {
                    console.error("No se encontró el elemento con ID 'thumbnailContainer'.");
                }
            } else {
                console.warn('No hay fotos disponibles para esta reseña.');
            }
        })
        .catch(error => {
            console.error('Error al cargar la reseña:', error);
        });
}

function createStars(rating) {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        star.style.color = i <= rating ? '#f5b301' : '#8f8f8f'; // Amarillo si está seleccionada, gris si no
        star.style.fontSize = '2em';
        star.style.marginRight = '5px';
        starsContainer.appendChild(star);
    }

    return starsContainer;
}
