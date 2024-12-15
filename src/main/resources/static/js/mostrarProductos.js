document.addEventListener('DOMContentLoaded', () => {
    const productosDiv = document.getElementById('productos');
    const tipoProductoSelect = document.getElementById('tipoProducto');

    async function obtenerProductos() {
        try {
            const response = await fetch('/api/productos');

            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const productos = await response.json();

            mostrarProductos(productos);

            tipoProductoSelect.addEventListener('change', () => {
                const categoriaSeleccionada = tipoProductoSelect.value;
                const productosFiltrados = categoriaSeleccionada === 'T' 
                    ? productos
                    : productos.filter(producto => producto.categoriaProducto === categoriaSeleccionada);

                mostrarProductos(productosFiltrados);
            });

        } catch (error) {
            console.error('Error:', error);
            productosDiv.innerHTML = '<p>Error al cargar los productos. Inténtalo más tarde.</p>';
        }
    }

    function mostrarProductos(productos) {
        if (productos.length === 0) {
            productosDiv.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }

        const productosHTML = productos.map(producto => {
            const imagen = producto.fotosProducto[0] 
                ? `/uploads/${producto.fotosProducto[0]}`
                : '/static/default-image.jpg';

            return `
                <div class="producto">
                    <img src="${imagen}" alt="Miniatura">
                    <p>${producto.nombreProducto}</p>
                </div>
            `;
        }).join('');

        productosDiv.innerHTML = productosHTML;
    }

    obtenerProductos();
});
