const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let limit = 20;
let offset = 1;

previous.addEventListener("click", () => {
if (offset != 1) {
    offset -= 20;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
}
});

next.addEventListener("click", () => {
    offset += 19;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
    createPokemon(data);
    spinner.style.display = "none";
    });
}

function fetchPokemons(offset, limit) {
spinner.style.display = "block";
for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
}
}

function createPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.other.dream_world.front_default;

spriteContainer.appendChild(sprite);

const number = document.createElement("p");
number.textContent = `Pokenúmero:  ${pokemon.id.toString()}`;

const name = document.createElement("p");
name.classList.add("name");
name.textContent = pokemon.name;

card.appendChild(spriteContainer);
card.appendChild(number);
card.appendChild(name);

const cardBack = document.createElement("div");
cardBack.classList.add("pokemon-block-back");

cardBack.appendChild(progressBars(pokemon.stats));

cardContainer.appendChild(card);
cardContainer.appendChild(cardBack);
pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
const statsContainer = document.createElement("div");
statsContainer.classList.add("stats-container");

for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
}

return statsContainer;
}

function removeChildNodes(parent) {
while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
}

fetchPokemons(offset, limit);

//buscar pokemon por nombre o numero
function buscarpokemon(contenedorNumero){
    let inputId  = `pokemoninput${contenedorNumero}`;
    let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`

    fetch(urlApi)
    .then(Response => Response.json())
    .then(datosPokemon => mostrarPokemon(datosPokemon,contenedorNumero))
    .catch(() => mostrarError(contenedorNumero))   
}
//mostrar info pokemon
function mostrarPokemon(datosPokemon,contenedorNumero){
    let infoDivId = `infopokemon${contenedorNumero}`
    let infoDiv =  document.getElementById(infoDivId);

    infoDiv.innerHTML = `
    <h2 class='pk-name'>${datosPokemon.name.toUpperCase()}</h2>
    <img class="pk-img" src="${datosPokemon.sprites.other["official-artwork"].front_default}">
    <p>Numero: ${datosPokemon.id}</p>
    <p> Hp: ${datosPokemon.stats["0"].base_stat}</p>
    <p>Ataque : ${datosPokemon.stats["1"].base_stat}</p>
    <p> Defensa: ${datosPokemon.stats["2"].base_stat}</p>

    `
}
