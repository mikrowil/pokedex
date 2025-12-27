import { Box, css } from "@mui/material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { getColor } from "../../utilities/colors";

interface PokemonCardProps {
  name: string;
  img: string;
  firstType: string;
  secondType: string;
  onClick: (name: string) => void;
}

export default function PokemonCard({
  name,
  img,
  firstType,
  secondType,
  onClick,
}: PokemonCardProps) {
  return (
    <div
      onClick={() => onClick(name)}
      className={`firstcolor-[${getColor(firstType)}] secondcolor-[${getColor(
        secondType
      )}] cursor-pointer`}
    >
      <Typography variant={"h5"}>{name}</Typography>
      <img id={"pokemon_image"} src={img} alt={"pokemon sprite"} />
    </div>
  );
}
