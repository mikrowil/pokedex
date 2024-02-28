import React from "react";
import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Tooltip,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import Icon from "../ui-kit/Icon";
import Typography from "../ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../contex/LanguageContext";
import { useScrollBarPresent } from "../../hooks/useScrollBarPresent";
import { ColorModeContext } from "../../contex/ColorModeContext";

const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem;
`;

const StyledIcon = styled(Icon)`
  transition: color 300ms ease-in-out;
`;

const AvatarContainer = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 50px;
  justify-content: flex-end;
  position: relative;
  width: 50px;

  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode, setMode } = useContext(ColorModeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const paddingRight = useScrollBarPresent();

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
        <AppBar
          elevation={0}
          variant={"elevation"}
          style={{
            display: "flex",
            margin: "0 auto",
            padding: "0 1rem",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box
            width={"100%"}
            justifyContent={"space-between"}
            display={"flex"}
            flex={1}
            alignItems={"center"}
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              paddingRight: paddingRight,
            }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Typography variant={"h4"}>Pokedex</Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Tooltip title={`Current language: ${language}`}>
                <AvatarContainer
                  onClick={() => {
                    setLanguage(
                      language === "english" ? "japanese" : "english"
                    );
                  }}
                >
                  <StyledIcon size={32} fill={1}>
                    translate
                  </StyledIcon>
                </AvatarContainer>
              </Tooltip>
              <AvatarContainer
                onClick={() => {
                  setMode(mode === "light" ? "dark" : "light");
                }}
              >
                <StyledIcon size={32} fill={1}>
                  {mode === "light" ? "dark_mode" : "light_mode"}
                </StyledIcon>
              </AvatarContainer>
            </div>
          </Box>
        </AppBar>
      </ElevationScroll>
    </Container>
  );
};

export default Header;
