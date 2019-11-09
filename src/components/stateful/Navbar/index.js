import React from "react";
import style from "styled-jsx/style";
import {withRouter, NavLink} from "react-router-dom";

const Navbar = () => (
    <nav>
        <ul>
            <ListLink disableActive to={"/"}>Summary</ListLink>
            <ListLink to={"/clients"}>Clients</ListLink>
            <ListLink to={"/photoshoots"}>Photoshoots</ListLink>
            <ListLink to={"/typologies"}>Typologies</ListLink>
        </ul>

        <style jsx>{`
            nav {
                margin-bottom: 1rem;
            }
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            li {
                display: inline;
            }
            li:nth-child(1) {
                margin-right: 1rem;
            }
            li a {
                padding: 0.25rem;
                color: black;
                text-decoration: none;
            }
            li a.active {
                border-bottom: 2px solid black;
            }
        `}</style>
    </nav>
);

const ListLink = ({ children, disableActive = false, ...linkProps }) => <li><NavLink activeClassName={!disableActive ? "active" : ""} {...linkProps}>{children}</NavLink></li>;

export default withRouter(Navbar);