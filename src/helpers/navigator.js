import MainContainer from "../components/MainContainer/MainContainer";
import DisplayPokemon from "../screens/DisplayPokemon";

const navigator = [
    {
        pathName:"/",
        title:"default",
        exact:true,
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
