const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    
    
    const pokemonPromises = []

    for(let i  = 1; i <= 150; i++){
        const fetchData = fetch(getPokemonUrl(i))
        .then(response => response.json())

        pokemonPromises.push(fetchData)
    }
   
    Promise.all(pokemonPromises)
    .then(pokemons => {

        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += 
            `
            <li class = "card  ${types[0]}">
                <img class = 'card-image' alt = '${pokemon.name}' src = 'https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png'/>
                <h2 class = 'card-title'>${pokemon.id}. ${pokemon.name} </h2>
                <p class = 'card-subtitle'>${types.join(' | ')}</p>
            </li>
            `
            return accumulator
        }, ' ')

        const ul = document.querySelector('.pokedex')
        ul.innerHTML = listPokemons
    } )
}

 fetchPokemon() 