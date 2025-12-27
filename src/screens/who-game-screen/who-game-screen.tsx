import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import pdata from "../../assets/pokedex.json";
import {
  LanguageContext,
  useLanguageContext,
} from "../../context/language-context";
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
import { shuffle } from "../../utilities/utils";
import { css } from "@emotion/react";
import { ONGOING, VICTORY } from "../../constants/game-constants";
import Spacer from "../../components/ui-kit/spacer";
import { Pokemon, PokemonDetails } from "../../api/pokeapi";

export default function WhoGameScreen() {
  const [inProgress, setInProgress] = useState(false);
  const [pokedex, setPokedex] = useState<Pokemon[]>(
    pdata as unknown as Pokemon[]
  );
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
    (dex: Pokemon[]) => {
      let newDex: Pokemon[] = [];

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

  return (
    <div className="pt-16 pr-4 pl-4 pb-4">
      <div>
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
            <Game pokedex={pokedex} menu={() => setInProgress(false)} />
          ) : (
            <Start
              start={() => setInProgress(true)}
              settings={settings}
              setSettings={setSettings}
              pokedexLength={pokedex.length}
            />
          )}
        </Box>
      </div>
    </div>
  );
}

const Start = ({
  start,
  settings,
  setSettings,
  pokedexLength,
}: {
  start: () => void;
  settings: any;
  setSettings: (settings: any) => void;
  pokedexLength: number;
}) => {
  const theme = useTheme();
  const [genEntries, setGenEntries] = useState<
    {
      prop: string;
      value: { gen: { on: boolean; label: string } };
      label: string;
    }[]
  >([]);
  const [typeEntries, setTypeEntries] = useState<
    {
      prop: string;
      value: { types: { on: boolean; label: string } };
      label: string;
    }[]
  >([]);
  useEffect(() => {
    setGenEntries(
      Object.entries(settings.gen).map((gen: any) => {
        return { prop: gen[0], value: gen[1].on, label: gen[1].label };
      })
    );
    setTypeEntries(
      Object.entries(settings.types).map((type: any) => {
        return { prop: type[0], value: type[1].on, label: type[1].label };
      })
    );
  }, [settings.gen, settings.types]);
  return (
    <>
      <div>
        <Typography textAlign={"left"} variant={"h3"}>
          {pokedexLength} pokemon selected
        </Typography>
        <Spacer amount={2} />
        <div>
          <Grid container spacing={2}>
            {genEntries.map((gen) => (
              <Grid item xs={6} key={gen.label}>
                <input
                  type="checkbox"
                  style={{ display: "flex", margin: 0 }}
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
                {gen.label}
              </Grid>
            ))}
          </Grid>
        </div>
        <Spacer amount={2} />
        <div>
          <Grid container spacing={2}>
            {typeEntries.map((type) => (
              <Grid item xs={12} sm={6} key={type.label}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormControlLabel
                    style={{ width: 200, paddingLeft: "2.5rem" }}
                    control={<input type="checkbox" />}
                    label={type.label}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        <Spacer />
        <Button size={"large"} fullWidth onClick={start} variant={"contained"}>
          Start
        </Button>
      </div>
    </>
  );
};

const Game = ({
  menu,
  pokedex = pdata as unknown as Pokemon[],
}: {
  menu: () => void;
  pokedex: Pokemon[];
}) => {
  const { language } = useLanguageContext();
  const [selectedMon, setSelectedMon] = useState<Pokemon | null>(null);
  const [loadingPokemonImage, setLoadingPokemonImage] = useState(true);
  const [answers, setAnswers] = useState<Pokemon[]>([]);
  const [gameData, setGameData] = useState({
    tries: 2,
    answer: null,
    status: ONGOING,
  });
  const randomCountTracker = useRef<any>({});

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
    setLoadingPokemonImage(false);
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
    if (!selectedMon) return;
    if (name === selectedMon.name.english) {
      setGameData((prevState) => ({ ...prevState, status: VICTORY }));
    }
  };

  const isVictory = () => {
    return gameData.status === VICTORY;
  };

  const showName = () => {
    if (isVictory()) {
      return selectedMon?.name.english;
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
          <img
            src={selectedMon?.image.thumbnail}
            alt="pokemon"
            width={200}
            height={200}
            className="p-4"
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
            <button
              className="w-full px-2 py-3 rounded-md bg-primary text-2xl font-bold "
              onClick={() => guess(name.name.english)}
            >
              {name.name.english}
            </button>
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
