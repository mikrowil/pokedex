import PokemonList from "../../components/PokemonList/PokemonList";
import usePokemon from "../../hooks/usePokemon";
import {Button, Typography} from "@mui/material";
import styled from "styled-components";

const Container = styled.div`

  display: flex;
  flex: 1;
  flex-direction: column;

  margin: 1rem auto;
  padding: 1rem;

  max-width: 1200px;
`

const ShowButton = styled(Button)`

`

const MainContainer = () => {

    const {pokemon, showMore, isLoading} = usePokemon()


    return (
        <Container>
            <Typography variant={"h3"}>
                Pokemon
            </Typography>

            <PokemonList pokemon={pokemon}/>

            <ShowButton variant={"contained"} onClick={() => showMore()}>
                show more
            </ShowButton>
        </Container>
    )
}

export default MainContainer
