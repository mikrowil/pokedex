import React from "react";
import styled from "styled-components";
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
  padding: 2%;
  background-color: ${({ theme }) => theme.bg.light};
  border: 2px solid ${({ theme }) => theme.palette.grey[500]};
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 300ms ease-in-out;
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
          {features.map((feature) => (
            <Grid item xs={12} md={6}>
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
