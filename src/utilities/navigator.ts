import MainContainer from "../screens/display-pokemon-list/display-pokemon-list";
import DisplayPokemon from "../screens/display-pokemon/display-pokemon";
import Home from "../screens/home/home.tsx";
import SearchScreen from "../screens/search-screen/search-screen";
import WhoGameScreen from "../screens/who-game-screen/who-game-screen";
import Register from "../screens/register/register";

//Holds the screens
const navigator = [
  {
    pathName: "/",
    title: "Dashboard",
    exact: true,
    component: Home,
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
