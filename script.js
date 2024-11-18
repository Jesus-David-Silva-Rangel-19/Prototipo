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

    const diagnostico = [];

    // Lógica de diagnóstico
    if (frecuenciaCardiaca < 60) diagnostico.push("Bradicardia (latidos bajos)");
    else if (frecuenciaCardiaca > 100) diagnostico.push("Taquicardia (latidos altos)");

    if (intervaloQT < 350) diagnostico.push("Intervalo QT corto");
    else if (intervaloQT > 450) diagnostico.push("Intervalo QT prolongado");

    if (amplitudR < 0.8) diagnostico.push("Baja amplitud de la onda R");
    else if (amplitudR > 1.5) diagnostico.push("Elevada amplitud de la onda R");

    if (segmentoST > 0.2) diagnostico.push("Elevación del segmento ST");
    else if (segmentoST < -0.2) diagnostico.push("Depresión del segmento ST");

    if (ondaP < 0.1) diagnostico.push("Onda P baja");
    else if (ondaP > 0.25) diagnostico.push("Onda P elevada");

    if (complejoQRS < 80) diagnostico.push("Complejo QRS estrecho");
    else if (complejoQRS > 120) diagnostico.push("Complejo QRS ancho");

    if (ondaT < 0.5) diagnostico.push("Onda T plana o invertida");
    else if (ondaT > 1.5) diagnostico.push("Onda T elevada");

    if (ritmo.toLowerCase() !== "sinusal") diagnostico.push(`Ritmo anormal detectado: ${ritmo}`);

    // Resultado del diagnóstico
    const resultado = diagnostico.length > 0 ? diagnostico : ["ECG dentro de parámetros normales"];

    // Mostrar resultados usando SweetAlert
    Swal.fire({
        title: `Diagnóstico para el paciente ${pacienteID}`,
        html: `<ul>${resultado.map(item => `<li>${item}</li>`).join('')}</ul>`,
        icon: 'info',
        confirmButtonText: 'Aceptar',
    });
});