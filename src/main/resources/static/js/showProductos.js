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
                <button class="eliminar-producto" data-id="${producto.idProducto}">Eliminar producto</button>
            </div>
        `).join('');
        productosDiv.innerHTML = productosHTML;

        // Agregar event listeners a los botones de eliminar
        const botonesEliminar = document.querySelectorAll('.eliminar-producto');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', async (e) => {
                const idProducto = e.target.dataset.id;

                if (!idProducto) {
                    console.error('El producto no tiene un ID definido.');
                    return;
                }

                // Mostrar confirmación con SweetAlert
                const { isConfirmed } = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Esta acción eliminará el producto de forma permanente.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                });

                if (isConfirmed) {
                    try {
                        const response = await fetch(`/api/productos/${idProducto}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            Swal.fire(
                                'Eliminado',
                                'El producto ha sido eliminado con éxito.',
                                'success'
                            );
                            obtenerProductos(); // Recargar la lista de productos
                        } else {
                            Swal.fire(
                                'Error',
                                'Hubo un problema al eliminar el producto.',
                                'error'
                            );
                        }
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                        Swal.fire(
                            'Error',
                            'Ocurrió un error al intentar eliminar el producto.',
                            'error'
                        );
                    }
                }
            });
        });
    }
    obtenerProductos();
});