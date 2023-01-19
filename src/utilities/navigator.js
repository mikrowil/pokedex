import MainContainer from "../screens/MainContainer/MainContainer";
import DisplayPokemon from "../screens/DisplayPokemon";
import Home from "../screens/Home";
import SearchScreen from "../screens/SearchScreen";
import WhoGameScreen from "../screens/WhoGameScreen";

const navigator = [
  {
    pathName: "/",
    title: "default",
    exact: true,
    component: Home,
  },
  {
    pathName: "/pokemon",
    title: "pokemon",
    exact: true,
    component: MainContainer,
  },
  {
    pathName: "/who",
    title: "who",
    exact: true,
    component: WhoGameScreen,
  },
  {
    pathName: "/pokemon/:name",
    title: "display",
    exact: true,
    component: DisplayPokemon,
  },
  {
    pathName: "/search",
    title: "search",
    exact: true,
    component: SearchScreen,
  },
];

export default navigator;
