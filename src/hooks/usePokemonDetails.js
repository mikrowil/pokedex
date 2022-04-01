import {useEffect, useState} from "react";
import axios from "axios";


const usePokemonDetails = (url) =>{
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

    const fetchPokemonDetails = async () =>{
        const results = (await axios.get(url)).data

        setPokemon(results)
    };

    useEffect(()=>{
        fetchPokemonDetails().then();
    },[])

    return pokemon
}

export default usePokemonDetails
