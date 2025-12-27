import React from "react";
import PokemonList from "../../components/pokemon-list/pokemon-list";

const MainContainer = () => {
  return (
    <div className={"p-4 box-border"}>
      <div className={"max-w-[1280px] mx-auto w-full"}>
        <PokemonList />
      </div>
    </div>
  );
};

export default MainContainer;
