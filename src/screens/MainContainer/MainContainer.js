import PokemonList from "../../components/PokemonList/PokemonList";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 1280px;
`;

const Inner = styled.div`
  width: 100%;
`;

const MainContainer = () => {
  return (
    <Container>
      <Inner>
        <Box p={1}>
          <PokemonList />
        </Box>
      </Inner>
    </Container>
  );
};

export default MainContainer;
