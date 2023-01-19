import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useBodyScrollable from "../../hooks/useScrollable";
import { useEffect, useLayoutEffect, useState } from "react";
import { getScrollbarWidth } from "../../utilities/utils";
import { useLocation } from "react-router-dom";

const Background = styled.div(
  ({ theme, paddingRight }) => css`
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

const useScrollTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
};

const scrollbarWidth = getScrollbarWidth();
const useScrollBarPresent = () => {
  const bodyScrollable = useBodyScrollable();
  const [paddingRight, setPaddingRight] = useState("0px");
  useLayoutEffect(() => {
    if (bodyScrollable) {
      setPaddingRight("0px");
    } else {
      setPaddingRight(`${scrollbarWidth}px`);
    }
  }, [bodyScrollable]);

  return paddingRight;
};
