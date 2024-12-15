function generateForm(itemType) {
    let formHTML = '';

    if (itemType === 'armario') {
        formHTML = `
            <div class="form-item" data-type="armario">
                <h3>Armario</h3>
                <label for="armarioTipo">Tipo de Armario:</label>
                <input type="text" name="armarioTipo" placeholder="Ej. Armario de dos puertas">
                <label for="armarioDimensiones">Dimensiones (cm):</label>
                <input type="text" name="armarioDimensiones" placeholder="Ej. 120x60x200">
                <label for="armarioCantidad">Cantidad:</label>
                <input type="number" name="armarioCantidad" min="1" value="1">
                <button type="button" class="deleteButton">Eliminar</button>
            </div>
        `;
    } else if (itemType === 'mesa') {
        formHTML = `
            <div class="form-item" data-type="mesa">
                <h3>Mesa</h3>
                <label for="mesaTipo">Tipo de Mesa:</label>
                <input type="text" name="mesaTipo" placeholder="Ej. Mesa de comedor">
                <label for="mesaDimensiones">Dimensiones (cm):</label>
                <input type="text" name="mesaDimensiones" placeholder="Ej. 180x80x75">
                <label for="mesaCantidad">Cantidad:</label>
                <input type="number" name="mesaCantidad" min="1" value="1">
                <button type="button" class="deleteButton">Eliminar</button>
            </div>
        `;
    } else if (itemType === 'silla') {
        formHTML = `
            <div class="form-item" data-type="silla">
                <h3>Silla</h3>
                <label for="sillaTipo">Tipo de Silla:</label>
                <input type="text" name="sillaTipo" placeholder="Ej. Silla de oficina">
                <label for="sillaDimensiones">Dimensiones (cm):</label>
                <input type="text" name="sillaDimensiones" placeholder="Ej. 50x50x100">
                <label for="sillaCantidad">Cantidad:</label>
                <input type="number" name="sillaCantidad" min="1" value="1">
                <button type="button" class="deleteButton">Eliminar</button>
            </div>
        `;
    } else if (itemType === 'estanteria') {
        formHTML = `
            <div class="form-item" data-type="estanteria">
                <h3>Estantería</h3>
                <label for="estanteriaTipo">Tipo de Estantería:</label>
                <input type="text" name="estanteriaTipo" placeholder="Ej. Estantería de madera">
                <label for="estanteriaDimensiones">Dimensiones (cm):</label>
                <input type="text" name="estanteriaDimensiones" placeholder="Ej. 120x40x180">
                <label for="estanteriaCantidad">Cantidad:</label>
                <input type="number" name="estanteriaCantidad" min="1" value="1">
                <button type="button" class="deleteButton">Eliminar</button>
            </div>
        `;
    } else if (itemType === 'puerta') {
        formHTML = `
            <div class="form-item" data-type="puerta">
                <h3>Puerta</h3>
                <label for="puertaTipo">Tipo de Puerta:</label>
                <input type="text" name="puertaTipo" placeholder="Ej. Puerta de madera maciza">
                <label for="puertaDimensiones">Dimensiones (cm):</label>
                <input type="text" name="puertaDimensiones" placeholder="Ej. 80x200">
                <label for="puertaCantidad">Cantidad:</label>
                <input type="number" name="puertaCantidad" min="1" value="1">
                <button type="button" class="deleteButton">Eliminar</button>
            </div>
        `;
    } else if (itemType === 'suelo') {
        formHTML = `
            <div class="form-item" data-type="suelo">
                <h3>Suelo</h3>
                <label for="sueloArea">Área (m²):</label>
                <input type="number" name="sueloArea" min="1" placeholder="Ej. 20">
                <label for="sueloTipo">Tipo de Madera:</label>
                <input type="text" name="sueloTipo" placeholder="Ej. Roble, Nogal">
                <button type="button" class="deleteButton">Eliminar</button>
            </div>
        `;
    }

    document.getElementById('formContainer').insertAdjacentHTML('beforeend', formHTML);

    const deleteButton = document.querySelector('.form-item:last-child .deleteButton');
    deleteButton.addEventListener('click', function() {
        const formItem = this.closest('.form-item');
        formItem.remove();
    });
}

// Evento para añadir el formulario cuando se hace click en el botón
document.getElementById('addItemButton').addEventListener('click', function() {
    const selectedType = document.getElementById('itemSelector').value;
    generateForm(selectedType);
});

document.getElementById("generatePdf").addEventListener("click", async () => {
    // Obtener valores del formulario
    const name = document.getElementById("nombreUsuario").value;
    const email = document.getElementById("email").value;
    const dniCif = document.getElementById("dniCif").value;
    const phone = document.getElementById("telefono").value;

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

    // Opcional: eliminar los campos de formulario para que no sean editables
    form.flatten();  // Esto convierte los campos en texto estático, eliminando la interactividad

    // Guardar el PDF modificado
    const pdfBytesOutput = await pdfDoc.save();

    // Descargar el PDF
    const blob = new Blob([pdfBytesOutput], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "presupuesto.pdf";
    link.click();
});