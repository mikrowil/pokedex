
const PokemonList = ({pokemon}) =>{
    return(
        <div>
            {pokemon.map((pokemon)=>(
                <div>{pokemon.name}</div>
            ))}
        </div>
    )
}

export default PokemonList
