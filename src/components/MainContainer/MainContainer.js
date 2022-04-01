import {useEffect, useState} from "react";
import pokeapi from "../../api/pokeapi";
import PokemonList from "../PokemonList/PokemonList";



const MainContainer = () =>{

    const [pokemonApiResults, setPokemonApiResults] = useState({})

    const fetchPokemon = async () =>{
        const response = await pokeapi.get('/pokemon')

        setPokemonApiResults(response.data)
    }

    useEffect(()=>{
        fetchPokemon()
    },[])

    return (
        <div style={{display:"flex",flex:1}}>
            <PokemonList pokemon={pokemonApiResults.results}/>
        </div>
    )
}

export default MainContainer
