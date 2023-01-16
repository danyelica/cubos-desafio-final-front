import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IconAdd from "../../assets/icon-add-client.svg";
import IconClient from "../../assets/icon-nav-clients.svg";
import IconPenEdit from "../../assets/icon-pen-edit-client.svg";
import { useClients } from "../../Contexts/ClientsContexts";
import { userUser } from "../../Contexts/UserContexts";
import NotFound from "../../pages/NotFound";
import { maskCEP, maskCPF, maskTelephone } from "../../utils/functions";
import { getClient } from "../../utils/requests";
import Aside from "../Aside";
import Header from "../Header";
import ModalDeleteCharge from "../ModalDeleteCharge";
import ModalDetailCharge from "../ModalDetailCharge";
import ModalEditClient from "../ModalEditClient";
import ModalRegisterCharge from "../ModalRegisterCharge";
import TableClientCharges from "../TableClientCharges";
import "./style.css";

function client() {
  const { client, setClient } = useClients();
  const location = useLocation()
  const searchID = location.search.split("=")
  const id = searchID[1]
  const { setErrorCard, setSuccessCard } = userUser();
  const [openNotFound, setOpenNotFound] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const { showModal, setShowModal, deleteChargeModal, detailChargeModal } =
    userUser();
  const [cardModalCurrent, setCardModalCurrent] = useState(false);

  useEffect(() => {
    loadClient();
  }, []);

  async function loadClient() {
    try {
      const response = await getClient(id);
      return setClient(response.data[0]);
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "Cliente não encontrado") {
          return setOpenNotFound(true);
        }
        return setErrorCard(error.response.data.message);
      }
      return setErrorCard(error.message);
    }
  }
  function handleCardModal() {
    setCardModalCurrent(<ModalRegisterCharge id={id} name={client.nome} />);
    setShowModal(true);
  }
  return (
    <div>
      {showClientModal && (
        <ModalEditClient
          showClientModal={showClientModal}
          setShowClientModal={setShowClientModal}
          id={id}
        />
      )}
      {showModal && cardModalCurrent}
      {openNotFound ? (
        <NotFound />
      ) : (
        <section className='client'>
          <Header
            nameTitle='Clientes'
            thisPath='Detalhes do cliente'
            toPath='/home/clients'
          />
          <Aside />

          <div className='client__container'>
            <div className='client__title'>
              <img className='icon-register-client' src={IconClient} />
              <h1 className='title-register-client'>{client.nome}</h1>
            </div>

            <div className='client__details'>
              <div className='client--top'>
                <h3 className='details__title'>Dados do cliente</h3>
                <button
                  className='client__button details__button'
                  onClick={() => setShowClientModal(true)}
                >
                  <img src={IconPenEdit} />
                  Editar Cliente
                </button>
              </div>
              <div className='info__area'>
                <div className='client__row'>
                  <h4 className='essentials__title'>E-mail</h4>
                  <p className='client__info'>{client.email}</p>
                </div>
                <div className='client__row'>
                  <h4 className='essentials__title'>Telefone</h4>
                  <p className='client__info'>
                    {client.telefone && maskTelephone(client.telefone)}
                  </p>
                </div>
                <div className='client__row'>
                  <h4 className='essentials__title'>CPF</h4>
                  <p className='client__info'>
                    {client.cpf && maskCPF(client.cpf)}
                  </p>
                </div>
              </div>

              <div className='info__area'>
                <div className='client__row'>
                  <h4 className='essentials__title'>Endereço</h4>
                  <p className='client__info'>{client.logradouro}</p>
                </div>
                <div className='client__row'>
                  <h4 className='essentials__title'>Bairro</h4>
                  <p className='client__info'>{client.bairro}</p>
                </div>
                <div className='client__row'>
                  <h4 className='essentials__title'>Complemento</h4>
                  <p className='client__info'>{client.complemento}</p>
                </div>
                <div className='client__row'>
                  <h4 className='essentials__title'>CEP</h4>
                  <p className='client__info'>
                    {client.cep && maskCEP(client.cep)}
                  </p>
                </div>
                <div className='client__row'>
                  <h4 className='essentials__title'>Cidade</h4>
                  <p className='client__info'>{client.cidade}</p>
                </div>
                <div className='client__row'>
                  <h4 className='essentials__title'>UF</h4>
                  <p className='client__info'>{client.estado}</p>
                </div>
              </div>
            </div>
            <div className='client__details'>
              <div className='client--top'>
                <h3 className='details__title'>Cobranças do Cliente</h3>
                <button
                  className='client__button charges__button'
                  onClick={() => handleCardModal()}
                >
                  <img src={IconAdd} className='charge__icon' />
                  Nova Cobrança
                </button>
              </div>
              <TableClientCharges
                id={id}
                setCardModalCurrent={setCardModalCurrent}
              />
            </div>
          </div>
        </section>
      )}

      {deleteChargeModal && <ModalDeleteCharge />}
      {detailChargeModal && <ModalDetailCharge />}
    </div>
  );
}

export default client;
