
import PokemonList from "../../components/PokemonList/PokemonList";
import usePokemon from "../../hooks/usePokemon";
import {Button, CircularProgress, Typography} from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  
  display: flex;
  flex: 1;
  flex-direction: column;
  
  margin :1rem auto;
  
  
  max-width: 1200px;
`

const ShowButton = styled(Button)`
  
`

const MainContainer = () =>{

    const {pokemon, showMore, isLoading} = usePokemon()



    return (
        <Container>
                <Typography variant={"h3"}>
                    Pokemon
                </Typography>
            {
                !isLoading ? <PokemonList pokemon={pokemon}/> : <CircularProgress/>
            }
            <ShowButton variant={"contained"} onClick={()=>showMore()}>
                show more
            </ShowButton>
        </Container>
    )
}

export default MainContainer
