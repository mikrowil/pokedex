import {useEffect, useState} from "react";
import axios from "axios";
import pokeapi from "../api/pokeapi";


const usePokemonDetails = (name) =>{
    const [pokemon, setPokemon] = useState({
        abilities:[],
        base_experience:0,
        forms:[],
        game_indices:[],
        height:0,
        held_items:[],
        id:0,
        is_default:true,
        location_area_encounters:"",
        moves:[],
        name:"",
        order:0,
        past_types:[],
        species:{},
        sprites:{},
        stats:[],
        types:[],
        weight:0
    })

    const [species,setSpecies] = useState({})

    const [isLoading, setIsLoading] = useState(false)

    const fetchPokemonDetails = async () =>{
        setIsLoading(true)

        const results = (await pokeapi.get(`/pokemon/${name}`)).data
        const speciesRes = (await pokeapi.get(`/pokemon-species/${name}`)).data

        setPokemon(results)
        setSpecies(speciesRes)

        setIsLoading(false)
    };

    useEffect(()=>{
        fetchPokemonDetails().then();
    },[])

    return {pokemon, species, isLoading}
}

export default usePokemonDetails
