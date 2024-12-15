document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    const correoUsuario = sessionStorage.getItem('correoUsuario');
    const enviarButton = document.getElementById('generatePdf');
    if (!nombreUsuario || !correoUsuario) {
        Swal.fire({
            icon: 'warning',
            title: 'No has iniciado sesión',
            text: 'Debes iniciar sesión para generar un presupuesto.',
            confirmButtonText: 'Aceptar'
        });
        enviarButton.disabled = true;
        enviarButton.classList.add('disabled');
    } else {
        document.getElementById("generatePdf").addEventListener("click", async () => {
            //Obtener valores del formulario
            const name = document.getElementById("nombreUsuario").value;
            const email = document.getElementById("email").value;
            const dniCif = document.getElementById("dniCif").value;
            const phone = document.getElementById("telefono").value;
            const nombreMueble = document.getElementById("nombreMueble").value;
            const muebleDimensiones = document.getElementById("dimensionesMueble").value;
            const muebleUnidades = document.getElementById("unidadesMueble").value;

            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('es-ES');

            //Leer la plantilla PDF
            const pdfBytes = await fetch("plantilla.pdf").then(res => res.arrayBuffer());
            const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

            const form = pdfDoc.getForm();

            //Asignar valores a los campos del PDF
            const nombreUsuarioField = form.getTextField("nombreUsuario");
            nombreUsuarioField.setText(name);

            const emailField = form.getTextField("email");
            emailField.setText(email);

            const dniCifField = form.getTextField("dniCif");
            dniCifField.setText(dniCif);

            const telefonoField = form.getTextField("telefono");
            telefonoField.setText(phone);

            const fechaField = form.getTextField("fecha");
            fechaField.setText(formattedDate);


            const muebleNombreField = form.getTextField("nombreMueble"); //Campo del pdf editado
            muebleNombreField.setText(nombreMueble);
            muebleNombreField.setFontSize(10);

            const muebleDimensionesField = form.getTextField("dimensionesMueble");
            muebleDimensionesField.setText(muebleDimensiones);
            muebleDimensionesField.setFontSize(10);

            const muebleUnidadesField = form.getTextField("unidadesMueble");
            muebleUnidadesField.setText(muebleUnidades);
            muebleUnidadesField.setFontSize(10);

            form.flatten();  //Evita que se puedan editar los campos del PDF

            //Guardar el PDF modificado
            const pdfBytesOutput = await pdfDoc.save();

            //Descargar el PDF
            const blob = new Blob([pdfBytesOutput], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "presupuesto.pdf";
            link.click();
        });
    }
});