import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../components/InputPassword";
import { useForm } from "../../Contexts/FormContexts";
import { validateEmail } from "../../utils/functions";
import { postLogin } from "../../utils/requests";
import { setItem } from "../../utils/storage";
import "./style.css";

function SignIn() {
  document.title = "Controle Sign in";
  const {
    inputPassword,
    inputEmail,
    handleChangeInput,
    error,
    setError,
    resetFormErrorLogin,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    return setError({
      email: "",
      password: "",
      name: "",
      cpf: "",
      telephone: "",
    });
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(inputEmail.current.value).status) {
      inputEmail.current.classList.add("inputs-error");
      setError({
        ...error,
        email: validateEmail(inputEmail.current.value).message,
      });
      return;
    }
    if (!inputPassword.current.value.trim()) {
      inputPassword.current.classList.add("inputs-error");
      setError({ ...error, password: "O campo senha é obrigatório" });
      return;
    }
    const data = {
      email: inputEmail.current.value,
      senha: inputPassword.current.value,
    };
    try {
      const response = await postLogin(data);
      setItem("token", response.data.token);
      setItem("user", response.data.id);
      setItem("userName", response.data.nome);
      resetFormErrorLogin();
      navigate("/home");
    } catch (error) {
      if (error.response.data.message)
        setError({ ...error, password: error.response.data.message });
    }
  }

  return (
    <div className='container-sign-in flex-row'>
      <div className='div-image-sign-in'>
        <div className='div-filter-sign-in'>
          <h2 className='h2-sign-in-title'>
            Gerencie todos os pagamentos <br /> da sua empresa em um só <br />
            lugar.
          </h2>
        </div>
      </div>
      <div className='div-form-sign-in flex-column-center'>
        <h1 className='h1-sign-in-title'>Faça seu login!</h1>
        <form className='form-sign-in flex-column' onSubmit={handleSubmit}>
          <div className='flex-column relative'>
            <label htmlFor='email' className='label'>
              E-mail
            </label>
            <input
              name='email'
              ref={inputEmail}
              id='email'
              className='inputs'
              placeholder='Digite seu e-mail'
              onChange={(e) => handleChangeInput(e)}
            />
            {error.email && <span className='error-inputs'>{error.email}</span>}
          </div>
          <div className='flex-column relative'>
            <a className='link-forgot-password link'>Esqueceu a senha?</a>
            <InputPassword />
            {error.password && (
              <span className='error-inputs'>{error.password}</span>
            )}
          </div>
          <button className='form-sign-in-buttom'>Entrar</button>
          <span className='link-to-sign-up'>
            Ainda não possui uma conta?{" "}
            <Link to='/sign-up' className='link'>
              Cadastre-se
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
