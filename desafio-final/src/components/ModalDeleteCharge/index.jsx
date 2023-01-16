import iconAttention from "../../assets/icon-attention.svg";
import iconCloseModal from "../../assets/icon-close-modal.svg";
import { useCharges } from "../../Contexts/ChargesContexts";
import { useClients } from "../../Contexts/ClientsContexts";
import { userUser } from "../../Contexts/UserContexts";
import { deleteCharge } from "../../utils/requests";
import "./style.css";

function ModalDeleteCharge() {
    const {
        setErrorCard,
        setSuccessCard,
        setDeleteChargeModal,
        deleteChargeModal,
    } = userUser();
    const { charges, setCharges } = useCharges();

    async function handleDeleteCharge() {
        const chargesUpdated = charges.filter((charge) => {
            return charge.id != deleteChargeModal;
        });

        try {
            const response = await deleteCharge(deleteChargeModal);

            if (response.status) {
                setCharges(chargesUpdated);
                setDeleteChargeModal(false);
                setSuccessCard("Cobrança excluída com sucesso.");
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK")
                return setErrorCard("Cobrança não foi excluída, tente mais tarde");
            treatedProblemLogin(error);
            if (error.response.data) {
                return setErrorCard(error.response.data.message);
            }
            setErrorCard("Cobrança não foi excluída");
        }
    }

    function treatedProblemLogin(error) {
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

    return (
        <div className='modal flex-column-center'>
            <div className='form-modal-register-client'>
                <div className='flex-column-center'>
                    <img src={iconAttention} className='delete-icon' />
                    <h1 className='delete-title'>
                        Tem certeza que deseja excluir esta cobrança?
                    </h1>
                    <img
                        className='icon-close-delete'
                        src={iconCloseModal}
                        onClick={() => setDeleteChargeModal(false)}
                    />
                    <div>
                        <button
                            className='delete-button nodelete-button'
                            onClick={() => setDeleteChargeModal(false)}
                        >
                            Não
                        </button>
                        <button
                            className='delete-button'
                            onClick={() => handleDeleteCharge()}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDeleteCharge;
