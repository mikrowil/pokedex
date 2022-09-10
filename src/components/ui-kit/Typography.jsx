import React from "react";
import { Typography as MuiTypography } from "@mui/material";
import styled from "styled-components";

const StyledTypography = styled(MuiTypography)`
  transition: color 500ms ease-in-out;
`;

const Typography = ({ children, ...props }) => {
  return <StyledTypography {...props}>{children}</StyledTypography>;
};

export default Typography;