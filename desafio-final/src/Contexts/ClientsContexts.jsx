import { useContext } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../utils/requests";
import { clear } from "../utils/storage";

const ClientsContext = createContext({});

export default ClientsContext;

export function ClientsProvider(props) {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
    const navigate = useNavigate();
    async function handleRequestClients(filter) {
        try {
            if (filter) {
                const response = await getClients(filter)
                setClients(response.data)
            } else {
                const response = await getClients()
                setClients(response.data)
            }
        } catch (error) {
            if (error.response.data.message) {
                if (error.response.data.message.includes("jwt expired")
                    || error.response.data.message.includes("Não autorizado")
                    || error.response.data.message.includes("invalid signature")
                    || error.response.data.message.includes("jwt malformed")
                    || error.response.data.message.includes("invalid token")) {
                    alert("Sua sessão expirou, faça o login novamente!");
                    clear()
                    navigate("/sign-in");
                    return
                }
            }
        }
    }
    return (
        <ClientsContext.Provider value={{
            clients, setClients, client, setClient, handleRequestClients
        }}>
            {props.children}
        </ClientsContext.Provider>
    )
}

export function useClients() {
    return useContext(ClientsContext)
}


