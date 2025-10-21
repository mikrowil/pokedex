import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Skeleton, Typography, useTheme } from "@mui/material";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Icon from "../../components/ui-kit/Icon";
import { convertDeciToMeter, convertHectoToKilo } from "../../utilities/utils";
import { css, Theme } from "@emotion/react";
import { getColor } from "../../utilities/colors";
import { cleanPokemonName } from "../../utilities/stringModifiers";
import Spacer from "../../components/ui-kit/Spacer";
import classes from "./index.module.scss";

const SectionTitle = styled(Typography)(
  ({
    theme,
    firstcolor,
    secondcolor,
  }: {
    theme: Theme;
    firstcolor: string;
    secondcolor: string;
  }) => ({
    fontWeight: 600,
    display: "inline",
    letterSpacing: 1.5,
    filter:
      "drop-shadow(0.5px 0.5px 0px #222) drop-shadow(-0.5px -0.5px 0px #222)",
    backgroundImage: `linear-gradient(
      158deg,
      ${firstcolor ? firstcolor : "#424242"} 0%,
      ${secondcolor ? secondcolor : theme.palette.text.secondary}
    )`,
    color: "transparent",
    backgroundClip: "text",
  })
);

const PokemonName = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.outlined,
    fontFamily: "Kanit",
    textTransform: "uppercase",
  };
});

const PokemonImg = styled.img(
  () => css`
    -webkit-filter: drop-shadow(2px 2px 5px #222);
    filter: drop-shadow(2px 2px 5px #222);
  `
);

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
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [filters, setFilters] = useState({
    abilities: { showHidden: true },
    moves: { showLevelUp: true, showMachine: false, showTutor: false },
  });

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
      label: `HP: ${pokemon.stats[0].base_stat}`,
      icon: "favorite",
    },
    {
      label: `ATK: ${pokemon.stats[1].base_stat}`,
      icon: "swords",
    },
    {
      label: `DEF: ${pokemon.stats[2].base_stat}`,
      icon: "shield",
    },
    {
      label: `SP-ATK: ${pokemon.stats[3].base_stat}`,
      icon: "stars",
    },
    {
      label: `SP-DEF: ${pokemon.stats[4].base_stat}`,
      icon: "health_and_safety",
    },
  ];

  useEffect(() => {
    if (!pokemon) return;
    if (filters.abilities.showHidden) {
      setAbilities(pokemon.abilities);
    } else {
      setAbilities(pokemon.abilities.filter(({ is_hidden }) => !is_hidden));
    }
  }, [filters.abilities.showHidden, pokemon]);

  useEffect(() => {
    if (!pokemon) return;
    let tmpMoves = pokemon.moves;

    if (filters.moves.showLevelUp) {
      tmpMoves = pokemon.moves.filter((move) =>
        move.version_group_details.find(
          (x) => x.move_learn_method.name === "level-up"
        )
      );

      tmpMoves = tmpMoves.map((move) => {
        let level = 0;
        move.version_group_details.forEach(({ level_learned_at }) => {
          if (level_learned_at > 0) {
            level = level_learned_at;
          }
        });
        return { ...move, level };
      });
      tmpMoves = tmpMoves.sort((move, nMove) => move.level > nMove.level);
    }
    if (filters.moves.showMachine) {
      tmpMoves = pokemon.moves.filter((move) =>
        move.version_group_details.find(
          (x) => x.move_learn_method.name === "machine"
        )
      );
    }
    if (filters.moves.showTutor) {
      tmpMoves = pokemon.moves.filter((move) =>
        move.version_group_details.find(
          (x) => x.move_learn_method.name === "tutor"
        )
      );
    }
    setMoves(tmpMoves);
  }, [filters.moves, pokemon]);

  return (
    <div className={classes.display_pokemon_screen_container}>
      <div className={classes.inner_container}>
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
              <Grid item xs={12} display={"flex"}>
                <Background
                  firstcolor={getColor(
                    pokemon.types[0] ? pokemon.types[0].type.name : null
                  )}
                  secondcolor={getColor(
                    pokemon.types[1] ? pokemon.types[1].type.name : null
                  )}
                >
                  <Icon
                    style={{
                      alignSelf: "flex-end",
                      textShadow: "2px 2px 2px #222",
                    }}
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
                    <PokemonImg
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
              <Grid item xs={12}>
                <Section>
                  <Typography variant={"h6"}>
                    {state.pokemon.description}
                  </Typography>
                </Section>
              </Grid>
              <Grid item xs={12}>
                <Spacer amount={2} />
                <SectionHeader title={"Stats"} pokemon={pokemon} />
                <Grid container spacing={2} style={{ display: "flex" }}>
                  {status.map((status) => (
                    <Grid item xs={12} sm={6} key={status.icon}>
                      <div>
                        <PropertyItem icon={status.icon} label={status.label} />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Spacer amount={2} />
                <SectionHeader
                  title={"Abilities"}
                  pokemon={pokemon}
                  filters={[
                    {
                      label: "hidden",
                      onChange: () => {
                        setFilters({
                          ...filters,
                          abilities: {
                            showHidden: !filters.abilities.showHidden,
                          },
                        });
                      },
                      on: filters.abilities.showHidden,
                    },
                  ]}
                />
                <Section>
                  {abilities.map((ability) => (
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
              <Grid item xs={12} sm={6}>
                <Spacer amount={2} />
                <SectionHeader
                  title={"Moves"}
                  pokemon={pokemon}
                  filters={[
                    {
                      label: "level-up",
                      onChange: () => {
                        setFilters({
                          ...filters,
                          moves: {
                            ...filters.moves,
                            showLevelUp: !filters.moves.showLevelUp,
                          },
                        });
                      },
                      on: filters.moves.showLevelUp,
                    },
                    {
                      label: "machine",
                      onChange: () => {
                        setFilters({
                          ...filters,
                          moves: {
                            ...filters.moves,
                            showMachine: !filters.moves.showMachine,
                          },
                        });
                      },
                      on: filters.moves.showMachine,
                    },
                    {
                      label: "tutor",
                      onChange: () => {
                        setFilters({
                          ...filters,
                          moves: {
                            ...filters.moves,
                            showTutor: !filters.moves.showTutor,
                          },
                        });
                      },
                      on: filters.moves.showTutor,
                    },
                  ]}
                />
                <Section>
                  {moves.map(({ move, level }) => (
                    <div style={{ display: "flex" }}>
                      {level ? (
                        <Typography width={"4rem"}>LV: {level}</Typography>
                      ) : null}
                      <Typography style={{ marginLeft: 10 }}>
                        {move.name}
                      </Typography>
                    </div>
                  ))}
                </Section>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Skeleton
                  variant={"rectangular"}
                  animation={"wave"}
                  height={322}
                  style={{ borderRadius: 5 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant={"rectangular"}
                  animation={"wave"}
                  height={66}
                  style={{ borderRadius: 5 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Spacer amount={4} />
                <Grid container spacing={2} style={{ display: "flex" }}>
                  {status.map((status) => (
                    <Grid item xs={12} sm={6} key={status.icon}>
                      <Skeleton
                        animation={"wave"}
                        variant={"rectangular"}
                        height={84}
                        style={{ borderRadius: 5 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}

const PropertyItem = ({ label, icon }) => {
  return (
    <div className={classes.item}>
      <Icon name={icon} size={42} style={{ marginRight: "1rem" }} />
      <Typography variant={"h4"}>{label}</Typography>
    </div>
  );
};

const SectionHeader = ({ pokemon, title, filters = [] }) => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <SectionTitle
        variant={"h4"}
        firstcolor={getColor(
          pokemon.types[0] ? pokemon.types[0].type.name : null
        )}
        secondcolor={getColor(
          pokemon.types[1] ? pokemon.types[1].type.name : null
        )}
      >
        {title}
      </SectionTitle>
      <div style={{ display: "flex" }}>
        {filters.length > 0
          ? filters.map(({ label, onChange, on }) => (
              <div
                key={label}
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 5,
                  padding: "0.3rem 1rem",
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderBottomWidth: 0,
                  marginRight: 5,
                  cursor: "pointer",
                  backgroundColor: on ? theme.palette.primary[600] : "unset",
                }}
                onClick={onChange}
              >
                <Typography variant={"body1"}>{label}</Typography>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
