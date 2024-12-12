document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('nuevoProductoForm');

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', showHelp);
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nombreProducto = document.getElementById('nombreProducto').value;
        const descProducto = document.getElementById('descProducto').value;
        const categoriaProducto = document.getElementById('categoriaProducto').value;
        const fotosProducto = document.getElementById('fotosProducto').files;

        if (!nombreProducto || !descProducto || !categoriaProducto || fotosProducto.length === 0) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const formData = new FormData();
        formData.append('nombreProducto', nombreProducto);
        formData.append('descProducto', descProducto);
        formData.append('categoriaProducto', categoriaProducto);

        for (let i = 0; i < fotosProducto.length; i++) {
            formData.append('fotosProducto', fotosProducto[i]);
        }

        try {
            const response = await fetch('/api/productos', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Producto creado correctamente.',
                    icon: 'success'
                }).then(() => {
                    window.location.href = 'adminProductos.html';
                });
            } else {
                const errorText = await response.text();
                Swal.fire({
                    title: 'Error',
                    text: errorText || 'No se pudo crear el producto.',
                    icon: 'error'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error en el servidor.',
                icon: 'error'
            });
        }
    });
});

function showHelp(event) {
    const helpText = {
        nombreProducto: 'El nombre debe tener entre 2 y 20 caracteres.',
        descProducto: 'La descripción debe ser detallada para proporcionar una mejor experiencia a los usuarios.',
        categoriaProducto: 'Debe de ser una letra mayúscula (A- ARMARIO, M- MESA, C- COCINA, S- SILLA, B- BAÑO)',
        fotosProducto: 'Puedes seleccionar varias fotos del producto.',
    };

    const input = event.target;

    const helpContainer = document.getElementById('helpContainer');
    helpContainer.innerHTML = '';

    const helpDiv = document.createElement('div');
    helpDiv.className = 'help-text';
    helpDiv.textContent = helpText[input.id] || 'No hay información disponible.';
    helpContainer.appendChild(helpDiv);
}
