import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Icon from "../ui-kit/Icon";
import Typography from "../ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../contex/LanguageContext";

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
  height: 5vh;
  width: 100%;
  align-items: center;
  justify-content: center;
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

const Header = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Container>
      <div
        style={{
          maxWidth: "1280px",
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          p={1}
          justifyContent={"space-between"}
          display={"flex"}
          flex={1}
          alignItems={"center"}
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
            <AvatarContainer
              onClick={() => {
                setLanguage(language === "english" ? "japanese" : "english");
              }}
            >
              <StyledIcon size={32} fill={1}>
                translate
              </StyledIcon>
            </AvatarContainer>
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
      </div>
    </Container>
  );
};

export default Header;
