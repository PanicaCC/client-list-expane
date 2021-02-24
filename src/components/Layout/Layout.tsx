import React from "react";
import NavBar from "../NavBar/nav-bar";

interface PropTypes {
    children: React.ReactNode,
}

const Layout:React.FC<PropTypes> = ({ children } :PropTypes) => {
    return (
        <>
            <NavBar/>
            <main>
                <div className={'container'}>
                    { children }
                </div>
            </main>
        </>
    )
}

export default Layout