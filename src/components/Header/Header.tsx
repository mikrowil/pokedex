import React, { useContext, useState } from "react";
import { AppBar, Box, Button, useScrollTrigger } from "@mui/material";
import Typography from "../ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";
import cookie from "js-cookie";
import RegisterModal from "./widgets/RegisterModal";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState();
  const { user } = useContext(AuthContext);

  const ElevationScroll = (props: {
    children: React.ReactNode;
    window?: () => Window;
  }) => {
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
    <div className={classes.header}>
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
            {user ? (
              user.username
            ) : (
              <Button
                onClick={(e) => setAnchor(e.currentTarget)}
                size={"small"}
              >
                Login
              </Button>
            )}
            <Button
              onClick={() => {
                cookie.set("userToken", null);
              }}
            >
              Logout
            </Button>
            <RegisterModal anchor={anchor} setAnchor={setAnchor} />
          </Box>
        </AppBar>
      </ElevationScroll>
    </div>
  );
};

export default Header;
