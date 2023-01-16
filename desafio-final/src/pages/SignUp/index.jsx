import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "../../components/Icons/CheckIcon";
import PasswordIconClose from "../../components/Icons/PasswordIconClose";
import PasswordIconOpen from "../../components/Icons/PasswordIconOpen";
import StepperComponent from "../../components/StepperComponent";
import { treatValuesInputStrings } from "../../utils/functions";
import { getEmail, postRegister } from "../../utils/requests";
import "./style.css";

const SignUpButton = styled(Button)(({ theme }) => ({
    color: "#F8F8F9",
    fontSize: "1.4rem",
    fontFamily: "Nunito",
    fontWeight: 400,
    lineHeight: "25px",
    borderRadius: "10px",
    height: "33px",
    minWidth: "160px",
    marginBottom: "15px",
    backgroundColor: "#DA0175",
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#f02c94",
    },
}));

function toastCustomizer(message) {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

const inputStyles = {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    fontFamily: "Inter",
    color: "var(--color-scale-gray-2)",
    backgroundColor: "#FFFFFF",
    boxShadow: "0rem 0.1rem 0.2rem rgba(16, 24, 40, 0.05)",
    border: "0.1rem solid var(--color-scale-gray-7)",
    borderRadius: "0.8rem",
    padding: "1rem 1.4rem",
};

function SignUp() {
    const [activeStep, setActiveStep] = useState(0);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });
    const [error, setError] = useState({
        nome: false,
        email: false,
        senha: false,
        confirmarSenha: false,
    });
    const [passwordType, setPasswordType] = useState("password");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    function handleNext() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    function handleBottomStepper(id) {
        return activeStep === id && "stepper--active";
    }

    function handleLogin() {
        return navigate("/sign-in");
    }

    function handleInput(event) {
        if (event.target.id === "nome") {
            event.target.value = treatValuesInputStrings(event.target.value);
            setForm({
                ...form,
                [event.target.id]: treatValuesInputStrings(event.target.value),
            });
        }
        setForm({ ...form, [event.target.id]: event.target.value });

        if (form.nome) {
            setErrorMessage({
                ...errorMessage,
                nome: "",
            });
            handleError("nome", false);
        }

        if (event.target.id === "email") {
            if (
                !event.target.value.includes("@") ||
                !event.target.value.includes(".")
            ) {
                setErrorMessage({ ...errorMessage, email: "O email deve ser válido" });
                return handleError(event.target.id, true);
            }

            setErrorMessage({ ...errorMessage, email: "" });
            return handleError(event.target.id, false);
        }

        if (event.target.id === "senha") {
            if (event.target.value.length < 6) {
                setErrorMessage({
                    ...errorMessage,
                    senha: "A senha deve ter no mínimo 6 caracteres",
                });
                return handleError(event.target.id, true);
            }
            setErrorMessage({ ...errorMessage, senha: "" });
            return handleError(event.target.id, false);
        }

        if (event.target.id === "confirmarSenha") {
            if (event.target.value !== form.senha) {
                setErrorMessage({
                    ...errorMessage,
                    confirmarSenha: "As senhas devem ser iguais",
                });
                return handleError(event.target.id, true);
            }

            setErrorMessage({ ...errorMessage, confirmarSenha: "" });
            return handleError(event.target.id, false);
        }
    }

    function handleShowPassword() {
        if (passwordType === "text") {
            return setPasswordType("password");
        }
        return setPasswordType("text");
    }

    function handleError(input, boolean) {
        return setError({ ...error, [input]: boolean });
    }

    async function handleSubmit() {
        if (!form.nome || !form.email) {
            if (!form.nome && !form.email) {
                setError({ ...error, nome: true, email: true });
            } else if (!form.nome) {
                handleError("nome", true);
            } else if (!form.email) {
                handleError("email", true);
            }
            toastCustomizer("Preencha os campos obrigatórios");
            return toast.error();
        }
        if (errorMessage && typeof errorMessage === "object") {
            const errors = Object.values(errorMessage);
            if (!errors.every((value) => value === "")) {
                const message = errors.find((value) => value !== "");
                toastCustomizer(message);
                return toast.error();
            }
        }

        if (activeStep === 0) {
            try {
                await getEmail(form.email);
                const inputs = document.querySelectorAll("input");
                for (let input of inputs) {
                    input.value = "";
                }
                return handleNext();
            } catch (error) {
                if (error.response) {
                    toastCustomizer(error.response.data.message);
                    return toast.error();
                }

                toastCustomizer(error.message);
                return toast.error();
            }
        }

        if (activeStep === 1) {
            const { confirmarSenha: _, ...body } = form;
            try {
                await postRegister(body);

                return handleNext();
            } catch (error) {
                if (error.response) {
                    toastCustomizer(error.response.data.message);
                    return toast.error();
                }
                toastCustomizer(error.message);
                return toast.error();
            }
        }

        const inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            input.value = "";
        }
        return handleNext();
    }

    return (
        <section className='sign-up'>
            <StepperComponent activeStep={activeStep}></StepperComponent>
            <Box
                component='form'
                sx={{
                    "& .MuiTextField-root": {
                        marginTop: "6px",
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "calc(100% - 300px)",
                }}
                noValidate
                autoComplete='off'
            >
                {activeStep === 2 ? (
                    <div className='sign-up__last'>
                        <CheckIcon />
                        <Typography
                            sx={{
                                fontSize: "2.4rem",
                                fontFamily: "Montserrat",
                                color: "#343447",
                                fontWeight: 700,
                                lineHeight: "130%",
                                marginBottom: "30px",
                            }}
                        >
                            Cadastro realizado com sucesso!
                        </Typography>
                    </div>
                ) : (
                    <div className='sign-up__form' onSubmit={handleSubmit}>
                        <Typography
                            sx={{
                                fontSize: "2.4rem",
                                fontFamily: "Montserrat",
                                color: "#343447",
                                fontWeight: 700,
                                lineHeight: "130%",
                                marginBottom: "30px",
                            }}
                        >
                            {activeStep === 0 ? "Adicione seus dados" : "Escolha uma senha"}
                        </Typography>
                        <div className='sign-up__inputs'>
                            <Typography
                                sx={{
                                    fontSize: "1.4rem",
                                    fontFamily: "Nunito",
                                    color: "#344054",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                }}
                            >
                                {activeStep === 0 ? "Nome*" : "Senha*"}
                            </Typography>
                            <TextField
                                id={activeStep === 0 ? "nome" : "senha"}
                                error={activeStep === 0 ? error.nome : error.senha}
                                defaultValue={activeStep === 0 ? form.nome : form.senha}
                                placeholder={
                                    activeStep === 0 ? "Digite seu nome" : "Digite sua senha"
                                }
                                inputProps={{
                                    style: inputStyles,
                                }}
                                sx={{
                                    minWidth: "36rem",
                                    marginBottom: activeStep === 0 ? "20px" : "",
                                }}
                                type={activeStep === 0 ? "text" : passwordType}
                                onChange={(event) => handleInput(event)}
                            />
                            {activeStep === 1 && (
                                <div
                                    className='password--icon'
                                    onClick={() => handleShowPassword()}
                                >
                                    {passwordType === "text" ? (
                                        <PasswordIconOpen />
                                    ) : (
                                        <PasswordIconClose />
                                    )}
                                </div>
                            )}
                            <Typography
                                sx={{
                                    fontSize: "1.4rem",
                                    fontFamily: "Nunito",
                                    color: "#344054",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                }}
                            >
                                {activeStep === 0 ? "E-mail*" : "Repita a senha*"}
                            </Typography>
                            <TextField
                                id={activeStep === 0 ? "email" : "confirmarSenha"}
                                error={activeStep === 0 ? error.email : error.confirmarSenha}
                                defaultValue={
                                    activeStep === 0 ? form.email : form.confirmarSenha
                                }
                                placeholder={
                                    activeStep === 0 ? "Digite seu email" : "Digite sua senha"
                                }
                                inputProps={{
                                    style: inputStyles,
                                }}
                                type={activeStep === 0 ? "email" : passwordType}
                                sx={{
                                    minWidth: "36rem",
                                }}
                                onChange={(event) => handleInput(event)}
                            />
                            {activeStep === 1 && (
                                <div
                                    className='password--icon'
                                    onClick={() => handleShowPassword()}
                                >
                                    {passwordType === "text" ? (
                                        <PasswordIconOpen />
                                    ) : (
                                        <PasswordIconClose />
                                    )}
                                </div>
                            )}
                        </div>
                        <SignUpButton
                            sx={{ marginTop: "40px" }}
                            variant='contained'
                            onClick={() => handleSubmit()}
                        >
                            {activeStep === 0 ? "Continuar" : "Finalizar cadastro"}
                        </SignUpButton>
                        <Typography
                            variant='body1'
                            sx={{
                                fontSize: "1.6rem",
                                fontFamily: "Nunito",
                                color: "#3F3F55",
                                fontWeight: 400,
                                lineHeight: "130%",
                            }}
                        >
                            Já possui uma conta? Faça seu{" "}
                            <Link to='/sign-in' className='sign-up__link'>
                                Login
                            </Link>
                        </Typography>
                    </div>
                )}
                {activeStep === 2 && (
                    <SignUpButton
                        variant='contained'
                        sx={{ marginTop: "25px" }}
                        onClick={() => handleLogin()}
                    >
                        Ir para Login
                    </SignUpButton>
                )}
                <div className='stepper--bottom'>
                    <div className={`stepper ${handleBottomStepper(0)}`}></div>
                    <div className={`stepper ${handleBottomStepper(1)}`}></div>
                    <div className={`stepper ${handleBottomStepper(2)}`}></div>
                </div>
            </Box>

            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </section>
    );
}

export default SignUp;
