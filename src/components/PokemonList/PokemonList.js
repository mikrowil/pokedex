import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Grid, Pagination, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import PokemonCard from "../ui-kit/PokemonCard";
import { cleanPokemonName } from "../../utilities/stringModifiers";
import useSearch from "../../hooks/useSearch";
import { LanguageContext } from "../../contex/LanguageContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PokemonList = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")));
  const [value, setValue] = useState(null);
  const { inputValue, setInputValue, result } = useSearch();
  const [pokemon, setPokemon] = useState([]);
  const [fullPokemon, setFullPokemon] = useState([]);

  const handleNavigate = (pokemon) => {
    navigate(
      `/pokemon/${cleanPokemonName(pokemon.name.english.toLowerCase())}`,
      {
        state: { pokemon, prevPath: `/pokemon?page=${page}` },
      }
    );
  };

  const paginationOnChange = (value) => {
    navigate(`/pokemon?page=${value}`);
  };

  const applySearchFilter = (value) => {
    setValue(value);
    paginationOnChange(1);
  };

  useEffect(() => {
    let newPokemon = result;
    setFullPokemon(newPokemon);
    newPokemon = newPokemon.slice((page - 1) * 24, page * 24);
    setPokemon(newPokemon);
  }, [page, result]);

  useEffect(() => {
    setPage(Number(searchParams.get("page")));
  }, [searchParams]);

  return (
    <Container>
      <Grid container spacing={2} style={{ display: "flex" }}>
        <Grid item xs={12}>
          <Box>
            <Autocomplete
              value={value}
              freeSolo
              onChange={(event, newValue) => {
                applySearchFilter(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                paginationOnChange(1);
              }}
              style={{ maxWidth: 400 }}
              renderInput={(params) => <TextField {...params} />}
              options={fullPokemon}
              getOptionLabel={(option) => {
                if (!option.name) return "";
                return option.name[language];
              }}
            />
          </Box>
        </Grid>
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
                  name={pokemon.name[language]}
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
        sx={{
          marginTop: 2,
          marginBottom: 4,
          justifyContent: "center",
          display: "flex",
        }}
        page={page}
        size={"large"}
        boundaryCount={5}
        count={Math.ceil(fullPokemon.length / 24)}
        onChange={(e, value) => {
          paginationOnChange(value);
        }}
      />
    </Container>
  );
};

export default PokemonList;
