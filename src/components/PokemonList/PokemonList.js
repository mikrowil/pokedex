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
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  background-color: ${({theme}) => theme.palette.grey[100]};
  border-radius: 10px;

  padding: 2%;

  background: linear-gradient(to left, ${({theme}) => theme.palette.grey[100]} 50%, ${({theme}) => theme.palette.secondary.light} 50%) right;
  background-size: 200%;
  transition: .5s ease;

  &:hover {
    background-position: left;
  }
`

const PokemonList = ({pokemon}) =>{

    const navigate = useNavigate()

    const handleNavigate = (pokemon) =>{
        navigate(`/pokemon/${pokemon.name}`, {state: {pokemon}})
    }

    return(
        <Container>
            <Grid container spacing={2}>
                {pokemon && pokemon.map((pokemon)=>(
                    <Grid xs={12} sm={6} md={4} xl={3} item key={pokemon.name}>
                        <Item>
                            <Typography
                                align={"center"}
                            >
                                {pokemon.name}
                            </Typography>
                            <Button
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
