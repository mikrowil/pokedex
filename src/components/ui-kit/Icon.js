import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledIcon = styled.span(
  ({ color, size, fill, theme, isButton }) => css`
    &&.material-symbols-rounded {
      font-variation-settings: "FILL" ${fill ? fill : 0}, "wght" 400, "GRAD" 0,
        "opsz" 48;
      color: ${color ? color : theme.palette.primary.main};
      font-size: ${size ? `${size}px` : `24px`};
    }
    cursor: ${isButton ? "pointer" : "normal"};
  `
);

/**
 * Icon
 * @param name
 * @param size
 * @param color
 * @param fill
 * @param onClick
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Icon({ name, size, color, fill, onClick, ...props }) {
  return (
    <StyledIcon
      {...props}
      onClick={onClick}
      isButton={!!onClick}
      className={"material-symbols-rounded"}
      size={size}
      color={color}
      fill={fill}
    >
      {name}
    </StyledIcon>
  );
}
