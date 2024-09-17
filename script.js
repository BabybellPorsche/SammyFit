// script.js

// Toon de geselecteerde workout
function showWorkout(day) {
    // Verberg alle workout containers
    document.querySelectorAll('.workout-container').forEach(container => {
        container.classList.add('hidden');
    });
    // Toon geselecteerde workout
    document.getElementById(day).classList.remove('hidden');
    // Verberg samenvatting
    document.getElementById('summary-section').classList.add('hidden');
    // Scroll naar boven
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Genereer samenvatting
function generateSummary(day) {
    let content = '';
    const exercises = document.querySelectorAll(`#${day} .exercise-card`);
    exercises.forEach(exercise => {
        const exerciseName = exercise.querySelector('h3').innerText;
        const sets = exercise.querySelector('input[id$="sets"]').value || 'N.V.T.';
        const reps = exercise.querySelector('input[id$="reps"]').value || 'N.V.T.';
        const extraInput = exercise.querySelector('input[id$="weight"]') || exercise.querySelector('input[id$="seconds"]') || exercise.querySelector('input[id$="reps-core"]') || exercise.querySelector('input[id$="reps per kant"]');
        const extraLabel = extraInput ? extraInput.previousElementSibling.innerText : '';
        const extraValue = extraInput ? (extraInput.value || 'N.V.T.') : '';

        content += `
            <div class="exercise-summary">
                <h4 class="text-lg font-semibold mt-4">${exerciseName}</h4>
                <p>Sets: ${sets}</p>
                <p>Reps: ${reps}</p>
                ${extraInput ? `<p>${extraLabel}: ${extraValue}</p>` : ''}
            </div>
        `;
    });

    // Datum en opmerkingen
    const date = document.getElementById(`${day}-date`).value || 'Niet ingevuld';
    const comments = document.getElementById(`${day}-comments`).value || 'Geen opmerkingen';

    content += `
        <div class="mt-4">
            <p><strong>Datum:</strong> ${date}</p>
            <p><strong>Opmerkingen:</strong> ${comments}</p>
        </div>
    `;

    // Toon samenvatting
    document.getElementById('summary-content').innerHTML = content;
    document.getElementById('summary-section').classList.remove('hidden');
    // Scroll naar boven
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Verberg samenvatting
function hideSummary() {
    document.getElementById('summary-section').classList.add('hidden');
}

// Laad alle gegevens bij paginalading
document.addEventListener('DOMContentLoaded', () => {
    // Toon de eerste dag standaard
    showWorkout('dayA');
});
