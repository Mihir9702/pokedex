let pokemons = [];
const pokeContainer = document.getElementById("pokeContainer");
const url = "https://pokeapi.co/api/v2/pokemon";
const pNum = 493;
const search = document.getElementById("search");
const form = document.getElementById("form");

const fetchPokemon = async () => {
    for (let i = 1; i <= pNum; i++) {
        await getAllPokemon(i);
    }
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
}

const removePokemon = () => {
    const pokemonClass = document.getElementsByClassName("pokemon");

    let removeablePokemons = [];
    for (let i = 0; i < pokemonClass.length; i++) {
        const pokemonEL = pokemonClass[i];
        removeablePokemons = [...removeablePokemons, pokemonEL];
    }
    removeablePokemons.forEach(remPoke => remPoke.remove());
}

const getPokemon = async (id) => {
    const searchPokemons = pokemons.filter((poke) => poke.name === id);
    removePokemon();
    searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
}

const getAllPokemon = async (id) => {
    const res = await fetch(`${url}/${id}`);
    const pokemon = await res.json();
    pokemons = [...pokemons, pokemon];
}
fetchPokemon();

function createPokemonCard(pokemon) {
    const pokemonELS = document.createElement("div");
    pokemonELS.classList.add("pokemon");
    const pokeTypes = pokemon.types.map(e => e.type.name).slice(0, 1) + " " + pokemon.types.map(e => e.type.name).slice(1, 2);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokeStat = pokemon.stats.map(e => e.stat.name);
    const stats = pokeStat.slice(0, 3);
    const baseValue = pokemon.stats.map(e => e.base_stat);
    const baseStat = baseValue.slice(0, 3);
    
    const stat = stats.map(stat => {
        return `<li class="stat">${stat}</li>`;
    }).join("");
    const base = baseStat.map(base => {
        return `<li class="base">${base}</li>`;
    }).join("");
    
    const pokeInnerHTML = `<div class="imgContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}/> </div>
    <div class="info">
    <span class="number"> #${pokemon.id.toString().padStart(3, "0")}</span>
    <h3 class="name">${name}</h3>
    <small class="type"><span>${pokeTypes}</span></small>
    </div>
    <div class="stats">
    <h2>Stats</h2>
    <div class="flex">
    <ul>${stat}</ul>
    <ul>${base}</ul>
    </div>
    </div>`
    pokemonELS.innerHTML = pokeInnerHTML;
    pokeContainer.appendChild(pokemonELS);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getPokemon(searchTerm);
        search.value = "";
    } else if (searchTerm === "") {
        pokemons = [];
        removePokemon();
        fetchPokemon();
    }
})
