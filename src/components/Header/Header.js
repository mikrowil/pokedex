import React from "react";
import styled from "@emotion/styled";
import { AppBar, Box, useScrollTrigger } from "@mui/material";
import Typography from "../ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem;
`;

const Header = () => {
  const navigate = useNavigate();

  const ElevationScroll = (props) => {
    const { children, window } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  };

  return (
    <Container>
      <ElevationScroll>
        <AppBar elevation={0} variant={"elevation"}>
          <Box padding={"0 2rem"}>
            <div
              style={{
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Typography variant={"h3"} className={classes.header_title}>
                Pokedex
              </Typography>
            </div>
          </Box>
        </AppBar>
      </ElevationScroll>
    </Container>
  );
};

export default Header;
