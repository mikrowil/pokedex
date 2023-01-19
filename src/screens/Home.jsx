import React from "react";
import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import Typography from "../components/ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import imgPokemonDark from "../assets/g.png";

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  max-width: 1280px;
  margin: 1rem auto;
  padding: 4rem 0;
  width: 100%;
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

const PokemonImageDark = styled.img`
  position: absolute;
  width: 800px;
  height: 800px;
  perspective: 2px;
  opacity: ${({ theme }) => (theme.palette.mode === "light" ? 0 : 1)};
  transition: opacity 600ms ease-out;
`;

const features = [
  {
    title: "Pokedex",
    path: "/pokemon?page=1",
  },
  {
    title: "Who's that?",
    path: "/who",
  },
];

export default function Home() {
  return (
    <Container>
      <PokemonImageDark src={imgPokemonDark} />
      <InnerContainer>
        <Box p={1} display={"flex"} style={{ width: "100%" }}>
          <Grid container spacing={4}>
            <Paths />
          </Grid>
        </Box>
      </InnerContainer>
    </Container>
  );
}

const Paths = () => {
  const navigate = useNavigate();
  return (
    <>
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
    </>
  );
};
