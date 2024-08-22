let generatedCharacters = []; // Arreglo para almacenar los personajes generados

document.getElementById("generate-card").addEventListener("click", generateCard);
document.getElementById("generate-multiple").addEventListener("click", openModal);
document.getElementById("confirm-generate").addEventListener("click", generateMultipleCards);
document.getElementById("search").addEventListener("keyup", searchCharacter);

function generateCard() {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(response => response.json())
        .then(data => {
            const character = data[0];
            // Verificar si el personaje ya ha sido generado
            if (!generatedCharacters.some(item => item.character === character.character)) {
                generatedCharacters.push(character); // Añadir al arreglo
                createCard(character);
            } else {
                alert(`${character.character} ya ha sido generado.`);
            }
        })
        .catch(error => console.error('Error al generar la tarjeta:', error));
}

function createCard(character) {
    const cardContainer = document.getElementById('cards-container');

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.character;

    const name = document.createElement('h2');
    name.textContent = character.character;

    const quote = document.createElement('p');
    quote.textContent = `"${character.quote}"`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(quote);
    cardContainer.appendChild(card);
}

function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function generateMultipleCards() {
    const quantity = parseInt(document.getElementById('card-quantity').value);
    if (isNaN(quantity) || quantity < 1) {
        alert('Por favor, ingrese un número válido.');
        return;
    }

    for (let i = 0; i < quantity; i++) {
        generateCard(); // Llamar a la función generateCard para cada tarjeta
    }

    document.getElementById('modal').style.display = 'none'; // Cerrar el modal
}

function searchCharacter(event) {
    const searchQuery = event.target.value.toLowerCase();
    const filteredCharacters = generatedCharacters.filter(character =>
        character.character.toLowerCase().includes(searchQuery)
    );

    // Limpiar contenedor antes de mostrar los resultados de la búsqueda
    const cardContainer = document.getElementById('cards-container');
    cardContainer.innerHTML = '';

    // Crear tarjetas solo para los personajes filtrados
    filteredCharacters.forEach(character => createCard(character));
}
