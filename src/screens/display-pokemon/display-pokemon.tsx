import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { convertDeciToMeter, convertHectoToKilo } from "../../utilities/utils";
import { cleanPokemonName } from "../../utilities/stringModifiers";
import Spacer from "../../components/ui-kit/spacer";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import {
  ArrowLeftIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ArrowUpRightIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function DisplayPokemon() {
  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();
  const { name } = useParams();
  const [isShiny, setIsShiny] = useState(false);

  const { pokemon, isLoading } = usePokemonDetails(
    cleanPokemonName(name?.toLowerCase() ?? "")
  );

  if (!pokemon) return <div>Not found!</div>;

  const status = [
    {
      label: `Height: ${convertDeciToMeter(pokemon.height)} m`,
      icon: <ArrowLongUpIcon className="size-6" />,
    },
    {
      label: `Weight: ${convertHectoToKilo(pokemon.weight)} kg`,
      icon: <ArrowLongDownIcon className="size-6" />,
    },
    {
      label: `Base Exp: ${pokemon.base_experience}`,
      icon: <ArrowUpRightIcon className="size-6" />,
    },
    {
      label: `HP: ${pokemon.stats[0].base_stat}`,
      icon: <HeartIcon className="size-6" />,
    },
    {
      label: `ATK: ${pokemon.stats[1].base_stat}`,
      icon: <ExclamationTriangleIcon className="size-6" />,
    },
    {
      label: `DEF: ${pokemon.stats[2].base_stat}`,
      icon: <ShieldCheckIcon className="size-6" />,
    },
    {
      label: `SP-ATK: ${pokemon.stats[3].base_stat}`,
      icon: <StarIcon className="size-6" />,
    },
    {
      label: `SP-DEF: ${pokemon.stats[4].base_stat}`,
      icon: <ShieldCheckIcon className="size-6" />,
    },
  ];

  return (
    <div className={"box-border pt-16 pr-4 pl-4 pb-4"}>
      <div className={"max-w-[1280px] mx-auto w-full"}>
        <Grid container spacing={2} alignItems={"stretch"}>
          <Grid item xs={12}>
            <Button
              variant={"outlined"}
              onClick={() => {
                navigate(state.prevPath, {
                  state: { page: state.page ? state.page : 1 },
                });
              }}
              startIcon={<ArrowLeftIcon className="size-6" />}
            >
              go back
            </Button>
          </Grid>
          {!isLoading ? (
            <>
              <Grid item xs={12} display={"flex"}>
                <div
                // firstcolor={getColor(
                //   pokemon.types[0] ? pokemon.types[0].type.name : null
                // )}
                // secondcolor={getColor(
                //   pokemon.types[1] ? pokemon.types[1].type.name : null
                // )}
                >
                  <StarIcon
                    className="size-6"
                    onClick={() => setIsShiny(!isShiny)}
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
                    <Typography variant={pokemon.name.length > 8 ? "h4" : "h3"}>
                      {pokemon.name}
                    </Typography>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Typography variant={"h6"}>
                    {state.pokemon.description}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Spacer amount={2} />
                <Typography variant={"h4"}>Stats</Typography>
                <Grid container spacing={2} style={{ display: "flex" }}>
                  {status.map((status) => (
                    <Grid item xs={12} sm={6} key={status.label}>
                      <div>
                        <PropertyItem label={status.label} />
                      </div>
                    </Grid>
                  ))}
                </Grid>
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
                    <Grid item xs={12} sm={6} key={status.label}>
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

const PropertyItem = ({ label }: { label: string }) => {
  return (
    <div
      className={"flex items-center border border-primary-main p-4 rounded-md"}
    >
      <ClockIcon className="size-6 mr-2" />
      <Typography variant={"h4"}>{label}</Typography>
    </div>
  );
};
