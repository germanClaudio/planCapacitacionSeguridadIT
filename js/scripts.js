function wrapLabels(label, maxLength) {
    if (typeof label !== 'string' || label.length <= maxLength) {
        return label;
    }
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + word).length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    });
    lines.push(currentLine.trim());
    return lines;
}

const commonTooltipCallback = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    } else {
                        return label;
                    }
                }
            }
        }
    }
};

const ataquesData = {
    labels: ['2021', '2022', '2023', '2024', '2025(proy)'],
    datasets: [{
        label: '% de ataques al sector',
        data: [15, 19, 21, 24, 28],
        backgroundColor: '#0072B2',
        borderColor: '#00446A',
        borderWidth: 2,
        fill: true,
    }]
};

const ataquesCtx = document.getElementById('ataquesChart')?.getContext('2d');
if (ataquesCtx) {
    new Chart(ataquesCtx, {
        type: 'line',
        data: ataquesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + "%"
                        }
                    }
                }
            },
            ...commonTooltipCallback
        }
    });
}

const humanFactorData = {
    labels: ['Error Humano', 'Fallo del Sistema', 'Ataque Externo Directo'],
    datasets: [{
        label: 'Origen de Fugas de Datos',
        data: [82, 10, 8],
        backgroundColor: [
            '#D55E00',
            '#0072B2',
            '#009E73'
        ],
        hoverOffset: 4
    }]
};

const humanFactorCtx = document.getElementById('humanFactorChart')?.getContext('2d');
if (humanFactorCtx) {

    new Chart(humanFactorCtx, {
        type: 'doughnut',
        data: humanFactorData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            ...commonTooltipCallback
        }
    });
}

const phishingChartData = {
    labels: [
        wrapLabels('Phishing (Correo)', 16),
        wrapLabels('Vishing (Llamadas)', 16),
        wrapLabels('Smishing (SMS)', 16),
        wrapLabels('Business Email Compromise (BEC)', 16)
    ],
    datasets: [{
        label: 'Frecuencia de Ataque (%)',
        data: [55, 20, 15, 10],
        backgroundColor: '#00446A',
        borderColor: '#00446A',
        borderWidth: 1,
    }]
};

const phishingChartCtx = document.getElementById('phishingChart')?.getContext('2d');
if (phishingChartCtx) {
    new Chart(phishingChartCtx, {
        type: 'bar',
        data: phishingChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + "%";
                        }
                    }
                }
            },
            ...commonTooltipCallback
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtener la card de política por su ID
    const policyCard = document.getElementById('policy-card');
    if (policyCard) {
        // Agregar evento de clic a la card
        policyCard.addEventListener('click', function() {
            // Crear un enlace temporal para descargar el PDF
            const link = document.createElement('a');
            link.href = '../files_output/MC211-IT-2 Política de Uso Aceptable de Recursos de Tecnologías de Info.pdf'; // Reemplazar con la ruta real del PDF
            link.download = 'Política_de_Uso_Aceptable_MC211-IT-2.pdf';
            link.target = '_blank';
            
            // Simular clic en el enlace
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Opcional: proporcionar feedback visual
            policyCard.style.backgroundColor = '#e6f0f7';
            setTimeout(() => {
                policyCard.style.backgroundColor = '';
            }, 300);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener la card de política por su ID
    const guiaPdf = document.getElementById('guia-pdf');
    if (guiaPdf) {
        // Agregar evento de clic a la card
        guiaPdf.addEventListener('click', function() {
            // Crear un enlace temporal para descargar el PDF
            const link = document.createElement('a');
            link.href = '../files_output/I523-IT-3_Guía de Identificación de Phishing.pdf'; 
            link.download = 'I523-IT-3_Guía de Identificación de Phishing.pdf';
            link.target = '_blank';
            
            // Simular clic en el enlace
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});


const quizData = [
    {
        question: "¿Qué acción se considera una violación grave de la política de seguridad de la empresa?",
        options: [
            { text: "Instalar software de acceso remoto no autorizado.", correct: true },
            { text: "Usar el equipo de la empresa para llamadas personales.", correct: false },
            { text: "Navegar por redes sociales durante las horas de descanso.", correct: false },
            { text: "Cargar el teléfono móvil personal con el ordenador de la empresa.", correct: false }
        ]
    },
    {
        question: "¿Cuál es la mejor práctica para proteger tu equipo de la empresa en un lugar público?",
        options: [
            { text: "Dejarlo desbloqueado para un acceso rápido.", correct: false },
            { text: "Conectarse a una red Wi-Fi pública sin contraseña.", correct: false },
            { text: "Utilizar siempre una VPN para cifrar la conexión.", correct: true },
            { text: "Compartirlo con colegas para optimizar el trabajo.", correct: false }
        ]
    },
    {
        question: "Si recibes un correo electrónico que solicita tu contraseña de la empresa, ¿cuál es el curso de acción correcto?",
        options: [
            { text: "Responder al remitente y solicitar más información.", correct: false },
            { text: "Eliminar el correo inmediatamente sin abrirlo.", correct: false },
            { text: "Reportar el correo al departamento de TI y no interactuar con él.", correct: true },
            { text: "Hacer clic en el enlace para ver si el sitio es legítimo.", correct: false }
        ]
    },
    {
        question: "¿Qué tipo de datos se considera confidencial y debe manejarse con cuidado?",
        options: [
            { text: "Listas de precios de productos.", correct: false },
            { text: "Información financiera de la empresa y datos de clientes.", correct: true },
            { text: "Manuales de uso de software.", correct: false },
            { text: "Horarios de reuniones de equipo.", correct: false }
        ]
    },
    {
        question: "El uso de software ilegal o sin licencia en un equipo de la empresa puede llevar a:",
        options: [
            { text: "Una mejor productividad.", correct: false },
            { text: "Sanciones legales y brechas de seguridad.", correct: true },
            { text: "Mayor velocidad de procesamiento.", correct: false },
            { text: "Reducción de costos para la empresa.", correct: false }
        ]
    },
    {
        question: "¿Por qué es importante mantener los sistemas operativos y el software actualizados?",
        options: [
            { text: "Para mejorar la estética de la interfaz de usuario.", correct: false },
            { text: "Para evitar la instalación de nuevo hardware.", correct: false },
            { text: "Para corregir vulnerabilidades de seguridad conocidas.", correct: true },
            { text: "Para consumir más ancho de banda de la red.", correct: false }
        ]
    },
    {
        question: "Si tu equipo de la empresa es robado, ¿qué debes hacer primero?",
        options: [
            { text: "Publicar en redes sociales para pedir ayuda.", correct: false },
            { text: "Esperar a que alguien lo encuentre y lo devuelva.", correct: false },
            { text: "Notificar inmediatamente al departamento de TI y a tu supervisor.", correct: true },
            { text: "Comprar un equipo de reemplazo por tu cuenta.", correct: false }
        ]
    },
    {
        question: "¿Cuál es una buena práctica para crear una contraseña segura para los sistemas de la empresa?",
        options: [
            { text: "Usar tu fecha de nacimiento o un nombre de familiar.", correct: false },
            { text: "Utilizar la misma contraseña para todas tus cuentas.", correct: false },
            { text: "Crear una contraseña larga que combine letras, números y símbolos.", correct: true },
            { text: "Escribir la contraseña en una nota y pegarla en tu escritorio.", correct: false }
        ]
    },
    {
        question: "¿Qué significa el término 'phishing'?",
        options: [
            { text: "Un tipo de virus informático.", correct: false },
            { text: "El uso de redes sociales en el trabajo.", correct: false },
            { text: "Un intento de fraude para obtener datos confidenciales.", correct: true },
            { text: "Un ataque de denegación de servicio.", correct: false }
        ]
    },
    {
        question: "Si necesitas compartir un archivo confidencial con un colega, ¿cuál es el método más seguro?",
        options: [
            { text: "Enviarlo por correo electrónico sin cifrado.", correct: false },
            { text: "Usar un servicio de almacenamiento en la nube no aprobado por la empresa.", correct: false },
            { text: "Compartirlo a través de una plataforma de colaboración de la empresa aprobada.", correct: true },
            { text: "Guardarlo en una memoria USB y entregarlo personalmente.", correct: false }
        ]
    }
];

const personalForm = document.getElementById('personal-form');
const quizContent = document.getElementById('quiz-content');
const resultsContainer = document.getElementById('results-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const scoreDisplay = document.getElementById('score-display');
const finalName = document.getElementById('final-name');
const percentageDisplay = document.getElementById('percentage-display');
const downloadPdfBtn = document.getElementById('download-pdf-btn');

let currentQuestionIndex = 0;
let userAnswers = {};
let isFormSubmitted = false;
let finalScore = 0;

if (personalForm) {
    personalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        isFormSubmitted = true;
        personalForm.classList.add('hidden');
        quizContent.classList.remove('hidden');
        document.getElementById('final-name').textContent = document.getElementById('name').value + ' ' + document.getElementById('surname').value;
        renderQuestion();
    });
}

function renderQuestion() {
    const question = quizData[currentQuestionIndex];
    questionText.textContent = `Pregunta ${currentQuestionIndex + 1}/${quizData.length}: ${question.question}`;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.classList.add('option-item');
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `question-${currentQuestionIndex}`;
        radioInput.value = index;
        radioInput.id = `q${currentQuestionIndex}-opt${index}`;
        radioInput.classList.add('cursor-pointer');
        
        const label = document.createElement('label');
        label.htmlFor = `q${currentQuestionIndex}-opt${index}`;
        label.textContent = option.text;
        label.classList.add('cursor-pointer');
        
        optionItem.appendChild(radioInput);
        optionItem.appendChild(label);
        optionsContainer.appendChild(optionItem);

        if (userAnswers[currentQuestionIndex] !== undefined && userAnswers[currentQuestionIndex] == index) {
            radioInput.checked = true;
            optionItem.classList.add('selected');
        }

        optionItem.addEventListener('click', () => handleAnswer(index));
    });

    updateNavigationButtons();
}

function handleAnswer(selectedIndex) {
    if (userAnswers[currentQuestionIndex] === undefined) {
        userAnswers[currentQuestionIndex] = selectedIndex;
        const options = optionsContainer.querySelectorAll('.option-item');
        options.forEach(option => option.classList.add('disabled-option'));
        options[selectedIndex].classList.add('selected');
    }
}

function updateNavigationButtons() {
    if (currentQuestionIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }

    if (currentQuestionIndex === quizData.length - 1) {
        if (userAnswers[currentQuestionIndex] !== undefined) {
            nextBtn.textContent = 'Ver Resultados';
            nextBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'none';
        }
    } else {
        nextBtn.textContent = 'Siguiente';
        nextBtn.style.display = 'inline-block';
    }
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else if (currentQuestionIndex === quizData.length - 1 && userAnswers[currentQuestionIndex] !== undefined) {
            showResults();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    });
}

function showResults() {
    finalScore = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] !== undefined && question.options[userAnswers[index]].correct) {
            finalScore++;
        }
    });
    
    const percentage = (finalScore / quizData.length) * 100;
    
    quizContent.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    scoreDisplay.textContent = `${finalScore}/${quizData.length}`;
    percentageDisplay.textContent = `Porcentaje de acierto: ${percentage}%`;
}

if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const employeeId = document.getElementById('employeeId').value;
        const email = document.getElementById('corporateEmail').value;
        const score = finalScore;
        const totalQuestions = quizData.length;
        const percentage = (score / totalQuestions) * 100;
        const now = new Date();
        const passed = percentage >= 80;
        const icon = passed ? `✅` : `❌`;
    
        
        // Usamos un logo de marcador de posición y un texto de encabezado
        const logoBase64 = "data:image/png;base64,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";
    
        // Header
        doc.addImage(logoBase64, "PNG", 10, 10, 40, 12);
        doc.setFontSize(16);
        doc.text("Informe de Evaluación", 100, 20, { align: 'center' });
        doc.line(10, 25, 200, 25); // Línea debajo del encabezado
    
        // Datos del Usuario
        doc.setFontSize(12);
        doc.text("Datos del Usuario:", 10, 40);
        doc.text(`Nombre: ${name} ${surname}`, 10, 50);
        doc.text(`Número de Legajo: ${employeeId}`, 10, 60);
        doc.text(`Email: ${email}`, 10, 70);
        doc.text(`Fecha y Hora: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 10, 80);
    
        // Resultados
        doc.text("Resultados:", 10, 100);
        doc.setFontSize(14);
        doc.text(`Puntaje: ${score}/${totalQuestions}`, 10, 110);
        doc.text(`Porcentaje de acierto: ${percentage.toFixed(2)}%`, 10, 120);
    
        // Mensaje y icono de resultado
        doc.setFontSize(20);
        doc.text(icon, 10, 140);
        doc.text(passed ? "¡Felicidades, has aprobado el examen!" : "Necesitas revisar los conceptos para volver a intentarlo.", 20, 140);
    
        doc.line(10, 25, 200, 250); // Línea debajo del encabezado
        doc.text("F314-IT-C-1", 12, 260);
    
        doc.save(`Resultados_Examen_Seguridad_${name}-${surname}_${employeeId}.pdf`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    if (toggleButtons) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Encuentra el div de contenido asociado
                const content = this.closest('div').nextElementSibling;
                
                // Alterna la visibilidad del contenido
                if (content) {
                    content.classList.toggle('hidden');
                    
                    // Cambia el ícono del botón
                    const icon = this.querySelector('span');
                    if (content.classList.contains('hidden')) {
                        icon.textContent = '▼';
                        this.classList.remove('rotate-90');
                    } else {
                        icon.textContent = '▲';
                        this.classList.add('rotate-90');
                    }
                }
            });
        });
    }
});
