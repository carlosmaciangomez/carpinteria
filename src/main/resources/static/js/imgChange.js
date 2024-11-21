document.getElementById("imgfile").src = "../img/user-interface.png";

document.getElementById("imagen").addEventListener('change', function () {
    let archivo = this.files[0];
    if (archivo.type.match('image.*')) {
        let tmpPath = URL.createObjectURL(archivo);
        document.getElementById("imgfile").setAttribute('src', tmpPath);
    } else {
        alert("No es un archivo de imagen");
    }
});