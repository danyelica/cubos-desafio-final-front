import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharges } from "../utils/requests";
import { clear } from "../utils/storage";

const ChargesContext = createContext({});

export default ChargesContext;

export function ChargesProvider({ children }) {
    const [charges, setCharges] = useState([]);
    const [charge, setCharge] = useState({});
    const navigate = useNavigate();
    async function handleRequestCharge(filter) {
        try {
            if (filter) {
                const response = await getCharges(filter);
                setCharges(response.data);
            } else {
                const response = await getCharges();
                setCharges(response.data);
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
        <ChargesContext.Provider
            value={{ charges, setCharges, charge, setCharge, handleRequestCharge }}
        >
            {children}
        </ChargesContext.Provider>
    );
}

export function useCharges() {
    return useContext(ChargesContext);
}
