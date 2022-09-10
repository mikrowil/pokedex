import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledIcon = styled.span(
  ({ color, size, fill, theme }) => css`
    &&.material-symbols-rounded {
      font-variation-settings: "FILL" ${fill ? fill : 0}, "wght" 400, "GRAD" 0,
        "opsz" 48;
      color: ${color ? color : theme.palette.primary[500]};
      font-size: ${size ? `${size}px` : `24px`};
    }
  `
);

/**
 * Icon
 * @param name
 * @param size
 * @param color
 * @param fill
 * @returns {JSX.Element}
 * @constructor
 */
export default function Icon({ name, size, color, fill }) {
  return (
    <StyledIcon
      className={"material-symbols-rounded"}
      size={size}
      color={color}
      fill={fill}
    >
      {name}
    </StyledIcon>
  );
}
