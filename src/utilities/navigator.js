import MainContainer from "../screens/MainContainer/MainContainer";
import DisplayPokemon from "../screens/DisplayPokemon";
import Index from "../screens/Home";
import SearchScreen from "../screens/SearchScreen";
import WhoGameScreen from "../screens/WhoGameScreen/WhoGameScreen";

//Holds the screens
const navigator = [
  {
    pathName: "/",
    title: "dashboard",
    exact: true,
    component: Index,
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
