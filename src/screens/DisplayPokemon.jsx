import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import usePokemonDetails from "../hooks/usePokemonDetails";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Icon from "../components/ui-kit/Icon";
import { convertDeciToMeter, convertHectoToKilo } from "../utilities/utils";
import { css } from "@emotion/react";
import { getColor } from "../utilities/colors";
import { cleanPokemonName } from "../utilities/stringModifiers";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  padding: 1.03rem;
  border-radius: 5px;
`;

const PokemonName = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.outlined,
    fontFamily: "Kanit",
    textTransform: "uppercase",
  };
});

const Section = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 5px;
  transition: background-color 300ms ease-in-out;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
`;

const Background = styled(Section)(
  ({ firstcolor, secondcolor }) => css`
    background: linear-gradient(
      158deg,
      ${firstcolor ? firstcolor : "#424242"} 0%,
      ${secondcolor ? secondcolor : "#424242"}
    );
  `
);

export default function DisplayPokemon() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isShiny, setIsShiny] = useState(false);

  const { pokemon, isLoading } = usePokemonDetails(
    cleanPokemonName(state.pokemon.name.english.toLowerCase())
  );

  const status = [
    {
      label: `Height: ${convertDeciToMeter(pokemon.height)} m`,
      icon: "height",
    },
    {
      label: `Weight: ${convertHectoToKilo(pokemon.weight)} kg`,
      icon: "weight",
    },
    {
      label: `Base Exp: ${pokemon.base_experience}`,
      icon: "upgrade",
    },
    {
      label: `HP: ${pokemon.stats[0]?.base_stat}`,
      icon: "favorite",
    },
    {
      label: `ATK: ${pokemon.stats[1]?.base_stat}`,
      icon: "swords",
    },
    {
      label: `DEF: ${pokemon.stats[2]?.base_stat}`,
      icon: "shield",
    },
    {
      label: `SP-ATK: ${pokemon.stats[3]?.base_stat}`,
      icon: "stars",
    },
    {
      label: `SP-DEF: ${pokemon.stats[4]?.base_stat}`,
      icon: "health_and_safety",
    },
  ];
  return (
    <Container>
      <InnerContainer>
        <Box p={1}>
          <Grid container spacing={2} alignItems={"stretch"}>
            <Grid item xs={12}>
              <Button
                variant={"outlined"}
                onClick={() => {
                  navigate(state.prevPath, {
                    state: { page: state.page ? state.page : 1 },
                  });
                }}
                startIcon={<Icon>arrow_back</Icon>}
              >
                go back
              </Button>
            </Grid>
            {!isLoading ? (
              <>
                <Grid item xs={12} md={3} display={"flex"}>
                  <Background
                    firstcolor={getColor(
                      pokemon.types[0] ? pokemon.types[0].type.name : null
                    )}
                    secondcolor={getColor(
                      pokemon.types[1] ? pokemon.types[1].type.name : null
                    )}
                  >
                    <Icon
                      style={{ alignSelf: "flex-end" }}
                      onClick={() => setIsShiny(!isShiny)}
                      name={"temp_preferences_custom"}
                      fill={isShiny ? 1 : 0}
                      size={32}
                      color={"#f6cb1a"}
                    />
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <img
                        src={
                          pokemon.sprites[
                            isShiny ? "front_shiny" : "front_default"
                          ]
                        }
                        width={200}
                        height={200}
                        alt={"Pokemon"}
                      />
                      <PokemonName
                        variant={pokemon.name.length > 8 ? "h4" : "h3"}
                      >
                        {pokemon.name}
                      </PokemonName>
                    </Box>
                  </Background>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Grid container spacing={2} style={{ display: "flex" }}>
                    {status.map((status) => (
                      <Grid item xs={12} sm={6} key={status.icon}>
                        <div>
                          <PropertyItem
                            icon={status.icon}
                            label={status.label}
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Section>
                    <Typography variant={"h6"}>
                      {state.pokemon.description}
                    </Typography>
                  </Section>
                </Grid>
                <Grid item xs={12}>
                  <Section>
                    {pokemon.abilities.map((ability: Object) => (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        key={ability.ability.name}
                      >
                        <Typography variant={"h5"} textTransform={"capitalize"}>
                          {ability.ability.name}
                        </Typography>
                        {ability.is_hidden && (
                          <Typography
                            color={"rgba(255,255,255,0.63)"}
                            ml={1}
                            variant={"caption"}
                          >
                            (hidden)
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Section>
                </Grid>
                <Grid item xs={12}>
                  <Section>
                    {pokemon.moves
                      .filter((move) =>
                        move.version_group_details.find(
                          (x) => x.move_learn_method.name === "level-up"
                        )
                      )
                      .map((move: Object) => (
                        <Box
                          key={move.move.name}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <Typography>{move.move.name}</Typography>
                        </Box>
                      ))}
                  </Section>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            )}
          </Grid>
        </Box>
      </InnerContainer>
    </Container>
  );
}

const PropertyItem = ({ label, icon }) => {
  return (
    <Item>
      <Icon name={icon} size={42} style={{ marginRight: "1rem" }} />
      <Typography variant={"h4"}>{label}</Typography>
    </Item>
  );
};
