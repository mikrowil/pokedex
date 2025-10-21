import { useLocation } from "react-router-dom";
import { getScrollbarWidth } from "../utilities/utils";
import useBodyScrollable from "./useScrollable";
import { useEffect, useLayoutEffect, useState } from "react";

export const useScrollTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
};

//* Sets padding to replicate the scrollbars when it's not present on the screen.
//  This stops the content from moving left and right when navigating.
export const useScrollBarPresent = () => {
  const scrollbarWidth = getScrollbarWidth();
  const bodyScrollable = useBodyScrollable();
  const [paddingRight, setPaddingRight] = useState("0px");
  useLayoutEffect(() => {
    if (bodyScrollable) {
      setPaddingRight("0px");
    } else {
      setPaddingRight(`${scrollbarWidth}px`);
    }
  }, [bodyScrollable, scrollbarWidth]);

  return paddingRight;
};
