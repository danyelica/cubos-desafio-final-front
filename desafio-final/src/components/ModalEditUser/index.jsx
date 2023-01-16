import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../Contexts/FormContexts";
import { userUser } from "../../Contexts/UserContexts";
import {
  maskCPF,
  maskTelephone,
  validateCPF,
  validateEmail,
  validateTelephone,
} from "../../utils/functions";
import { getUser, patchUser } from "../../utils/requests";
import { clear, setItem } from "../../utils/storage";
import FormEditUser from "../FormEditUser";

import "./style.css";

function ModalEditUser({ showModal, setShowModal, setOpenMenu }) {
  const { user, setUser } = userUser();
  const {
    inputName,
    inputEmail,
    inputCPF,
    inputTelephone,
    inputPassword,
    error,
    setError,
    resetFormEditUser,
    inputConfirmPassword,
  } = useForm();
  const { setErrorCard, setSuccessCard } = userUser();
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflowY = "hidden";
    handleGetUser();
    return () => {
      body.style.overflowY = "scroll";
    };
  }, [showModal]);

  async function handleGetUser() {
    try {
      const response = await getUser();
      if (response.data.cpf)
        inputCPF.current.value = maskCPF(response.data.cpf);
      if (response.data.telefone)
        inputTelephone.current.value = maskTelephone(response.data.telefone);
      inputName.current.value = response.data.nome;
      inputEmail.current.value = response.data.email;
      setUser({ ...response.data });
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

    const data = {
      nome: inputName.current.value,
      email: inputEmail.current.value,
    };
    if (inputCPF.current.value && inputCPF.current.value !== user.cpf) {
      if (!validateCPF(inputCPF.current.value).status) {
        inputCPF.current.classList.add("inputs-error");
        setError({
          ...error,
          cpf: validateCPF(inputCPF.current.value).message,
        });
        return;
      }
      data.cpf = validateCPF(inputCPF.current.value).cpf;
    }
    if (!inputCPF.current.value) {
      data.cpf = null;
    }
    if (inputTelephone.current.value) {
      if (!validateTelephone(inputTelephone.current.value).status) {
        inputTelephone.current.classList.add("inputs-error");
        setError({
          ...error,
          telephone: validateTelephone(inputTelephone.current.value).message,
        });
        return;
      }
      data.telefone = validateTelephone(inputTelephone.current.value).telephone;
    }

    if (inputPassword.current.value) {
      if (inputPassword.current.value.length < 6) {
        inputPassword.current.classList.add("inputs-error");
        setError({
          ...error,
          password: "O campo senha deve conter no minimo 6 caracteres",
        });
        return;
      }
      if (inputPassword.current.value !== inputConfirmPassword.current.value) {
        inputConfirmPassword.current.classList.add("inputs-error");
        setError({ ...error, confirmPassword: "As senhas não conferem" });
        return;
      }
      data.senha = inputPassword.current.value;
    }
    try {
      const response = await patchUser(data);
      response.data[0].status = true;
      setItem("user", response.data[0].id);
      setItem("userName", response.data[0].nome);
      setTimeout(() => {
        setSuccessCard("Cadastro atualizado com succeso");
      }, 1000);
      resetFormEditUser();
      setOpenMenu(false);
      setShowModal(false);
    } catch (erro) {
      if (erro.code === "ERR_NETWORK")
        return setErrorCard("Cadastro não atualizado, tente mais tarde");
      if (erro.response.status === 404) {
        if (
          erro.response.data.message.includes(
            "Este email de usuário já está em uso. Tente outro."
          )
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
      treatedProblemLogin(erro);
      setErrorCard("Cadastro não atualizado");
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
      <FormEditUser
        handleSubmit={handleSubmit}
        setShowModal={setShowModal}
        setOpenMenu={setOpenMenu}
      />
    </div>
  );
}

export default ModalEditUser;
