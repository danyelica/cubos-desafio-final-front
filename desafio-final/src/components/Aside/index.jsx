import { useState } from "react";
import { NavLink } from "react-router-dom";
import ChargeIconActive from "../../assets/icon-nav-charges-selected.svg";
import ChargeIcon from "../../assets/icon-nav-charges.svg";
import ClientsIconActive from "../../assets/icon-nav-clients-selected.svg";
import ClientsIcon from "../../assets/icon-nav-clients.svg";
import HomeIconActive from "../../assets/icon-nav-home-selected.svg";
import HomeIcon from "../../assets/icon-nav-home.svg";
import "./style.css";

function Aside() {
    function handleActivePath(path) {
        if (window.location.pathname === path) {
            return true;
        }
        return false;
    }
    return (
        <section className='aside__bar'>
            <div className='bar__icons'>
                <NavLink
                    to='/home'
                    className={`${handleActivePath("/home") ? "is-active" : "inactive"}`}
                >
                    <img src={handleActivePath("/home") ? HomeIconActive : HomeIcon} />
                    <p
                        className={`${handleActivePath("/home") && "icons__text--active"}`}
                    >
                        Home
                    </p>
                </NavLink>
                <NavLink
                    to='/home/clients'
                    className={
                        handleActivePath("/home/clients") ||
                            handleActivePath("/home/clients/client")
                            ? "is-active"
                            : "inactive"
                    }
                >
                    <img
                        src={
                            handleActivePath("/home/clients") ||
                                handleActivePath("/home/clients/client")
                                ? ClientsIconActive
                                : ClientsIcon
                        }
                    />
                    <p
                        className={`${handleActivePath("/home/clients") ||
                            (handleActivePath("/home/clients/client") &&
                                "icons__text--active")
                            }`}
                    >
                        Clientes
                    </p>
                </NavLink>
                <NavLink
                    to='/home/charges'
                    className={
                        handleActivePath("/home/charges") ? "is-active" : "inactive"
                    }
                >
                    <img
                        src={
                            handleActivePath("/home/charges") ? ChargeIconActive : ChargeIcon
                        }
                    />
                    <p
                        className={`${handleActivePath("/home/charges") && "icons__text--active"
                            }`}
                    >
                        Cobranças
                    </p>
                </NavLink>
            </div>
        </section>
    );
}

export default Aside;
