import React, { useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../ui-kit/PokemonCard";
import pokedex from "../../assets/pokedex.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
`;

const PokemonList = ({ prevPath, initialPage }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(initialPage | 1);
  const [pokemon, setPokemon] = useState([]);

  const handleNavigate = (pokemon) => {
    navigate(`/pokemon/${pokemon.name.english.toLowerCase()}`, {
      state: { pokemon, prevPath, page },
    });
  };

  useEffect(() => {
    const newPokemon = pokedex.slice((page - 1) * 24, page * 24);

    setPokemon(newPokemon);
  }, [page]);

  return (
    <Container>
      <Grid container spacing={2}>
        {pokemon &&
          pokemon.map((pokemon) => (
            <Grid
              xs={12}
              sm={6}
              md={4}
              xl={2}
              item
              key={pokemon.name.english}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pokemon && (
                <PokemonCard
                  style={{ padding: "1rem" }}
                  name={pokemon.name.english}
                  img={pokemon.image ? pokemon.image.thumbnail : ""}
                  firstType={
                    pokemon.type && pokemon.type[0] ? pokemon.type[0] : null
                  }
                  secondType={
                    pokemon.type && pokemon.type[1] ? pokemon.type[1] : null
                  }
                  onClick={() => handleNavigate(pokemon)}
                />
              )}
            </Grid>
          ))}
      </Grid>
      <Pagination
        sx={{ marginTop: 2 }}
        page={page}
        size={"large"}
        count={Math.ceil(pokedex.length / 24)}
        onChange={(e, value) => {
          setPage(value);
        }}
      />
    </Container>
  );
};

export default PokemonList;
