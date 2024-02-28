import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import pdata from "../assets/pokedex.json";
import { LanguageContext } from "../contex/LanguageContext";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import { shuffle } from "../utilities/utils";
import { css } from "@emotion/react";
import { ONGOING, VICTORY } from "../constants/gameConstants";
import Spacer from "../components/ui-kit/Spacer";

const Container = styled.div`
  padding-top: 4rem;
  max-width: 800px;
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

const Control = styled(FormControlLabel)`
  padding: 0 2rem;
  box-sizing: border-box;
  height: 4rem;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.palette.primary[200]};

  & .MuiFormControlLabel-label {
    font-size: 32px;
  }

  & .MuiCheckbox-root {
    width: 2rem;
  }

  & .MuiSvgIcon-root {
    font-size: 42px;
  }
`;

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
              pokedexLength={pokedex.length}
            />
          )}
        </Box>
      </InnerContainer>
    </Container>
  );
}

const Start = ({ start, settings, setSettings, pokedexLength }) => {
  const theme = useTheme();
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
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={"h6"}>
              {pokedexLength} pokemon selected
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Grid container spacing={2}>
                {genEntries.map((gen) => (
                  <Grid item xs={12} key={gen.label}>
                    <Control
                      labelPlacement={"start"}
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
                      control={
                        <Checkbox value={gen.value} checked={gen.value} />
                      }
                      label={gen.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Spacer />
            <div
              style={{
                border: `1px solid ${theme.palette.primary[200]}`,
                borderRadius: 5,
                padding: "1rem",
              }}
            >
              <Grid container spacing={2}>
                {typeEntries.map((type) => (
                  <Grid item xs={12} sm={6} key={type.label}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FormControlLabel
                        style={{ width: 200, paddingLeft: "2.5rem" }}
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
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              size={"large"}
              fullWidth
              onClick={start}
              variant={"contained"}
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const Game = ({ menu, pokedex = pdata }) => {
  const { language } = useContext(LanguageContext);
  const [selectedMon, setSelectedMon] = useState(null);
  const [loadingPokemonImage, setLoadingPokemonImage] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [gameData, setGameData] = useState({
    tries: 2,
    answer: null,
    status: ONGOING,
  });
  const randomCountTracker = useRef({});

  const startGame = useCallback(() => {
    setLoadingPokemonImage(true);
    setGameData({
      tries: 2,
      status: ONGOING,
      answer: null,
    });
    let a = [];

    let tempPokedex = [...pokedex];

    for (let i = 0; i < 4; i++) {
      a.push(
        tempPokedex.splice(
          Math.floor(Math.random() * (pokedex.length - (i + 1))),
          1
        )[0]
      );
    }

    a.sort((x, y) => {
      let xCount = randomCountTracker.current[x.name.english];
      let yCount = randomCountTracker.current[y.name.english];
      if (!xCount) {
        xCount = 0;
      }
      if (!yCount) {
        yCount = 0;
      }

      if (xCount > yCount) {
        return 1;
      } else if (xCount < yCount) {
        return -1;
      } else {
        return 0;
      }
    });
    setSelectedMon(a[0]);
    setAnswers(shuffle(a));
  }, [pokedex]);

  useEffect(() => {
    if (!selectedMon) return;
    const newState = {
      [selectedMon.name.english]: randomCountTracker.current[
        selectedMon.name.english
      ]
        ? (randomCountTracker.current[selectedMon.name.english] += 1)
        : 1,
    };
    randomCountTracker.current = { ...randomCountTracker.current, ...newState };
  }, [selectedMon]);

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
        <div
          style={{
            height: "180px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PokemonImage
            show={isVictory()}
            alt={"pokemon"}
            width={"150px"}
            height={"150px"}
            style={!loadingPokemonImage ? {} : { display: "none" }}
            src={selectedMon?.image ? selectedMon.image.thumbnail : ""}
            onLoad={() => {
              setLoadingPokemonImage(false);
            }}
          />
          {loadingPokemonImage && <CircularProgress size={64} />}
        </div>
        <Typography variant={"body1"}>{showName()}</Typography>
      </div>
      <Grid
        container
        spacing={2}
        style={{ marginTop: "1rem", maxWidth: 800, width: "100%" }}
      >
        {answers.map((name) => (
          <Grid item xs={12} sm={6} key={name.name["english"]}>
            <Button
              size={"large"}
              variant={"contained"}
              fullWidth
              onClick={() => guess(name.name[language])}
            >
              {name.name[language]}
            </Button>
          </Grid>
        ))}
        {isVictory() ? (
          <>
            <Grid display={"flex"} item xs={6} justifyContent={"flex-end"}>
              <Button
                style={{ marginTop: "1rem" }}
                fullWidth
                variant={"outlined"}
                onClick={menu}
              >
                Menu
              </Button>
            </Grid>
            <Grid
              display={"flex"}
              item
              xs={6}
              justifyContent={"flex-start"}
              style={{ marginTop: "1rem" }}
            >
              <Button fullWidth variant={"outlined"} onClick={restart}>
                Restart
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  );
};
