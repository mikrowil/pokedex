import styled from "styled-components";
import {Icon, Link, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 2rem 1rem;

  align-items: center;
  justify-content: center;
`

const NavContainer = styled.div`
  display: flex;
  flex: 1;

  align-items: center;

  margin: 0 2rem;
`

const StyledLink = styled(Link)`

  position: relative;

  && {
    cursor: pointer;

    color: ${({theme}) => theme.palette.primary[300]};

    text-decoration: none;
    text-underline: none;
  }

  &::after {
    content: '';
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
`

const AvatarContainer = styled.div`
  box-shadow: 0 0 0 2px #ea1818;

  height: 50px;
  width: 50px;

  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  
`

const navItems = [
    {title: "pokemon"}
]

const Header = () => {

    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <Container>
            <div
                style={{
                    maxWidth: theme.breakpoints.values.lg,
                    display: "flex",
                    flex: 1,
                    alignItems: "center"
                }}
            >
                <div
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <Typography
                        variant={"h5"}
                    >
                        Pokedex
                    </Typography>
                </div>

                <NavContainer>
                    {
                        navItems.map(({title}) => (
                            <StyledLink>
                                {title}
                            </StyledLink>
                        ))
                    }
                </NavContainer>


                <AvatarContainer>
                    <Icon
                        fontSize={"large"}
                    >{"person"}</Icon>
                </AvatarContainer>

            </div>
        </Container>
    )
}

export default Header
