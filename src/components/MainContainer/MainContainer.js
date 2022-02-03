import styles from './MainContainer.module.css'
import {useEffect, useState} from "react";
import pokeapi from "../../api/pokeapi";
import PokemonList from "../PokemonList/PokemonList";
import {Box} from "@mui/material";

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
        <Box className={styles.mainContainer}>
            <PokemonList pokemon={pokemonApiResults.results}/>
        </Box>
    )
}

export default MainContainer
