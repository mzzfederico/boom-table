import React, { useState } from "react";
import style from "styled-jsx/style";
import {withRouter, NavLink} from "react-router-dom";

const Navbar = () => {
    const [ openMenu, setOpenMenu ] = useState(false);

    return (
        <nav>
            <div>
                <button className={!openMenu ? "menu-btn" : "menu-btn active"} onClick={() => setOpenMenu(!openMenu)}>menu</button>
                <ul className={!openMenu ? "closed" : ""}>
                    <ListLink to={"/clients"}>Clients</ListLink>
                    <ListLink to={"/photoshoots"}>Photoshoots</ListLink>
                    <ListLink to={"/typologies"}>Typologies</ListLink>
                </ul>
            </div>

            <div />

            <style jsx>{`
            nav {
                display: grid;
                grid-template-columns: 1fr 1fr;
                margin-bottom: 1rem;
            }
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .menu-btn {
                background: 0;
                border: 1px solid #aaa;
                margin-bottom: 0.5rem;
                padding: 0.25rem 0.5rem;
            }
            .menu-btn {
                background: 0;
                border: 1px solid #aaa;
                margin-bottom: 0.5rem;
                padding: 0.25rem 0.5rem;
            }
            .menu-btn.active {
                background: #aaa;
                color: white;
            }
            @media screen and (max-width: 640px) {
                ul.closed {
                    display: none;
                }
                li {
                    margin-bottom: 0.5rem;
                }
            }
            @media screen and (min-width: 641px) {
                .menu-btn {
                    display: none;
                }
                li {
                    display: inline;
                }
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
};

const ListLink = ({ children, disableActive = false, ...linkProps }) => <li><NavLink activeClassName={!disableActive ? "active" : ""} {...linkProps}>{children}</NavLink></li>;

export default withRouter(Navbar);