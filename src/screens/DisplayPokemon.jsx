import React from "react";
import {useLocation} from "react-router-dom";
import {Typography} from "@mui/material";
import usePokemonDetails from "../hooks/usePokemonDetails";
import styled from "styled-components";


const Container = styled.div`
  
`;

const

export default function DisplayPokemon(){

    const {state} = useLocation()

    const pokemon = usePokemonDetails(state.pokemon.url)

    return(
        <Container>
            <div>
                <img src={pokemon.sprites.front_default}/>
                <Typography variant={"h5"}>
                    {pokemon.name}

                </Typography>
            </div>
        </Container>
    )
}
