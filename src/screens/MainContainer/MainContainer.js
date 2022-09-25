import PokemonList from "../../components/PokemonList/PokemonList";
import styled from "@emotion/styled";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 1rem auto;
  padding: 3rem 1rem;
  max-width: 1280px;
`;

const MainContainer = () => {
  const location = useLocation();
  const [initialPage] = useState(
    location.state && location.state.page ? location.state.page : 0
  );

  return (
    <Container>
      <PokemonList initialPage={initialPage} prevPath={location.pathname} />
    </Container>
  );
};

export default MainContainer;
