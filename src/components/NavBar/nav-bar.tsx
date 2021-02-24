import React from "react";
import { NavLink } from "react-router-dom";

const NavBar:React.FC = () => {
    return (
        <nav className={'#1e88e5 blue darken-1'}>
            <div className="nav-wrapper ml-3 mr-3">
                <NavLink to="/" className="brand-logo uppercase font-bold">Client List</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">All customers</NavLink></li>
                    <li>
                        <NavLink to="/new-client" className={'waves-effect waves-light btn'}>
                            <i className="material-icons right">person_add_alt_1</i>
                            New customer
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar