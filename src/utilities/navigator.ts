import MainContainer from "../screens/MainContainer/MainContainer";
import DisplayPokemon from "../screens/DisplayPokemon/DisplayPokemon";
import Index from "../screens/Home";
import SearchScreen from "../screens/SearchScreen";
import WhoGameScreen from "../screens/WhoGameScreen/WhoGameScreen";
import Register from "../screens/Register/Register";

//Holds the screens
const navigator = [
  {
    pathName: "/",
    title: "Dashboard",
    exact: true,
    component: Index,
  },
  {
    pathName: "/register",
    title: "Register",
    exact: true,
    component: Register,
  },
  {
    pathName: "/pokemon",
    title: "Pokemon",
    exact: true,
    component: MainContainer,
  },
  {
    pathName: "/who",
    title: "Who",
    exact: true,
    component: WhoGameScreen,
  },
  {
    pathName: "/pokemon/:name",
    title: "Display",
    exact: true,
    component: DisplayPokemon,
  },
  {
    pathName: "/search",
    title: "Search",
    exact: true,
    component: SearchScreen,
  },
];

export default navigator;
