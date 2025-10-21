import { Box, css } from "@mui/material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { getColor } from "../../utilities/colors";

const Card = styled(Box)(
  ({ theme, firstcolor, secondcolor, ...props }) => css`
    min-height: 15rem;
    max-width: 13rem;
    width: 100%;
    border-radius: 5px;
    background: rgb(190, 247, 255);
    background: linear-gradient(
      158deg,
      ${firstcolor ? firstcolor : "#424242"} 0%,
      ${secondcolor ? secondcolor : "#424242"}
    );
    position: relative;
    z-index: 1;

    :hover {
      cursor: ${props.clickable};

      & #pokemon_image {
        width: 7rem;
      }
    }

    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        58deg,
        ${firstcolor ? firstcolor : "#424242"} 25%,
        ${secondcolor ? secondcolor : "#424242"}
      );
      opacity: 0;
      transition: opacity 0.6s;
      z-index: -1;
    }

    :hover::before {
      opacity: 1;
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

const PokemonImg = styled.img(
  () => css`
    -webkit-filter: drop-shadow(2px 2px 5px #222);
    filter: drop-shadow(2px 2px 5px #222);
    width: 5rem;
    transition: width 0.1s linear;
  `
);

const StyledTypography = styled(Typography)(
  ({ theme }) => theme.typography.outlined
);

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
      tabIndex={0}
    >
      <StyledTypography variant={"h5"}>{name}</StyledTypography>
      <ImageContainer>
        <PokemonImg id={"pokemon_image"} src={img} alt={"pokemon sprite"} />
      </ImageContainer>
    </Card>
  );
}
