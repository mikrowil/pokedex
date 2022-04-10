import React from "react";
import styled from "styled-components";
import {Button as MuiButton, LinearProgress} from "@mui/material";

const StyledButton = styled(MuiButton)`
  && {
    border-radius: 10px;
  }
`;

export default function Button({children, isLoading, ...props}) {

    return (
        <StyledButton {...props}>
            {
                isLoading ? <LinearProgress variant={"indeterminate"}/> :
                    children
            }
        </StyledButton>
    )
}
