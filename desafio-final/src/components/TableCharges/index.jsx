import { useState } from "react";
import iconOrderBy from "../../assets/icon-order-by.svg";
import iconEditCharge from "../../assets/icon-pen-edit-user.svg";
import iconDeleteCharge from "../../assets/icon-trash-can.svg";
import imageZeroResults from "../../assets/image-zero-results.svg";
import { useCharges } from "../../Contexts/ChargesContexts";
import { userUser } from "../../Contexts/UserContexts";
import {
    compareDateStatus,
    formatDateLong,
    maskValues,
    orderbyArrayId,
    orderbyArrayName
} from "../../utils/functions";
import "./style.css";

function TableCharges() {
    const { setCharge, charges, setCharges } = useCharges();
    const {
        showModal,
        setShowModal,
        setDeleteChargeModal,
        setDetailChargeModal,
    } = userUser();
    const [orderByName, setOrderByName] = useState(false);
    const [orderById, setOrderById] = useState(false);

    function handleOrderByName() {
        setOrderByName(!orderByName);
        const arrayOrderBy = orderbyArrayName(charges, orderByName);
        setCharges(arrayOrderBy);
    }
    function handleOrderById() {
        setOrderById(!orderById);
        const arrayOrderBy = orderbyArrayId(charges, orderById);
        setCharges(arrayOrderBy);
    }

    function handleEditCharge(data) {
        setCharge(data);
        setShowModal(!showModal);
    }
    return (
        <div className='table-clients'>
            <table>
                <thead>
                    <tr>
                        <th className='thead-tr-th'>
                            <div
                                className='flex-row div-order-by'
                                onClick={() => handleOrderByName()}
                            >
                                <img className='icon-order-by' src={iconOrderBy} />
                                Cliente
                            </div>
                        </th>
                        <th className='thead-tr-th'>
                            <div
                                className='flex-row div-order-by'
                                onClick={() => handleOrderById()}
                            >
                                <img className='icon-order-by' src={iconOrderBy} />
                                ID Cob.
                            </div>
                        </th>
                        <th className='thead-tr-th'>Valor</th>
                        <th className='thead-tr-th'>Data de venc.</th>
                        <th className='thead-tr-th'>Status</th>
                        <th className='thead-tr-th'>Descrição</th>
                        <th className='thead-tr-th'></th>
                    </tr>
                </thead>

                {charges.length ?
                    <tbody>
                        {charges.map((charge) => {
                            return (
                                <tr className='tbody-tr' key={charge.id}>
                                    <th
                                        className='tbody-tr-th pointer'
                                        onClick={() => setDetailChargeModal(charge.id)}
                                    >
                                        {charge.nome}
                                    </th>
                                    <th className='tbody-tr-th tr-th-id'>{charge.id}</th>
                                    <th className='tbody-tr-th'>
                                        {charge.valor && maskValues(charge.valor)}
                                    </th>
                                    <th className='tbody-tr-th'>
                                        {charge.vencimento && formatDateLong(charge.vencimento)}
                                    </th>
                                    <th className='tbody-tr-th'>
                                        <button
                                            className={
                                                charge.status
                                                    ? "btn-no-defaulter-charges btn-status"
                                                    : compareDateStatus(charge.vencimento) === "Vencida"
                                                        ? "btn-defaulter-charges btn-status"
                                                        : "btn-pending-charges btn-status"
                                            }
                                        >
                                            {charge.status
                                                ? "Em dia"
                                                : compareDateStatus(charge.vencimento)}
                                        </button>
                                    </th>
                                    <th className='tbody-tr-th tr-th-description'>
                                        <span className='tr-th-description-span'>
                                            {charge.descricao}
                                        </span>
                                    </th>
                                    <th className='tbody-tr-th tr-th-btns flex-row-center'>
                                        <div
                                            className='flex-column-center div-add-charge'
                                            onClick={() => handleEditCharge(charge)}
                                        >
                                            <img className='icon-edit-charge' src={iconEditCharge} />
                                            <span className='icon-edit-charge-span'>Editar</span>
                                        </div>
                                        <div
                                            className='flex-column-center div-add-charge'
                                            onClick={() => setDeleteChargeModal([charge.id])}
                                        >
                                            <img
                                                className='icon-delete-charge'
                                                src={iconDeleteCharge}
                                            />
                                            <span className='icon-delete-charge-span'>Excluir</span>
                                        </div>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                    :
                    <tbody className="table-tbody-tr-td">
                        <tr>
                            <td>
                                <img className="table-tbody-tr-td-image" src={imageZeroResults} />
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
        </div>
    );
}

export default TableCharges;
