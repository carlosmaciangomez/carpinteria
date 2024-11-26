document.addEventListener('DOMContentLoaded', () => {
    const productosDiv = document.getElementById('productos');

    async function obtenerProductos() {
        try {
            const response = await fetch('/api/productos');
            
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const productos = await response.json();

            mostrarProductos(productos);

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

        const productosHTML = productos.map(producto => `
            <div class="producto">
                <img src="/uploads/${producto.fotosProducto[0]}" alt="Miniatura">
                <p>${producto.nombreProducto}</p>
            </div>
        `).join('');
        productosDiv.innerHTML = productosHTML;
    }
    obtenerProductos();
});