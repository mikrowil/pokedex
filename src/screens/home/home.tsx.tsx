import React from "react";
import Typography from "../../components/ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import logoSrc from "../../../public/pokelogo.png";

const features = [
  {
    title: "Pokedex",
    path: "/pokemon?page=1",
  },
  {
    title: "Who's that?",
    path: "/who",
  },
  {
    title: "Register",
    path: "/register",
  },
];

export default function Home() {
  return (
    <div className={"p-4"}>
      <img
        src={"/pokelogo.png"}
        alt="logo"
        className={"w-1/2 mx-auto max-w-64 pt-4 pb-10"}
      />
      <Paths />
    </div>
  );
}

const Paths = () => {
  const navigate = useNavigate();
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
      {features.map((feature, index) => (
        <div key={index} className={"col-span-1 md:col-span-6"}>
          <div
            className={
              "display-flex cursor-pointer items-center border bg-primary bg-paper p-4 rounded-md transition-background-color 100ms ease-in-out hover:bg-btnHover"
            }
            onClick={() => {
              navigate(feature.path);
            }}
          >
            <Typography variant={"h5"}>{feature.title}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};
