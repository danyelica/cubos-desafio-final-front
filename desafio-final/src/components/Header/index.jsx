import { useEffect, useState } from "react";
import ArrowDown from "../../assets/icon-chevron-down.svg";
import { clear, getItem } from "../../utils/storage";
import EditIcon from "../../assets/icon-pen-edit-user.svg";
import LogOutIcon from "../../assets/icon-logout.svg";
import MenuOpen from "../../assets/header-menu-open.svg";
import "./style.css";
import ModalEditUser from "../ModalEditUser";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../ErrorCard";
import SuccessFullCard from "../SuccessFullCard";
import { userUser } from "../../Contexts/UserContexts";

function Header({ title, nameTitle, thisPath, toPath }) {
    const { errorCard, successCard } = userUser();
    const name = getItem("userName") ? getItem("userName") : "";
    const [icon, setIcon] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        formatatingIcon();
    }, [name]);

    function formatatingIcon() {
        const newIcon = name.slice(0, 2);
        setIcon(newIcon.toUpperCase());
    }

    function handleOpenMenu() {
        setOpenMenu(!openMenu);
    }

    function handleLogOut() {
        clear();
        navigate("/sign-in");
    }

    return (
        <header className='header'>
            {showModal && (
                <ModalEditUser
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setOpenMenu={setOpenMenu}
                />
            )}

            <div className='div-error-success-main'>
                {errorCard && <ErrorCard pag='main' />}
                {successCard && <SuccessFullCard pag='main' />}
            </div>

            <h1 className='header__title'>{title}</h1>
            {nameTitle && (
                <div className='subtitle'>
                    <h3 className='nameTitle' onClick={() => navigate(toPath)}>
                        {nameTitle}
                    </h3>
                    {thisPath && (
                        <h3 className='subtitle__path'>
                            {" "}
                            {">"} {thisPath}
                        </h3>
                    )}
                </div>
            )}
            <div className='header__user'>
                <div className='header__icon'>
                    <p className='icon__text'>{icon}</p>
                </div>
                <p className='header__text'>{name.split(" ")[0]}</p>
                <img
                    src={ArrowDown}
                    className='header__arrow'
                    onClick={() => handleOpenMenu()}
                />
            </div>
            {openMenu && (
                <div className='header__menu'>
                    <img src={MenuOpen} className='menu__polygon' />
                    <div className='menu__icon' onClick={() => setShowModal(true)}>
                        <img src={EditIcon} />
                        <p>Editar</p>
                    </div>
                    <div className='menu__icon' onClick={() => handleLogOut()}>
                        <img src={LogOutIcon} />
                        <p>Sair</p>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
