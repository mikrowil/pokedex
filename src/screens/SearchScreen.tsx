import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";
import poke from "../assets/pokedex.json";
import { getPokemonByName } from "../api/pokemon";
import PokemonCard from "../components/ui-kit/PokemonCard";

const Container = styled.div`
  display: block;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

export default function SearchScreen() {
  const pokemon = poke;

  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPokemonByName(inputValue.toLowerCase());
        setResult(data.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetch();
  }, [inputValue]);

  return (
    <Container>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        style={{ maxWidth: 400 }}
        renderInput={(params) => <TextField {...params} />}
        options={pokemon}
        getOptionLabel={(option) => {
          if (!option.name) return "";
          return option.name.english;
        }}
      />
      {result && (
        <PokemonCard
          style={{ margin: "1rem", padding: "1rem" }}
          name={result.name}
          img={result.sprites ? result.sprites.front_default : ""}
          firstType={result.types[0] ? result.types[0].type.name : null}
          secondType={result.types[1] ? result.types[1].type.name : null}
        />
      )}
    </Container>
  );
}
