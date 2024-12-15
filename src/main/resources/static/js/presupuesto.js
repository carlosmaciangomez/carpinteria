document.getElementById("generatePdf").addEventListener("click", async () => {
    // Obtener valores del formulario
    const name = document.getElementById("nombreUsuario").value;
    const email = document.getElementById("email").value;
    const dniCif = document.getElementById("dniCif").value;
    const phone = document.getElementById("telefono").value;
    const nombreMueble = document.getElementById("nombreMueble").value;
    const muebleDimensiones = document.getElementById("dimensionesMueble").value;
    const muebleUnidades = document.getElementById("unidadesMueble").value;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES');

    // Leer la plantilla PDF
    const pdfBytes = await fetch("plantilla.pdf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

    // Acceder a los campos de formulario
    const form = pdfDoc.getForm();

    // Asignar valores a los campos del PDF
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

    // Aquí es donde debes hacer coincidir los nombres de los campos en el PDF
    const muebleNombreField = form.getTextField("nombreMueble");  // "nombre" en PDF
    muebleNombreField.setText(nombreMueble);
    muebleNombreField.setFontSize(10);

    const muebleDimensionesField = form.getTextField("dimensionesMueble");  // "dimensiones" en PDF
    muebleDimensionesField.setText(muebleDimensiones);
    muebleDimensionesField.setFontSize(10);

    const muebleUnidadesField = form.getTextField("unidadesMueble");  // "unidades" en PDF
    muebleUnidadesField.setText(muebleUnidades);
    muebleUnidadesField.setFontSize(10);

    form.flatten();  // Convierte los campos en texto estático

    // Guardar el PDF modificado
    const pdfBytesOutput = await pdfDoc.save();

    // Descargar el PDF
    const blob = new Blob([pdfBytesOutput], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "presupuesto.pdf";
    link.click();
});