import React, { useCallback, useContext, useEffect, useState } from "react";
import pdata from "../assets/pokedex.json";
import { LanguageContext } from "../contex/LanguageContext";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { shuffle } from "../utilities/utils";
import { css } from "@emotion/react";
import { ONGOING, VICTORY } from "../constants/gameConstants";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const PokemonImage = styled.img(
  ({ show }) => css`
    margin: 1rem 0;
    filter: brightness(${show ? 1 : 0});
  `
);

export default function WhoGameScreen() {
  const [inProgress, setInProgress] = useState(false);
  const [pokedex: Array, setPokedex] = useState(pdata);
  const [settings, setSettings] = useState({
    gen: {
      gen1: { on: false, label: "Gen one" },
      gen2: { on: false, label: "Gen two" },
      gen3: { on: false, label: "Gen three" },
      gen4: { on: false, label: "Gen four" },
      gen5: { on: false, label: "Gen five" },
      gen6: { on: false, label: "Gen six" },
      gen7: { on: false, label: "Gen seven" },
      gen8: { on: false, label: "Gen eight" },
    },
    types: {
      electric: { on: false, label: "Electric" },
      fire: { on: false, label: "Fire" },
      grass: { on: false, label: "Grass" },
      ice: { on: false, label: "Ice" },
      bug: { on: false, label: "Bug" },
      dark: { on: false, label: "Dark" },
      rock: { on: false, label: "Rock" },
      fairy: { on: false, label: "Fairy" },
    },
  });

  const applyGenFilter = useCallback(
    (dex) => {
      let newDex = [];

      if (settings.gen.gen1.on) {
        newDex = [...dex.slice(0, 151), ...newDex];
      }
      if (settings.gen.gen2.on) {
        newDex = [...dex.slice(151, 251), ...newDex];
      }
      if (settings.gen.gen3.on) {
        newDex = [...dex.slice(251, 386), ...newDex];
      }
      if (settings.gen.gen4.on) {
        newDex = [...dex.slice(386, 494), ...newDex];
      }
      if (settings.gen.gen5.on) {
        newDex = [...dex.slice(494, 649), ...newDex];
      }
      if (settings.gen.gen6.on) {
        newDex = [...dex.slice(649, 721), ...newDex];
      }
      if (settings.gen.gen7.on) {
        newDex = [...dex.slice(721, 809), ...newDex];
      }
      if (settings.gen.gen8.on) {
        newDex = [...dex.slice(809, 898), ...newDex];
      }

      if (newDex.length < 1) {
        return dex;
      } else {
        return newDex;
      }
    },
    [settings.gen]
  );

  const applyTypeFilter = useCallback(
    (dex) => {
      let newDex = [];
      dex.forEach((entry) => {
        if (
          entry.type.find((type: string) => {
            let found = false;
            Object.entries(settings.types).forEach(([x, y]) => {
              if (x.toUpperCase() === type.toUpperCase()) {
                if (y.on) {
                  found = true;
                }
              }
            });
            return found;
          })
        ) {
          newDex.push(entry);
        }
      });

      if (newDex.length < 1) {
        return dex;
      } else {
        return newDex;
      }
    },
    [settings.types]
  );

  useEffect(() => {
    const dex = pdata;
    let newDex = applyGenFilter(dex);
    newDex = applyTypeFilter(newDex);

    if (newDex.length <= 0) {
      setPokedex(dex);
    } else {
      setPokedex(newDex);
    }
  }, [applyGenFilter, applyTypeFilter, settings.gen]);

  return (
    <Container>
      <InnerContainer>
        <Box
          p={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{
            textAlign: "center",
          }}
        >
          {inProgress ? (
            <Game
              pokedex={pokedex}
              menu={() => setInProgress(false)}
              settings={settings}
            />
          ) : (
            <Start
              start={() => setInProgress(true)}
              settings={settings}
              setSettings={setSettings}
            />
          )}
        </Box>
      </InnerContainer>
    </Container>
  );
}

const Start = ({ start, settings, setSettings }) => {
  const [genEntries, setGenEntries] = useState([]);
  const [typeEntries, setTypeEntries] = useState([]);
  useEffect(() => {
    setGenEntries(
      Object.entries(settings.gen).map((gen) => {
        return { prop: gen[0], value: gen[1].on, label: gen[1].label };
      })
    );
    setTypeEntries(
      Object.entries(settings.types).map((type) => {
        return { prop: type[0], value: type[1].on, label: type[1].label };
      })
    );
  }, [settings.gen, settings.types]);
  return (
    <>
      <Grid container spacing={2} display={"flex"} maxWidth={"190px"}>
        <Grid item xs={12}>
          <Button onClick={start} variant={"outlined"}>
            Start
          </Button>
        </Grid>
        {genEntries.map((gen) => (
          <Grid item xs={12} key={gen.label}>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Switch
                    value={gen.value}
                    checked={gen.value}
                    onChange={(value) => {
                      setSettings({
                        ...settings,
                        gen: {
                          ...settings.gen,
                          [gen.prop]: {
                            label: gen.label,
                            on: value.target.checked,
                          },
                        },
                      });
                    }}
                  />
                }
                label={gen.label}
              />
            </div>
          </Grid>
        ))}
        {typeEntries.map((type) => (
          <Grid item xs={12} key={type.label}>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Switch
                    value={type.value}
                    checked={type.value}
                    onChange={(value) => {
                      setSettings({
                        ...settings,
                        types: {
                          ...settings.types,
                          [type.prop]: {
                            label: type.label,
                            on: value.target.checked,
                          },
                        },
                      });
                    }}
                  />
                }
                label={type.label}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const Game = ({ menu, settings, pokedex = pdata }) => {
  const { language } = useContext(LanguageContext);
  const [selectedMon, setSelectedMon] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [gameData, setGameData] = useState({
    tries: 2,
    answer: null,
    status: ONGOING,
  });

  const startGame = useCallback(() => {
    setGameData({ tries: 2, status: ONGOING, answer: null });
    let a = [];
    let tempPokedex = [...pokedex];

    if (settings.gen.length) {
    }
    let r = Math.floor(Math.random() * pokedex.length);
    let selected = tempPokedex.splice(r, 1)[0];

    a.push(selected.name);
    for (let i = 0; i < 3; i++) {
      a.push(
        tempPokedex.splice(
          Math.floor(Math.random() * (pokedex.length - (i + 1))),
          1
        )[0].name
      );
    }

    setSelectedMon(selected);
    setAnswers(shuffle(a));
  }, [pokedex, settings.gen.length]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const guess = (name: string) => {
    if (name === selectedMon.name[language]) {
      setGameData((prevState) => ({ ...prevState, status: VICTORY }));
    }
  };

  const isVictory = () => {
    return gameData.status === VICTORY;
  };

  const showName = () => {
    if (isVictory()) {
      return selectedMon?.name[language];
    } else {
      return "Who am I?";
    }
  };

  const restart = () => {
    startGame();
  };

  return (
    <>
      <div>
        <Typography variant={"h5"}>Who's that pokemon?</Typography>
        <PokemonImage
          show={isVictory()}
          alt={"pokemon"}
          width={"150px"}
          src={selectedMon?.image ? selectedMon.image.thumbnail : ""}
        />
        <Typography variant={"body1"}>{showName()}</Typography>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex" }}>
          {answers.map((name) => (
            <div key={name["english"]} style={{ margin: "1rem" }}>
              <Button
                variant={"contained"}
                onClick={() => guess(name[language])}
              >
                {name[language]}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {isVictory() ? (
        <div style={{ display: "inline-block" }}>
          <Grid
            container
            spacing={1}
            style={{ display: "flex", marginTop: "1rem" }}
          >
            <Grid item xs={6}>
              <Button variant={"outlined"} onClick={menu}>
                Menu
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant={"outlined"} onClick={restart}>
                Restart
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </>
  );
};
