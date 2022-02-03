import React from "react";
import {List, ListItem, ListItemText} from "@mui/material";


const PokemonList = ({pokemon}) =>{

    return(
        <List>
            {pokemon && pokemon.map((pokemon)=>(
                <ListItem key={pokemon.name}>
                    <ListItemText>{pokemon.name}</ListItemText>
                </ListItem>
            ))}
        </List>
    )
}

export default PokemonList
