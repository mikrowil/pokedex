import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";
import {
  useScrollBarPresent,
  useScrollTop,
} from "../../hooks/useScrollBarPresent";

const Background = styled.div(
  ({ theme, paddingRight }: { theme: Theme; paddingRight: string }) => css`
    display: flex;
    flex: 1;
    background-color: ${theme.palette.background.default};
    flex-direction: column;
    min-height: 100vh;
    background-size: cover;
    transition: background-color 700ms ease-in-out;
    padding-right: ${paddingRight};
  `
);

export default function StyledBackground({ children }) {
  const paddingRight = useScrollBarPresent();
  useScrollTop();

  return <Background paddingRight={paddingRight}>{children}</Background>;
}
