import styled from "styled-components";
import {Link, Typography} from "@mui/material";

const Container = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  
  align-items: center;
  
  border-bottom: 1px solid ${({theme})=> theme.palette.secondary.light};
`

const NavContainer = styled.div`
  display: flex;
  flex: 1;
  
  align-items: center;
  
  margin: 0 2rem;
`

const StyledLink = styled(Link)`
  &&{
    cursor: pointer;
    
    color: ${({theme})=> theme.palette.primary[300]};
    
    text-decoration: none;
    text-underline: none;
  }
`

const navItems = [
    {title:"pokemon"}
]

const Header = () => {
    return (
        <Container>

            <Typography variant={"h5"}>
                Pokedex
            </Typography>

            <NavContainer>
                {
                    navItems.map(({title})=>(
                        <StyledLink>
                            {title}
                        </StyledLink>
                    ))
                }
            </NavContainer>

            <Typography>
                Profile
            </Typography>
        </Container>
    )
}

export default Header
