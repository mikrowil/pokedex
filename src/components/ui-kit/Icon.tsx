import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";

const StyledIcon = styled.span(
  ({ color, size, fill, theme, isButton }) => css`
    &&.material-symbols-rounded {
      font-variation-settings: "FILL" ${fill ? fill : 0}, "wght" 400, "GRAD" 0,
        "opsz" 48;
      color: ${color};
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
 * @param children
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Icon({
  name,
  size,
  color,
  fill,
  onClick,
  children,
  ...props
}) {
  const theme = useTheme();

  const defaultColor =
    theme.palette.mode === "light"
      ? theme.palette.primary[800]
      : theme.palette.primary[300];

  return (
    <StyledIcon
      {...props}
      onClick={onClick}
      isButton={!!onClick}
      className={"material-symbols-rounded"}
      size={size}
      color={color || defaultColor}
      fill={fill}
    >
      {name || children}
    </StyledIcon>
  );
}
