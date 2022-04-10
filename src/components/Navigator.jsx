import React from "react";
import {Route, Routes} from "react-router-dom"
import navigator from "../helpers/navigator";

export default function Navigator() {

    return (
        <Routes>
            {
                navigator.map((route) => (
                    <Route key={route.title} path={route.pathName} exact={route.exact} element={<route.component/>}/>
                ))
            }
        </Routes>
    )
}
