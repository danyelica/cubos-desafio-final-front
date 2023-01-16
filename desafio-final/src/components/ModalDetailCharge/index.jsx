import { useEffect } from "react";
import iconCloseModal from "../../assets/icon-close-modal.svg";
import iconCharge from "../../assets/icon-nav-charges.svg";
import { useCharges } from "../../Contexts/ChargesContexts";
import { userUser } from "../../Contexts/UserContexts";
import {
    compareDateStatus,
    formatDateLong,
    maskValues,
} from "../../utils/functions";
import { getCharge } from "../../utils/requests";
import "./style.css";

function ModalDetailCharge() {
    const {
        setErrorCard,
        setSuccessCard,
        setDetailChargeModal,
        detailChargeModal,
    } = userUser();
    const { charge, setCharge } = useCharges();

    useEffect(() => {
        loadCharge();
    }, []);

    async function loadCharge() {
        const response = await getCharge(detailChargeModal);
        setCharge(response.data[0]);
    }

    return (
        <div className='modal flex-column-center'>
            <div className='details__container relative flex-column'>
                <div className='flex-row'>
                    <img className='form-modal-icon-client' src={iconCharge} />
                    <h1 className='form-modal-title'>Detalhe da Cobrança</h1>
                </div>
                <img
                    className='icon-close-modal'
                    src={iconCloseModal}
                    onClick={() => setDetailChargeModal(false)}
                />
                <h2 className='details__text details__title'>Nome</h2>
                <p className='details__text details__item'>{charge.nome}</p>
                <h2 className='details__text details__title'>Descrição</h2>
                <p className='details__text details__item'>{charge.descricao}</p>
                <div className='flex-row'>
                    <div className='flex-column details__column'>
                        <h2 className='details__text details__title'>Vencimento</h2>
                        <p className='details__text details__item'>
                            {charge.vencimento && formatDateLong(charge.vencimento)}
                        </p>
                    </div>
                    <div className='flex-column details__column'>
                        <h2 className='details__text details__title'>Valor</h2>
                        <p className='details__text details__item'>
                            {charge.valor && maskValues(charge.valor)}
                        </p>
                    </div>
                </div>
                <div className='flex-row'>
                    <div className='flex-column details__column'>
                        <h2 className='details__text details__title'>ID cobranças</h2>
                        <p className='details__text details__item'>{charge.id}</p>
                    </div>
                    <div className='flex-column details__column'>
                        <h2 className='details__text details__title'>Status</h2>
                        <button
                            className={
                                charge.status
                                    ? "btn-no-defaulter-charges btn-status"
                                    : compareDateStatus(charge.vencimento) === "Vencida"
                                        ? "btn-defaulter-charges btn-status"
                                        : "btn-pending-charges btn-status"
                            }
                        >
                            {charge.status ? "Em dia" : compareDateStatus(charge.vencimento)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailCharge;
