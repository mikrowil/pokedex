import MainContainer from "../screens/MainContainer/MainContainer";
import DisplayPokemon from "../screens/DisplayPokemon";
import Home from "../screens/Home";

const navigator = [
    {
        pathName:"/",
        title:"default",
        exact:true,
        component:Home
    },
    {
        pathName: "/pokemon",
        title: "pokemon",
        exact: true,
        component:MainContainer
    },
    {
        pathName:"/pokemon/:name",
        title:"display",
        exact:true,
        component:DisplayPokemon
    },

]

export default navigator
