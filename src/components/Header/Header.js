import styled from "@emotion/styled";
import { Icon } from "@mui/material";
import Typography from "../ui-kit/Typography";
import { useNavigate } from "react-router-dom";

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
  justify-content: center;
  position: relative;
  width: 50px;

  cursor: pointer;
`;

const Header = ({ mode, setMode }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div
        style={{
          maxWidth: "1280px",
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
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
        <AvatarContainer
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        >
          <StyledIcon fontSize={"large"}>
            {mode === "light" ? "dark_mode" : "light_mode"}
          </StyledIcon>
        </AvatarContainer>
      </div>
    </Container>
  );
};

export default Header;
