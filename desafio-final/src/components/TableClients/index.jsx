import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconAddCharge from "../../assets/icon-add-charge.svg";
import iconOrderBy from "../../assets/icon-order-by.svg";
import imageZeroResults from "../../assets/image-zero-results.svg";
import { useClients } from "../../Contexts/ClientsContexts";
import { userUser } from "../../Contexts/UserContexts";
import {
  maskCPF,
  maskTelephone,
  orderbyArrayName,
} from "../../utils/functions";
import ModalRegisterCharge from "../ModalRegisterCharge";
import "./style.css";

function TableClients({ setCardModalCurrent }) {
  const { clients, setClients } = useClients();
  const navigate = useNavigate();
  const { showModal, setShowModal } = userUser();
  const [orderByName, setOrderByName] = useState(false);

  function openClientDetails(id) {
    return navigate(`/home/clients/client?id=${id}`);
  }
  function handleRegisterCharge(client) {
    setCardModalCurrent(
      <ModalRegisterCharge id={client.id} name={client.nome} />
    );
    setShowModal(true);
  }

  function handleOrderByName() {
    setOrderByName(!orderByName);
    const arrayOrderBy = orderbyArrayName(clients, orderByName);
    setClients(arrayOrderBy);
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
            <th className='thead-tr-th'>CPF</th>
            <th className='thead-tr-th'>E-mail</th>
            <th className='thead-tr-th'>Telefone</th>
            <th className='thead-tr-th'>Status</th>
            <th className='thead-tr-th'>Criar Cobrança</th>
          </tr>
        </thead>
        {clients.length ? (
          <tbody>
            {clients.map((client) => {
              return (
                <tr className='tbody-tr' key={client.id}>
                  <th
                    className='tbody-tr-th tr-th-client'
                    onClick={() => openClientDetails(client.id)}
                  >
                    {client.nome}
                  </th>
                  <th className='tbody-tr-th'>{maskCPF(client.cpf)}</th>
                  <th className='tbody-tr-th'>{client.email}</th>
                  <th className='tbody-tr-th'>
                    {maskTelephone(client.telefone)}
                  </th>
                  <th className='tbody-tr-th'>
                    <button
                      className={
                        client.status
                          ? "btn-no-defaulter-clients btn-status"
                          : "btn-defaulter-clients btn-status"
                      }
                    >
                      {client.status ? "Em dia" : "Inadimplente"}
                    </button>
                  </th>
                  <th className='tbody-tr-th'>
                    <div
                      className='flex-column div-add-charge'
                      onClick={() => handleRegisterCharge(client)}
                    >
                      <img className='icon-add-charge' src={iconAddCharge} />
                      <span>Cobrança</span>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody className='table-tbody-tr-td'>
            <tr>
              <td>
                <img
                  className='table-tbody-tr-td-image'
                  src={imageZeroResults}
                />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default TableClients;
