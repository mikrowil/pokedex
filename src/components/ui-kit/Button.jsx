import React from "react";
import styled from "styled-components";
import {Button as MuiButton} from "@mui/material";

const StyledButton = styled(MuiButton)`
  &&{
    border-radius: 10px;
  }
`;

export default function Button({children, ...props}){
    return(
        <StyledButton {...props}>
            {children}
        </StyledButton>
    )
}
