

const pokeApi = {}



function transformApi_ToMyModel(pokeDetail){
    const pokemon = new Pokemon()
  
    pokemon.myOrder = pokeDetail.order
    pokemon.name = pokeDetail.name
   
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.sprite = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json()
            .then(transformApi_ToMyModel)    
    )
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((requests) => Promise.all(requests))
    .then((pokemonDetails) => (pokemonDetails))
}
