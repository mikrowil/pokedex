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
    transition: min-height 70ms ease-in-out;

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
    >
      <StyledTypography variant={"h5"}>{name}</StyledTypography>
      <ImageContainer>
        <img src={img} alt={"pokemon sprite"} style={{ width: "8rem" }} />
      </ImageContainer>
    </Card>
  );
}
