import React from "react";
import PokemonList from "../../components/PokemonList/PokemonList";
import classes from './MainContainer.module.scss';

const MainContainer = () => {
  return (
    <div className={classes.main_container}>
      <div className={classes.main_container_content}>
        <PokemonList />
      </div>
    </div>
  );
};

export default MainContainer;
