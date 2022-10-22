import { Box, css } from "@mui/material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import {
  BUG,
  DARK,
  DRAGON,
  ELECTRIC,
  FAIRY,
  FIGHTING,
  FIRE,
  FLYING,
  GHOST,
  GRASS,
  GROUND,
  ICE,
  NORMAL,
  POISON,
  PSYCHIC,
  ROCK,
  STEEL,
  WATER,
} from "../../theme/typeColors";

const Card = styled(Box)(
  ({ theme, firstcolor, secondcolor, ...props }) => css`
    min-height: 15rem;
    max-width: 13rem;
    width: 100%;
    border-radius: 5px;
    background: rgb(190, 247, 255);
    background: linear-gradient(
      158deg,
      ${firstcolor ? firstcolor : theme.palette.background.paper} 0%,
      ${secondcolor ? secondcolor : theme.palette.background.paper}
    );
    transition: min-height 200ms ease-in-out;

    :hover {
      min-height: 14rem;
      cursor: ${props.clickable};
    }
  `
);

const ImageContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 12rem;
  `
);

const StyledTypography = styled(Typography)(
  () => css`
    &&.MuiTypography-root {
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
      color: #fff;
    }
  `
);

const getColor = (type) => {
  if (!type) return null;
  const lower = type.toLowerCase();

  switch (lower) {
    case "bug":
      return BUG;
    case "dark":
      return DARK;
    case "dragon":
      return DRAGON;
    case "electric":
      return ELECTRIC;
    case "fairy":
      return FAIRY;
    case "fighting":
      return FIGHTING;
    case "fire":
      return FIRE;
    case "flying":
      return FLYING;
    case "ghost":
      return GHOST;
    case "grass":
      return GRASS;
    case "ground":
      return GROUND;
    case "ice":
      return ICE;
    case "normal":
      return NORMAL;
    case "poison":
      return POISON;
    case "psychic":
      return PSYCHIC;
    case "rock":
      return ROCK;
    case "steel":
      return STEEL;
    case "water":
      return WATER;
    default:
      return null;
  }
};

export default function PokemonCard({
  name,
  img,
  firstType,
  secondType,
  onClick,
  ...props
}) {
  return (
    <Card
      {...props}
      clickable={Boolean(onClick) ? "pointer" : "unset"}
      onClick={onClick}
      firstcolor={getColor(firstType)}
      secondcolor={getColor(secondType)}
    >
      <StyledTypography variant={"h5"}>{name}</StyledTypography>
      <ImageContainer>
        <img src={img} alt={"pokemon sprite"} style={{ width: "8rem" }} />
      </ImageContainer>
    </Card>
  );
}
