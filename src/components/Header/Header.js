import styled from "styled-components";
import { Icon, Link, useTheme } from "@mui/material";
import Typography from "../ui-kit/Typography";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
  height: 5vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  transition: color 300ms ease-in-out;
`;

const NavContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0 2rem;
`;

const StyledLink = styled(Link)`
  position: relative;

  && {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.primary[300]};
    text-decoration: none;
    text-underline: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 200ms ease-in;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
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

const navItems = [{ title: "pokemon" }];

const Header = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container>
      <div
        style={{
          maxWidth: "1280px",
          display: "flex",
          flex: 1,
          alignItems: "center",
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
        <NavContainer>
          {navItems.map(({ title }) => (
            <StyledLink>{title}</StyledLink>
          ))}
        </NavContainer>
        <AvatarContainer
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        >
          <StyledIcon
            style={{ color: theme.typography.h4.color }}
            fontSize={"large"}
          >
            {mode === "light" ? "dark_mode" : "light_mode"}
          </StyledIcon>
        </AvatarContainer>
      </div>
    </Container>
  );
};

export default Header;
