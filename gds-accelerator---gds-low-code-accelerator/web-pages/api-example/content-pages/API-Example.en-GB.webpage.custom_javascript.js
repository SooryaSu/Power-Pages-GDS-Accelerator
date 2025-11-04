async function fetchPokemon(pokemonName) {
    const pokemonData = document.getElementById('pokemonData');
    console.log('Pokemon Name:', pokemonName); // Debugging line
    if (!pokemonName) {
        pokemonData.innerHTML = `<p>Please enter a Pokémon name.</p>`;
        return;
    }
    pokemonName = pokemonName.toLowerCase();

    const cachedData = localStorage.getItem(pokemonName);
    if (cachedData) {
        const { data, evolutionData } = JSON.parse(cachedData);
        displayPokemon(data, evolutionData);
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        localStorage.setItem(pokemonName, JSON.stringify({ data, evolutionData }));
        displayPokemon(data, evolutionData);
    } catch (error) {
        pokemonData.innerHTML = `<p>${error.message}. Please try another name.</p>`;
    }
}

function displayPokemon(data, evolutionData) {
    const pokemonData = document.getElementById('pokemonData');
    pokemonData.innerHTML = `
        <div class="card">
            <h2>${capitalizeFirstLetter(data.name)}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Height:</strong> ${data.height / 10} meters</p>
            <p><strong>Weight:</strong> ${data.weight / 10} kilograms</p>
            <p><strong>Type:</strong> ${data.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ')}</p>
            <p><strong>Base Experience:</strong> ${data.base_experience}</p>
            <p><strong>Base Stats:</strong></p>
            <ul>
                ${data.stats.map(stat => `<li>${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}</li>`).join('')}
            </ul>
            <p><strong>Held Items:</strong> ${data.held_items.map(item => capitalizeFirstLetter(item.item.name)).join(', ')}</p>
            <p><strong>Evolution Chain:</strong></p>
            ${getEvolutionChain(evolutionData.chain)}
        </div>
    `;
}

function getEvolutionChain(chain) {
    let evolutionChain = `<ul>${getEvolutionStage(chain)}</ul>`;
    return evolutionChain;
}

function getEvolutionStage(stage) {
    let stageHtml = `<li><a href="#" onclick="fetchPokemon('${stage.species.name}')">${capitalizeFirstLetter(stage.species.name)}</a></li>`;
    if (stage.evolves_to.length > 0) {
        stageHtml += `<ul>${stage.evolves_to.map(evolution => getEvolutionStage(evolution)).join('')}</ul>`;
    }
    return stageHtml;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}