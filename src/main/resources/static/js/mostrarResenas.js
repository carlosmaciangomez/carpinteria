document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/resenas?estado=A')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de resenas');
            }
            return response.json();
        })
        .then(data => {
            mostrarResenas(data);
        })
        .catch(error => {
            console.error('Error cargando las resenas:', error);
        });
});



function mostrarResenas(resenas) {
    const contenedor = document.getElementById('resenasContainer');
    if (contenedor) {
        contenedor.innerHTML = '';

        resenas.forEach(resena => {
            const enlace = document.createElement('a');
            enlace.href = `resena.html?idResena=${resena.idResena}`; 

            const article = document.createElement('article');
            
            const imagenSrc = resena.fotosResena[0];
            
            //console.log(imagenSrc);

            article.innerHTML = `
                <img src="${imagenSrc}" alt="Miniatura">
                <p>${resena.tituloResena}</p>
            `;

            enlace.appendChild(article);
            contenedor.appendChild(enlace);
        });
    } else {
        console.error('El contenedor de resenas no se encontró');
    }
}
