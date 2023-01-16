import { useEffect, useState } from "react";
import iconOrderBy from "../../assets/icon-order-by.svg";
import IconPenEdit from "../../assets/icon-pen-edit-user.svg";
import IconDelete from "../../assets/icon-trash-can.svg";
import { useCharges } from "../../Contexts/ChargesContexts";
import { userUser } from "../../Contexts/UserContexts";
import {
  compareDateStatus,
  formatDateLong,
  maskValues,
  orderbyArrayDate,
  orderbyArrayId,
} from "../../utils/functions";
import { getClientCharges } from "../../utils/requests";
import ModalRegisterCharge from "../ModalRegisterCharge";
import "./style.css";

function TableClientCharges({ id, setCardModalCurrent }) {
  const { charges, setCharges, setCharge } = useCharges();
  const {
    showModal,
    setShowModal,
    setDeleteChargeModal,
    setDetailChargeModal,
  } = userUser();
  const [orderByDate, setOrderByDate] = useState(false);
  const [orderById, setOrderById] = useState(false);

  useEffect(() => {
    loadClientCharges();
  }, []);

  async function loadClientCharges() {
    const { data } = await getClientCharges(id);
    return setCharges(data);
  }

  function handleOrderByDate() {
    setOrderByDate(!orderByDate);
    const array = orderbyArrayDate(charges, orderByDate);
    setCharges(array);
  }

  function handleOrderById() {
    setOrderById(!orderById);
    const array = orderbyArrayId(charges, orderById);
    setCharges(array);
  }

  function handleEditCharge(data) {
    setCharge(data);
    setShowModal(!showModal);
    setCardModalCurrent(<ModalRegisterCharge />);
  }

  return (
    <div className='table-clients'>
      <table>
        <thead>
          <tr>
            <th className='thead-tr-th'>
              <div
                className='flex-row div-order-by'
                onClick={() => handleOrderById()}
              >
                <img className='icon-order-by' src={iconOrderBy} />
                ID Cob.
              </div>
            </th>
            <th className='thead-tr-th'>
              <div
                className='flex-row div-order-by'
                onClick={() => handleOrderByDate()}
              >
                <img className='icon-order-by' src={iconOrderBy} />
                Data de venc.
              </div>
            </th>
            <th className='thead-tr-th'>Valor</th>
            <th className='thead-tr-th'>Status</th>
            <th className='thead-tr-th'>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((charge) => {
            return (
              <tr className='tbody-tr' key={charge.id}>
                <td
                  className='tbody-tr-td pointer'
                  onClick={() => setDetailChargeModal(charge.id)}
                >
                  {charge.id}
                </td>
                <td className='tbody-tr-td'>
                  {charge.vencimento && formatDateLong(charge.vencimento)}
                </td>
                <td className='tbody-tr-td'>
                  {charge.valor && maskValues(charge.valor)}
                </td>
                <td className='tbody-tr-td'>
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
                      ? "Paga"
                      : compareDateStatus(charge.vencimento)}
                  </button>
                </td>
                <td className='tbody-tr-td description'>{charge.descricao}</td>
                <td className='tbody-tr-td flex-row'>
                  <div
                    className='flex-column edit-charge'
                    onClick={() => handleEditCharge(charge)}
                  >
                    <img src={IconPenEdit} />
                    <span className='span-edit'>Editar</span>
                  </div>
                  <div
                    className='flex-column edit-charge'
                    onClick={() => setDeleteChargeModal(charge.id)}
                  >
                    <img src={IconDelete} />
                    <span className='span-delete'>Excluir</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableClientCharges;
