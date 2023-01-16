import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import iconFilter from "../../assets/icon-filter.svg";
import iconCharges from "../../assets/icon-nav-charges.svg";
import iconSearch from "../../assets/icons-search.svg";
import Aside from "../../components/Aside";
import Header from "../../components/Header";
import ModalDeleteCharge from "../../components/ModalDeleteCharge";
import ModalDetailCharge from "../../components/ModalDetailCharge";
import ModalRegisterCharge from "../../components/ModalRegisterCharge";
import TableCharges from "../../components/TableCharges";
import { useCharges } from "../../Contexts/ChargesContexts";
import { userUser } from "../../Contexts/UserContexts";
import "./style.css";

function ListCharges() {
    const filtro = useLocation()
    const { showModal, deleteChargeModal, detailChargeModal } = userUser();
    const [filterCharge, setFilterCharge] = useState("");
    const { charges, setCharges, handleRequestCharge } = useCharges();

    useEffect(() => {
        if (!filterCharge) {
            if (filtro.search) {
                handleRequestCharge(filtro.search.toLocaleLowerCase());
            } else {
                handleRequestCharge();
            }
        }
        handleFilter();
    }, [filterCharge]);

    function handleFilter(e) {
        const filterChegerLowerCase = filterCharge.toLocaleLowerCase();
        const localCharges = [...charges];
        const chargesFilter = localCharges.filter((charge) => {
            return (
                charge.nome.toLocaleLowerCase().includes(filterChegerLowerCase) ||
                String(charge.id).includes(filterChegerLowerCase)
            );
        });
        setCharges(chargesFilter);
    }
    return (
        <div>
            <Aside />
            <Header nameTitle='Cobranças' toPath='/home/charges' />
            <div className='container-register-client'>
                {showModal && <ModalRegisterCharge />}
                <div className='flex-row headers-list-charges'>
                    <div className='flex-row-center'>
                        <img className='icon-list-charges' src={iconCharges} />
                        <h1 className='title-list-charges'>Cobranças</h1>
                    </div>
                    <div className='flex-row'>
                        <img className='icon-filter-register-client' src={iconFilter} />
                        <div className='relative'>
                            <input
                                value={filterCharge}
                                onChange={(e) => setFilterCharge(e.target.value)}
                                className='input-search-register-client'
                                placeholder='Pesquisar'
                            />
                            <img className='icon-search-register-client' src={iconSearch} />
                        </div>
                    </div>
                </div>
                <TableCharges />
            </div>
            {deleteChargeModal && <ModalDeleteCharge />}
            {detailChargeModal && <ModalDetailCharge />}
        </div>
    );
}
export default ListCharges;
