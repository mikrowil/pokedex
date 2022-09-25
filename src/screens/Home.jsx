import React from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Typography from "../components/ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import imgPokemon from "../assets/g.png";

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  max-width: 1280px;
  margin: 1rem auto;
  padding: 4rem 1rem;
`;

const Container = styled.div`
  position: relative;
`;

const Item = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 1rem;
  border-radius: 5px;
  transition: background-color 100ms ease-in-out;

  :hover {
    background-color: ${({ theme }) => theme.palette.btnHover};
  }
`;

const PokemonImage = styled.img`
  position: absolute;
  width: 800px;
  height: 800px;
  perspective: 2px;
`;

const features = [
  {
    title: "Pokedex",
    path: "/pokemon",
  },
  {
    title: "Search",
    path: "/search",
  },
  {
    title: "Random pokemon",
    path: "/",
  },
  {
    title: "Berries",
    path: "/",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <PokemonImage src={imgPokemon} />
      <InnerContainer>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Item
                onClick={() => {
                  navigate(feature.path);
                }}
              >
                <Typography variant={"h5"}>{feature.title}</Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </InnerContainer>
    </Container>
  );
}
