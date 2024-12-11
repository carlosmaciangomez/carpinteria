document.addEventListener('DOMContentLoaded', () => {
    const idRes = getIdResenaFromUrl();
    if (idRes) {
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
            const tituloElement = document.getElementById('titulo');
            if (tituloElement) {
                tituloElement.textContent = resena.tituloResena || "Título no disponible";
            }

            const valContainer = document.getElementById('val');
            if (valContainer) {
                valContainer.innerHTML = '';
                const stars = createStars(resena.valoracionResena || 0);
                valContainer.appendChild(stars);
            }

            const fechaElement = document.getElementById('fecha');
            if (fechaElement) {
                fechaElement.textContent = `Fecha de publicación: ${resena.fechaResena || "Fecha no disponible"}`;
            }

            const descElement = document.getElementById('desc');
            if (descElement) {
                descElement.textContent = "Descripción: " + resena.descripcionResena || "Descripción no disponible";
            }

            if (resena.fotosResena && resena.fotosResena.length > 0) {
                const fotosResenaContainer = document.getElementById('fotosResena');
                if (fotosResenaContainer) {
                    fotosResenaContainer.innerHTML = '';
                    resena.fotosResena.forEach(foto => {
                        const img = document.createElement('img');
                        img.src = `/uploads/${foto}`;
                        img.alt = "Foto de la reseña";
                        fotosResenaContainer.appendChild(img);
                    });
                }
            }

            const acceptBtn = document.getElementById('accept');
            const denyBtn = document.getElementById('deny');
            const deleteBtn = document.getElementById('delete');

            if (resena.estadoResena === 'A') {
                acceptBtn.style.display = 'none';
                denyBtn.style.display = 'none';
            }

            acceptBtn.addEventListener('click', () => {
                cambiarEstadoResena(resena.idResena, 'A');
            });

            denyBtn.addEventListener('click', () => {
                cambiarEstadoResena(resena.idResena, 'D');
            });

            deleteBtn.addEventListener('click', () => {
                eliminarResena(resena.idResena);
            });
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
        star.style.color = i <= rating ? '#f5b301' : '#8f8f8f';
        star.style.fontSize = '2em';
        star.style.marginRight = '5px';
        starsContainer.appendChild(star);
    }

    return starsContainer;
}

function cambiarEstadoResena(id, estado) {
    fetch(`/api/resenas/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estadoResena: estado })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el estado de la reseña');
            }
            alert(`Reseña ${estado === 'A' ? 'aceptada' : 'denegada'}`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al cambiar el estado de la reseña:', error);
        });
}

function eliminarResena(id) {
    fetch(`/api/resenas/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar la reseña');
            }
            alert('Reseña eliminada');
            window.location.href = './adminResenas.html';
        })
        .catch(error => {
            console.error('Error al eliminar la reseña:', error);
        });
}