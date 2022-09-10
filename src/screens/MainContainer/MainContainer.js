import PokemonList from "../../components/PokemonList/PokemonList";
import usePokemon from "../../hooks/usePokemon";
import { Typography } from "@mui/material";
import Button from "../../components/ui-kit/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 1rem auto;
  padding: 3rem 1rem;
  max-width: 1280px;
`;

const MainContainer = () => {
  const { pokemon, showMore, isLoading } = usePokemon();

  return (
    <Container>
      <Typography variant={"h3"}>Pokemon</Typography>

      <PokemonList pokemon={pokemon} />

      <div style={{ marginTop: "1rem" }}>
        <Button
          isLoading={isLoading}
          variant={"text"}
          onClick={() => showMore()}
        >
          show more
        </Button>
      </div>
    </Container>
  );
};

export default MainContainer;
