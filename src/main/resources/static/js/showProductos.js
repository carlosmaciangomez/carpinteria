document.addEventListener('DOMContentLoaded', () => {
    const productosDiv = document.getElementById('productos');

    async function obtenerProductos() {
        try {
            const response = await fetch('/api/productos');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const productos = await response.json();
            console.log('Productos obtenidos:', productos);
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
                <button class="eliminar-producto" data-id="${producto.idProducto}">Eliminar producto</button>
            </div>
        `).join('');
        productosDiv.innerHTML = productosHTML;

        const botonesEliminar = document.querySelectorAll('.eliminar-producto');
        botonesEliminar.forEach(boton => {
            const id = boton.dataset.id;
            if (!id) {
                console.warn('El producto no tiene un ID definido:', boton);
                return;
            }
            boton.addEventListener('click', () => eliminarProducto(id));
        });
    }

    async function eliminarProducto(idProducto) {
        try {
            const response = await fetch(`/api/productos/${idProducto}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            console.log(`Producto con ID ${idProducto} eliminado.`);
            obtenerProductos();
        } catch (error) {
            console.error('Error eliminando el producto:', error);
        }
    }

    obtenerProductos();
});