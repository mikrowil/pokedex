import React from "react";
import {BrowserRouter as NavRouter, Route, Routes} from "react-router-dom"
import navigator from "../helpers/navigator";

export default function Navigator(){

    return(
        <NavRouter>
            <Routes>
                {
                    navigator.map((route)=>(
                        <Route key={route.title} path={route.pathName} exact={route.exact} element={<route.component/>}/>
                    ))
                }
            </Routes>
        </NavRouter>
    )
}
