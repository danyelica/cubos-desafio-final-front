import './style.css';
import iconClient from '../../assets/icon-nav-clients.svg';
import iconFilter from '../../assets/icon-filter.svg';
import iconAddClient from '../../assets/icon-add-client.svg';
import iconSearch from '../../assets/icons-search.svg';
import TableClients from '../../components/TableClients';
import ModalRegisterClient from '../../components/ModalRegisterClient';
import { userUser } from '../../Contexts/UserContexts';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { useClients } from '../../Contexts/ClientsContexts';
import { maskCPF } from '../../utils/functions';
import { useLocation } from 'react-router-dom';

function RegisterClient() {
    const { showModal, setShowModal } = userUser()
    const { handleRequestClients, clients, setClients } = useClients()
    const [cardModalCurrent, setCardModalCurrent] = useState(false);
    const [filterClients, setFilterClients] = useState("");
    const filtro = useLocation();

    function handleCardModal() {
        setCardModalCurrent(<ModalRegisterClient />)
        setShowModal(true)
    }

    useEffect(() => {
        if (!filterClients) {
            if (filtro.search) {
                handleRequestClients(filtro.search.toLocaleLowerCase());
                return;
            } else {
                handleRequestClients();
                return;
            }
        }
        handleFilter()
    }, [filterClients])

    function handleFilter(e) {
        const filterClientsLowerCase = filterClients.toLocaleLowerCase();
        const localClients = [...clients]
        const clientsFilter = localClients.filter((client) => {
            return client.nome.toLocaleLowerCase().includes(filterClientsLowerCase)
                || client.email.toLocaleLowerCase().includes(filterClientsLowerCase)
                || client.cpf.toLocaleLowerCase().includes(filterClientsLowerCase)
                || maskCPF(client.cpf).toLocaleLowerCase().includes(filterClientsLowerCase)
        });
        setClients(clientsFilter)
    }

    return (
        <div>
            <Aside />
            <Header nameTitle='Clientes' />

            <div className='container-register-client'>
                {showModal && cardModalCurrent}
                <div className='flex-row headers-register-client'>
                    <div className='flex-row-center'>
                        <img className='icon-register-client' src={iconClient} />
                        <h1 className='title-register-client'>Clientes</h1>
                    </div>
                    <div className='flex-row'>
                        <button className='btn-register-client'
                            onClick={() => handleCardModal()}
                        ><img src={iconAddClient} /> Adicionar cliente</button>
                        <img className='icon-filter-register-client' src={iconFilter} />
                        <div className='relative'>
                            <input
                                value={filterClients}
                                onChange={(e) => setFilterClients(e.target.value)}
                                className='input-search-register-client'
                                placeholder='Pesquisar'
                            />
                            <img className='icon-search-register-client' src={iconSearch} />
                        </div>
                    </div>
                </div>
                <TableClients setCardModalCurrent={setCardModalCurrent} />
            </div>
        </div>
    )
}
export default RegisterClient;