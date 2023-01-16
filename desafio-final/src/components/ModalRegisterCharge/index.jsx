import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharges } from "../../Contexts/ChargesContexts";
import { useClients } from "../../Contexts/ClientsContexts";
import { useForm } from "../../Contexts/FormContexts";
import { userUser } from "../../Contexts/UserContexts";
import {
  compareDateStatus,
  editDataArray,
  formatDateLong,
  maskValues,
  validateDate,
  validateValue,
} from "../../utils/functions";
import { postRegisterCharge, putEditCharge } from "../../utils/requests";
import { clear } from "../../utils/storage";
import FormCharges from "../FormCharges";
import "./style.css";

function ModalRegisterCharge({ id, name }) {
  const [statusSelected, setStatusSelected] = useState(true);
  const { charge, setCharge, charges, setCharges } = useCharges();
  const { showModal, setShowModal, setErrorCard, setSuccessCard } = userUser();
  const {
    inputName,
    inputDescription,
    inputValue,
    inputDueDate,
    resetFormCharge,
    errorCharges,
    setErrorCharges,
  } = useForm();
  const { clients, setClients, handleRequestClients } = useClients();
  const navigate = useNavigate();
  useEffect(() => {
    if (id && name) return setCharge({});
    if (charge) {
      inputDescription.current.value = charge.descricao;
      inputDueDate.current.value = formatDateLong(charge.vencimento);
      inputValue.current.value = maskValues(charge.valor);
      setStatusSelected(charge.status);
    }
    handleRequestClients();
    const body = document.querySelector("body");
    body.style.overflowY = "hidden";
    return () => {
      body.style.overflowY = "scroll";
    };
  }, [showModal]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputDescription.current.value.trim()) {
      inputDescription.current.classList.add("inputs-error");
      setErrorCharges({
        ...errorCharges,
        description: "Este  campo deve ser preenchido",
      });
      return;
    }
    if (!validateDate(inputDueDate.current.value).status) {
      inputDueDate.current.classList.add("inputs-error");
      setErrorCharges({
        ...errorCharges,
        dueDate: validateDate(inputDueDate.current.value).message,
      });
      return;
    }
    if (!validateValue(inputValue.current.value).status) {
      inputValue.current.classList.add("inputs-error");
      setErrorCharges({
        ...errorCharges,
        value: validateValue(inputValue.current.value).message,
      });
      return;
    }
    const data = {
      cliente_id: id || charge.cliente_id,
      descricao: inputDescription.current.value.trim(),
      status: statusSelected,
      valor: validateValue(inputValue.current.value).valueConvert,
      vencimento: validateDate(inputDueDate.current.value).dateFormat,
    };
    try {
      let response;
      if (charge.id) {
        response = await putEditCharge(charge.id, data);
        const localeCharges = editDataArray(charges, charge.id, {
          ...response.data[0],
          nome: inputName.current.value,
        });
        setTimeout(() => {
          setSuccessCard("Cobrança Editada com sucesso");
        }, 1000);
        setCharges(localeCharges);
      } else {
        response = await postRegisterCharge(data);
        setCharges([
          ...charges,
          { ...response.data[0], nome: inputName.current.value },
        ]);
        setTimeout(() => {
          setSuccessCard("Cobrança cadastrada com sucesso");
        }, 1000);
      }
      if (!data.status && compareDateStatus(data.vencimento) === "Vencida") {
        const localClients = [...clients];
        const findClient = localClients.find(
          (client) => client.id === Number(data.cliente_id)
        );
        findClient.status = false;
        setClients([...localClients]);
      }
      setCharge({});
      resetFormCharge();
      setShowModal(false);
    } catch (erro) {
      if (erro.code === "ERR_NETWORK")
        return setErrorCard("Cobrança não cadastrada, tente mais tarde!");
      treatedProblemLogin(erro);
      if (erro.response.status === 500 || erro.response.status === 404) {
        if (erro.response.data.message.includes("date/time field value")) {
          inputDueDate.current.classList.add("inputs-error");
          setErrorCharges({
            ...errorCharges,
            dueDate: "Informe uma data válida",
          });
          return;
        }
      }
      if (charge) {
        setErrorCard("Cobrança não Atualizada");
      } else {
        setErrorCard("Cobrança não cadastrado");
      }
    }
  }
  function treatedProblemLogin(error) {
    if (error.response.data.message) {
      if (
        error.response.data.message.includes("jwt expired") ||
        error.response.data.message.includes("Não autorizado") ||
        error.response.data.message.includes("invalid signature") ||
        error.response.data.message.includes("jwt malformed") ||
        error.response.data.message.includes("invalid token")
      ) {
        alert("Sua sessão expirou, faça o login novamente!");
        clear();
        navigate("/sign-in");
        return;
      }
    }
  }
  return (
    <div className='modal'>
      <FormCharges
        id={id}
        name={name}
        charge={charge}
        handleSubmit={handleSubmit}
        statusSelected={statusSelected}
        setStatusSelected={setStatusSelected}
      />
    </div>
  );
}

export default ModalRegisterCharge;
