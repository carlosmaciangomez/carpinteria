document.getElementById('imageUpload').addEventListener('change', function (event) {
    const imagePreview = document.getElementById('imagePreview');

    imagePreview.innerHTML = '';

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const img = document.createElement('img');
            img.src = e.target.result;

            img.addEventListener('click', function () {
                imagePreview.removeChild(imageContainer);
            });

            imageContainer.appendChild(img);
            imagePreview.appendChild(imageContainer);
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('resenaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('inputTitulo').value;
    const descripcion = document.querySelector('textarea[name="descripcion"]').value;
    const valoracion = document.querySelector('input[name="rating"]:checked');
    const imageUpload = document.getElementById('imageUpload');
    const fotosResena = [];

    for (let i = 0; i < imageUpload.files.length; i++) {
        fotosResena.push(imageUpload.files[i].name);
    }

    let errorMessage = '';
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = '';

    if (titulo.length < 2 || titulo.length > 55) {
        errorMessage += 'El título debe tener entre 2 y 55 caracteres. ';
    }

    if (descripcion.length < 2 || descripcion.length > 1000) {
        errorMessage += 'La descripción debe tener entre 2 y 1000 caracteres. ';
    }

    if (!valoracion) {
        errorMessage += 'Debes seleccionar una valoración. ';
    }

    if (fotosResena.length < 1) {
        errorMessage += 'Debes subir al menos una imagen. ';
    }

    if (errorMessage !== '') {
        errorMessagesDiv.innerHTML = errorMessage;
        return;
    }

    const resenaData = {
        tituloResena: titulo,
        descripcionResena: descripcion,
        valoracionResena: valoracion.value,
        estadoResena: "W",
        fotosResena: fotosResena
    };

    fetch('/api/resenas/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resenaData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al crear la reseña');
            }
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Reseña creada con éxito',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/resenas.html';
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al enviar la reseña',
            });
        });
});