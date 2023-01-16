import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "../../Contexts/ClientsContexts";
import { useForm } from "../../Contexts/FormContexts";
import { userUser } from "../../Contexts/UserContexts";
import {
  maskCEP,
  maskCPF,
  maskTelephone,
  validateCEP,
  validateCPF,
  validateEmail,
  validateTelephone,
} from "../../utils/functions";
import { getClient, patchClient } from "../../utils/requests";
import { clear } from "../../utils/storage";
import FormEditClient from "../FormEditClient";
import "./style.css";

function ModalEditClient({ showClientModal, setShowClientModal, id }) {
  const { setClient } = useClients();
  const { setErrorCard, setSuccessCard } = userUser();
  const {
    inputName,
    inputEmail,
    inputCPF,
    inputTelephone,
    inputAddress,
    inputComplement,
    inputCEP,
    inputDistrict,
    inputCity,
    inputState,
    error,
    setError,
    resetFormError,
  } = useForm();

  const navigate = useNavigate();
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflowY = "hidden";
    handleGetClient();
    return () => {
      body.style.overflowY = "scroll";
    };
  }, [showClientModal]);

  async function handleGetClient() {
    try {
      const { data } = await getClient(id);
      const response = data[0];
      if (response.cpf) inputCPF.current.value = maskCPF(response.cpf);
      if (response.telefone)
        inputTelephone.current.value = maskTelephone(response.telefone);
      if (response.cep) inputCEP.current.value = maskCEP(response.cep);
      inputName.current.value = response.nome;
      inputEmail.current.value = response.email;
      inputAddress.current.value = response.logradouro;
      inputDistrict.current.value = response.bairro;
      inputComplement.current.value = response.complemento;
      inputCity.current.value = response.cidade;
      inputState.current.value = response.estado;

      setClient({ ...response });
    } catch (error) {
      if (error.code === "ERR_NETWORK") return;
      treatedProblemLogin(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputName.current.value.trim()) {
      inputName.current.classList.add("inputs-error");
      setError({ ...error, name: "O campo nome é obrigatótio" });
      return;
    }
    if (!validateEmail(inputEmail.current.value).status) {
      inputEmail.current.classList.add("inputs-error");
      setError({
        ...error,
        email: validateEmail(inputEmail.current.value).message,
      });
      return;
    }
    if (!validateCPF(inputCPF.current.value).status) {
      inputCPF.current.classList.add("inputs-error");
      setError({ ...error, cpf: validateCPF(inputCPF.current.value).message });
      return;
    }
    if (!validateTelephone(inputTelephone.current.value).status) {
      inputTelephone.current.classList.add("inputs-error");
      setError({
        ...error,
        telephone: validateTelephone(inputTelephone.current.value).message,
      });
      return;
    }

    const data = {
      nome: inputName.current.value,
      email: inputEmail.current.value,
      cpf: validateCPF(inputCPF.current.value).cpf,
      telefone: validateTelephone(inputTelephone.current.value).telephone,
    };
    if (inputAddress.current.value)
      data.logradouro = inputAddress.current.value;
    if (inputComplement.current.value)
      data.complemento = inputComplement.current.value;
    if (inputCity.current.value) data.cidade = inputCity.current.value;
    if (inputCEP.current.value)
      data.cep = validateCEP(inputCEP.current.value).cep;
    if (inputDistrict.current.value) data.bairro = inputDistrict.current.value;
    if (inputState.current.value) data.estado = inputState.current.value;

    try {
      const response = await patchClient(data, id);
      response.data[0].status = true;
      setClient(response.data[0]);
      setTimeout(() => {
        setSuccessCard("Cliente atualizado com sucesso");
      }, 1000);
      resetFormError();
      setShowClientModal(false);
    } catch (erro) {
      if (erro.code === "ERR_NETWORK")
        return setErrorCard("Cliente não atualizado tente mais tarde");
      treatedProblemLogin(erro);
      if (erro.response.status === 404) {
        if (
          erro.response.data.message.includes("E-mail informado já existente.")
        ) {
          inputEmail.current.classList.add("inputs-error");
          setError({ ...error, email: erro.response.data.message });
          return;
        }
        if (
          erro.response.data.message.includes("CPF informado já existente.")
        ) {
          inputCPF.current.classList.add("inputs-error");
          setError({ ...error, cpf: erro.response.data.message });
          return;
        }
      }
      setErrorCard("Cliente não cadastrado");
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
      <FormEditClient
        handleSubmit={handleSubmit}
        showClientModal={showClientModal}
        setShowClientModal={setShowClientModal}
      />
    </div>
  );
}

export default ModalEditClient;
