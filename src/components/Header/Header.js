import styled from "styled-components";
import {Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate()

    return (
        <Container>

            <div
                style={{cursor:"pointer"}}
                onClick={()=>{
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
