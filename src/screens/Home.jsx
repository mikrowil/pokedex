import React from "react";
import styled from "styled-components";
import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  display: flex;
  
  max-width: 800px;
  
  margin: 4rem auto;
  padding: 1rem 1rem;
`

const Item = styled.div`
  padding: 2%;
  
  background-color: ${({theme})=>theme.palette.grey[100]};
  
  border: 2px solid ${({theme})=>theme.palette.grey[500]};
  border-radius: 10px;
  
  cursor: pointer;
  
  text-align: center;
`

const features = [
    {
        title:"Pokemon",
        path:"/pokemon"
    }
]

export default function Home() {

    const navigate = useNavigate()

    return (
        <Container>
            <Grid container spacing={2}>
                {features.map((feature)=>(
                    <Grid item xs={12} md={6}>
                        <Item onClick={()=>{navigate(feature.path)}}>
                            <Typography variant={"h5"}>
                                {feature.title}
                            </Typography>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
