import React from "react";
import { Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex: 1;

  margin: 0 auto;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  cursor: pointer;

  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 10px;

  padding: 4% 3%;

  box-shadow: 3px 4px 3px ${({ theme }) => theme.palette.boxShadow};
`;

const PokemonList = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleNavigate = (pokemon) => {
    navigate(`/pokemon/${pokemon.name}`, { state: { pokemon } });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {pokemon &&
          pokemon.map((pokemon) => (
            <Grid xs={12} sm={6} md={4} xl={3} item key={pokemon.name}>
              <Item onClick={() => handleNavigate(pokemon)}>
                <Typography>{pokemon.name}</Typography>
              </Item>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default PokemonList;
