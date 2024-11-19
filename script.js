document.getElementById('ecg-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita la recarga de la página.

    // Captura de datos del formulario
    const pacienteID = document.getElementById('paciente-id').value;
    const frecuenciaCardiaca = parseInt(document.getElementById('frecuencia-cardiaca').value);
    const intervaloQT = parseFloat(document.getElementById('intervalo-qt').value);
    const amplitudR = parseFloat(document.getElementById('amplitud-r').value);
    const segmentoST = parseFloat(document.getElementById('segmento-st').value);
    const ondaP = parseFloat(document.getElementById('onda-p').value);
    const complejoQRS = parseFloat(document.getElementById('complejo-qrs').value);
    const ondaT = parseFloat(document.getElementById('onda-t').value);
    const ritmo = document.getElementById('ritmo').value.trim();

    const resultado = [];
    let diagnosticoECV = "";

    // Lógica de diagnóstico
    if (frecuenciaCardiaca < 60) resultado.push("Bradicardia (latidos bajos)");
    else if (frecuenciaCardiaca > 100) resultado.push("Taquicardia (latidos altos)");

    if (intervaloQT < 350) resultado.push("Intervalo QT corto");
    else if (intervaloQT > 450) resultado.push("Intervalo QT prolongado");

    if (amplitudR < 0.8) resultado.push("Baja amplitud de la onda R");
    else if (amplitudR > 1.5) resultado.push("Elevada amplitud de la onda R");

    if (segmentoST > 0.2) resultado.push("Elevación del segmento ST");
    else if (segmentoST < -0.2) resultado.push("Depresión del segmento ST");

    if (ondaP < 0.1) resultado.push("Onda P baja");
    else if (ondaP > 0.25) resultado.push("Onda P elevada");

    if (complejoQRS < 80) resultado.push("Complejo QRS estrecho");
    else if (complejoQRS > 120) resultado.push("Complejo QRS ancho");

    if (ondaT < 0.5) resultado.push("Onda T plana o invertida");
    else if (ondaT > 1.5) resultado.push("Onda T elevada");

    if (ritmo.toLowerCase() !== "sinusal") resultado.push(`Ritmo anormal detectado: ${ritmo}`);

    // Lógica de detección de Enfermedades Cardiovasculares
    if (resultado.includes("Bradicardia (latidos bajos)") && resultado.includes("Intervalo QT corto")) {
        diagnosticoECV = "Síndrome del QT corto asociado a bradicardia";
    } else if (resultado.includes("Elevación del segmento ST")) {
        diagnosticoECV = "Posible infarto agudo de miocardio";
    } else if (resultado.includes("Complejo QRS estrecho")) {
        diagnosticoECV = "Posible taquicardia supraventricular";
    } else if (ritmo.toLowerCase() !== "sinusal") {
        diagnosticoECV = "Arritmia significativa detectada";
    }
    else if (ritmo.toLowerCase() === "fibrilación auricular") {
        diagnosticoECV = "Ritmo de fibrilación auricular detectado. Se recomienda una evaluación más detallada.";
    }

    // Si se detectan signos de ECV pero no se cumple ninguna condición anterior    
    else if 
        (resultado.includes("Taquicardia (latidos altos)") || resultado.includes("Intervalo QT prolongado") || resultado.includes("Elevada amplitud de la onda R") || resultado.includes("Depresión del segmento ST") || resultado.includes("Onda P elevada") || resultado.includes("Complejo QRS ancho") || resultado.includes("Onda T elevada")) {
        diagnosticoECV = "Se detectaron signos de enfermedades cardiovasculares. Se recomienda una evaluación más detallada.";
        }
    // Agregar 5 enfermedades cardiovasculares comunes

    // #1
    else if (resultado.includes("Bradicardia (latidos bajos)") && resultado.includes("Intervalo QT corto") && resultado.includes("Baja amplitud de la onda R") && resultado.includes("Elevación del segmento ST") && resultado.includes("Onda P baja")) {
        diagnosticoECV = "Posible bloqueo cardíaco";
    }
    // #2
    else if (resultado.includes("Taquicardia (latidos altos)") && resultado.includes("Intervalo QT prolongado") && resultado.includes("Elevada amplitud de la onda R") && resultado.includes("Depresión del segmento ST") && resultado.includes("Onda P elevada")) {
        diagnosticoECV = "Posible hipertrofia ventricular";
    }

    // #3 Enfermedad coronaria
    else if (resultado.includes("Elevación del segmento ST") && resultado.includes("Complejo QRS ancho") && resultado.includes("Onda T elevada")) {
        diagnosticoECV = "Posible enfermedad coronaria";
    }

    // #4 Insuficiencia cardíaca
    else if (resultado.includes("Bradicardia (latidos bajos)") && resultado.includes("Elevación del segmento ST") && resultado.includes("Complejo QRS ancho") && resultado.includes("Onda T elevada")) {
        diagnosticoECV = "Posible insuficiencia cardíaca";
    }

    // #5 Arritmia
    else if (resultado.includes("Elevación del segmento ST") && resultado.includes("Onda P elevada") && resultado.includes("Complejo QRS ancho") && resultado.includes("Onda T elevada")) {
        diagnosticoECV = "Posible arritmia";
    }

    // #6 Infarto agudo de miocardio
    else if (resultado.includes("Elevación del segmento ST") && resultado.includes("Onda P elevada") && resultado.includes("Complejo QRS ancho") && resultado.includes("Onda T elevada")) {
        diagnosticoECV = "Posible infarto agudo de miocardio";
    }

    // #7 Taquicardia supraventricular
    else if (resultado.includes("Taquicardia (latidos altos)") && resultado.includes("Intervalo QT prolongado") && resultado.includes("Elevada amplitud de la onda R") && resultado.includes("Depresión del segmento ST") && resultado.includes("Onda P elevada")) {
        diagnosticoECV = "Posible taquicardia supraventricular";
    }

    // #8 Accidente cerebrovascular
    else if (resultado.includes("Bradicardia (latidos bajos)") && resultado.includes("Intervalo QT corto") && resultado.includes("Baja amplitud de la onda R") && resultado.includes("Elevación del segmento ST") && resultado.includes("Onda P baja")) {
        diagnosticoECV = "Posible accidente cerebrovascular";
    }

    // Si no se detectan signos de ECV ECG normal
     else {
        diagnosticoECV = "No se detectaron signos de enfermedades cardiovasculares. Electrocardiograma dentro de los límites normales.";
    }



    // Crear la tabla de resultados
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Limpiar resultados previos

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped');

    // Encabezados
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Parámetro</th>
            <th>Valor</th>
        </tr>
    `;
    table.appendChild(thead);

    // Cuerpo de la tabla
    const tbody = document.createElement('tbody');
    const parametros = [
        ['ID del paciente', pacienteID],
        ['Frecuencia cardíaca', `${frecuenciaCardiaca} bpm`],
        ['Intervalo QT', `${intervaloQT} ms`],
        ['Amplitud de la onda R', `${amplitudR} mV`],
        ['Segmento ST', `${segmentoST} mV`],
        ['Amplitud de la onda P', `${ondaP} mV`],
        ['Duración del complejo QRS', `${complejoQRS} ms`],
        ['Amplitud de la onda T', `${ondaT} mV`],
        ['Ritmo cardíaco', ritmo]
    ];

    parametros.forEach(([parametro, valor]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${parametro}</td>
            <td>${valor}</td>
        `;
        tbody.appendChild(row);
    });

    // Agregar diagnóstico como fila
    const diagnosticoRow = document.createElement('tr');
    diagnosticoRow.innerHTML = `
        <td>Diagnóstico ECG</td>
        <td>${resultado.join('<br>')}</td>
    `;
    tbody.appendChild(diagnosticoRow);

    // Agregar diagnóstico de ECV como fila
    const diagnosticoECVRow = document.createElement('tr');
    diagnosticoECVRow.innerHTML = `
        <td>Diagnóstico sugerido de ECV</td>
        <td>${diagnosticoECV}</td>
    `;
    tbody.appendChild(diagnosticoECVRow);

    table.appendChild(tbody);
    resultContainer.appendChild(table);

    // Imprimir el titulo del resultado fuera de la tabla
    const resultTitle = document.createElement('h3');
    // Poner titulos centrado
    resultTitle.style.textAlign = 'center';
    resultTitle.textContent = 'Resultados';
    resultContainer.insertBefore(resultTitle, table);

});

// Lista con todos los valores de referencia de los parametros del ECG

// #1 Frecuencia cardíaca
// Bradicardia: < 60 bpm
// Taquicardia: > 100 bpm
// Normal: 60-100 bpm

// #2 Intervalo QT
// Corto: < 350 ms
// Prolongado: > 450 ms
// Normal: 350-450 ms

// #3 Amplitud de la onda R
// Baja: < 0.8 mV
// Elevada: > 1.5 mV
// Normal: 0.8-1.5 mV

// #4 Segmento ST
// Elevación: > 0.2 mV
// Depresión: < -0.2 mV
// Normal: -0.2-0.2 mV

// #5 Amplitud de la onda P
// Baja: < 0.1 mV
// Elevada: > 0.25 mV
// Normal: 0.1-0.25 mV

// #6 Duración del complejo QRS
// Estrecho: < 80 ms
// Ancho: > 120 ms
// Normal: 80-120 ms

// #7 Amplitud de la onda T
// Plana o invertida: < 0.5 mV
// Elevada: > 1.5 mV
// Normal: 0.5-1.5 mV

// #8 Ritmo cardíaco
// Sinusal: Normal
// Anormal: Cualquier otro ritmo