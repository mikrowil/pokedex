import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import {CircularProgress, Grid, Typography} from "@mui/material";
import usePokemonDetails from "../hooks/usePokemonDetails";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui-kit/Button";
import {Icon} from "@mui/material";

const Container = styled.div`
  padding: 1rem 0;
`;

const InnerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  padding: 0 1rem;
  
`


const Section = styled.div`
  display: flex;
  flex: 1;

  position: relative;

  flex-direction: column;

  margin: auto;

  align-items: center;

  border: 2px solid ${({theme})=> theme.palette.grey[500]};
  background-color: ${({theme}) => theme.palette.grey[200]};
  border-radius: 10px;

  text-align: center;
`

const NameImageContainer = styled.div`
  
  
`


const ShinyToggle = styled(Icon)`
  position: absolute;
  
  top: 10px;
  right: 10px;
`

export default function DisplayPokemon(){

    const navigate = useNavigate()
    const {state} = useLocation()

    const [isShiny, setIsShiny] = useState(false)
    const [openMoves, setOpenMoves] = useState(false)

    const {pokemon, species, isLoading} = usePokemonDetails(state.pokemon.name)

    return(
        <Container>
            <InnerContainer>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant={"outlined"}
                            onClick={()=>{navigate(-1)}}
                            startIcon={<Icon>arrow_back</Icon>}
                        >
                            go back
                        </Button>
                    </Grid>

                    {!isLoading ? <>
                        <Grid item xs={12} md={3}>
                            <Section>
                                <ShinyToggle onClick={()=>setIsShiny(!isShiny)}>{isShiny ? "star": "star_border"}</ShinyToggle>
                                <img src={pokemon.sprites[isShiny ? "front_shiny" :"front_default"]} width={200} height={200} alt={"Pokemon"}/>
                                <Typography variant={"h5"}>
                                    {pokemon.name}
                                </Typography>
                            </Section>
                        </Grid>

                        <Grid item xs={12} md={9}>
                            <Section style={{height:"100%"}}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Height: {pokemon.height}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Weight: {pokemon.weight}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>ID: {pokemon.id}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Base experience: {pokemon.base_experience}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Base happiness: {species.base_happiness}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Capture rate: {species.capture_rate}</Typography>
                                    </Grid>
                                </Grid>
                            </Section>
                        </Grid>

                        <Grid item xs={12}>
                            <Section>
                                {
                                    openMoves ?
                                        pokemon.moves.map((move)=>(
                                            <Typography>{move.move.name}</Typography>
                                        )):<Typography>
                                            Moves
                                        </Typography>
                                }

                                <Button onClick={()=>{setOpenMoves(!openMoves)}}>
                                    {openMoves ? "close" : "open"}
                                </Button>
                            </Section>
                        </Grid>

                    </>: <CircularProgress />}
                </Grid>

            </InnerContainer>
        </Container>
    )
}
