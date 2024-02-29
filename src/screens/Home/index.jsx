import React from "react";
import { Grid } from "@mui/material";
import Typography from "../../components/ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.scss";

const features = [
  {
    title: "Pokedex",
    path: "/pokemon?page=1",
  },
  {
    title: "Who's that?",
    path: "/who",
  },
];

export default function Home() {
  return (
    <div style={{ padding: "1rem" }}>
      <div className={classes.inner_container}>
        <Grid container spacing={4}>
          <Paths />
        </Grid>
      </div>
    </div>
  );
}

const Paths = () => {
  const navigate = useNavigate();
  return (
    <>
      {features.map((feature, index) => (
        <Grid key={index} item xs={12} md={6}>
          <div
            className={classes.item}
            onClick={() => {
              navigate(feature.path);
            }}
          >
            <Typography variant={"h5"}>{feature.title}</Typography>
          </div>
        </Grid>
      ))}
    </>
  );
};
