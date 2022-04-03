import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex: 1;
  
  margin: 0 auto;
`

const Item = styled.div`
  
  background-color: ${({theme})=> theme.palette.grey[100]};
  border-radius: 10px;
  
  margin:3%;
  padding: 3%;
  
`

const PokemonList = ({pokemon}) =>{

    const navigate = useNavigate()

    const handleNavigate = (pokemon) =>{
        navigate(`/pokemon/${pokemon.name}`, {state: {pokemon}})
    }

    return(
        <Container>
            <Grid container>
                {pokemon && pokemon.map((pokemon)=>(
                    <Grid xs={12} sm={6} md={4} xl={3} item key={pokemon.name}>
                        <Item>
                            <Typography
                                align={"center"}
                            >
                                {pokemon.name}
                            </Typography>
                            <Button
                                fullWidth
                                onClick={()=>handleNavigate(pokemon)}
                            >
                                Link
                            </Button>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default PokemonList
