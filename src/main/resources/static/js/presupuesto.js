/*
document.getElementById("generatePdf").addEventListener("click", async () => {
    try {
        // Obtener datos del formulario
        const furnitureType = document.getElementById("furnitureType").value;
        const furnitureDimensions = document.getElementById("furnitureDimensions").value;
        const furnitureQuantity = document.getElementById("furnitureQuantity").value;
        const floorArea = document.getElementById("floorArea").value;
        const woodType = document.getElementById("woodType").value;

        // Solicitar datos del usuario desde el backend
        const userResponse = await fetch("/api/user", { method: "GET" });
        if (!userResponse.ok) throw new Error("No se pudieron obtener los datos del usuario");
        const user = await userResponse.json();
        
        const userName = user.name || "N/A";
        const userEmail = user.email || "N/A";
        const userPhone = user.phone || "N/A";

        // Cargar plantilla PDF
        const existingPdfBytes = await fetch("plantilla.pdf").then(res => res.arrayBuffer());

        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        // Rellenar campos del PDF
        form.getTextField("furnitureTypeField").setText(furnitureType || "N/A");
        form.getTextField("furnitureDimensionsField").setText(furnitureDimensions || "N/A");
        form.getTextField("furnitureQuantityField").setText(furnitureQuantity || "0");
        form.getTextField("floorAreaField").setText(floorArea || "0");
        form.getTextField("woodTypeField").setText(woodType || "N/A");

        // Rellenar datos del usuario
        form.getTextField("nameField").setText(userName);
        form.getTextField("emailField").setText(userEmail);
        form.getTextField("phoneField").setText(userPhone);

        // Generar y descargar el PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "presupuesto.pdf";
        link.click();
    } catch (err) {
        console.error("Error:", err.message);
    }
});
*/

document.addEventListener('DOMContentLoaded', () => {
    const addMuebleButton = document.getElementById('addMueble');
    const addSueloButton = document.getElementById('addSuelo');

    // Función para añadir otro mueble
    addMuebleButton.addEventListener('click', () => {
        const mueblesSection = document.getElementById('muebles');
        const newMueble = document.createElement('div');
        newMueble.classList.add('mueble');
        
        newMueble.innerHTML = `
            <div>
                <label for="furnitureType">Tipo de Mueble:</label>
                <input type="text" class="furnitureType" name="furnitureType" placeholder="Ej. Mesa, Armario">
            </div>
            <div>
                <label for="furnitureDimensions">Dimensiones (cm):</label>
                <input type="text" class="furnitureDimensions" name="furnitureDimensions" placeholder="Ej. 120x60x80">
            </div>
            <div>
                <label for="furnitureQuantity">Cantidad:</label>
                <input type="number" class="furnitureQuantity" name="furnitureQuantity" min="1" value="1">
            </div>
        `;
        
        mueblesSection.appendChild(newMueble);
    });

    // Función para añadir otro suelo
    addSueloButton.addEventListener('click', () => {
        const suelosSection = document.getElementById('suelos');
        const newSuelo = document.createElement('div');
        newSuelo.classList.add('suelo');
        
        newSuelo.innerHTML = `
            <div>
                <label for="floorArea">Área (m²):</label>
                <input type="number" class="floorArea" name="floorArea" min="1" placeholder="Ej. 20">
            </div>
            <div>
                <label for="woodType">Tipo de Madera:</label>
                <input type="text" class="woodType" name="woodType" placeholder="Ej. Roble, Nogal">
            </div>
        `;
        
        suelosSection.appendChild(newSuelo);
    });

    // Función para generar el PDF (si lo necesitas más tarde)
    document.getElementById('generatePdf').addEventListener('click', () => {
        // Aquí iría tu lógica para generar el PDF
        alert('Generar el PDF');
    });
});
