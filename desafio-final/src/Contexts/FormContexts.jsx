import { useContext, useRef } from "react";
import { createContext, useState } from "react";
import {
    maskCEP,
    maskCPF,
    maskTelephone,
    treatDateInput,
    treatValuesInput,
    treatValuesInputStrings
} from "../utils/functions";

const FormContext = createContext({});

export default FormContext;

export function FormProvider({ children }) {
    const [form, setForm] = useState({});
    const [error, setError] = useState({
        email: "",
        password: "",
        name: "",
        cpf: "",
        telephone: "",
        confirmPassword: ""
    });
    const [errorCharges, setErrorCharges] = useState({
        description: "",
        dueDate: "",
        value: "",
        status: ""
    });

    const inputPassword = useRef(null);
    const inputConfirmPassword = useRef(null);
    const inputEmail = useRef(null);
    const inputName = useRef(null);
    const inputCPF = useRef(null);
    const inputTelephone = useRef(null);
    const inputAddress = useRef(null);
    const inputComplement = useRef(null);
    const inputCEP = useRef(null);
    const inputDistrict = useRef(null);
    const inputCity = useRef(null);
    const inputState = useRef(null);
    const inputDescription = useRef(null);
    const inputValue = useRef(null);
    const inputStatus = useRef(null);
    const inputDueDate = useRef(null);

    function handleChangeInput(e) {
        handleChangeInputValues(e)
        e.target.classList.remove("inputs-error")
        setErrorCharges({ ...errorCharges, [e.target.name]: "" })
        setError({ ...error, [e.target.name]: "" })
    }
    function handleChangeInputValues(e) {
        if (e.target.name === "cep") inputCEP.current.value = maskCEP(e.target.value)
        if (e.target.name === "cpf") inputCPF.current.value = maskCPF(e.target.value)
        if (e.target.name === "name") inputName.current.value = treatValuesInputStrings(e.target.value)
        if (e.target.name === "telephone") inputTelephone.current.value = maskTelephone(e.target.value)
        if (e.target.name === "value") inputValue.current.value = treatValuesInput(e)
        if (e.target.name === "dueDate") inputDueDate.current.value = treatDateInput(e)
    }

    function resetFormError() {
        inputPassword.current = null
        inputEmail.current.value = ""
        inputEmail.current.classList.remove("inputs-error")
        inputName.current.value = ""
        inputName.current.classList.remove("inputs-error")
        inputCPF.current.value = ""
        inputCPF.current.classList.remove("inputs-error")
        inputTelephone.current.value = ""
        inputTelephone.current.classList.remove("inputs-error")
        inputAddress.current.value = ""
        inputComplement.current.value = ""
        inputCEP.current.value = ""
        inputDistrict.current.value = ""
        inputCity.current.value = ""
        inputState.current.value = ""
        setError({ email: "", password: "", name: "", cpf: "", telephone: "", confirmPassword: "" })
        setForm({})
    }
    function resetFormEditUser() {
        inputPassword.current = null
        inputEmail.current.value = ""
        inputConfirmPassword.current = null
        inputEmail.current.classList.remove("inputs-error")
        inputName.current.value = ""
        inputName.current.classList.remove("inputs-error")
        inputCPF.current.value = ""
        inputCPF.current.classList.remove("inputs-error")
        inputTelephone.current.value = ""
        inputTelephone.current.classList.remove("inputs-error")
        setError({ email: "", password: "", name: "", cpf: "", telephone: "", confirmPassword: "" })
        setForm({})
    }
    function resetFormCharge() {
        inputName.current.value = null
        inputDescription.current.value = ""
        inputValue.current.value = ""
        inputDueDate.current.value = ""
        inputDescription.current.classList.remove("inputs-error")
        inputValue.current.classList.remove("inputs-error")
        inputDueDate.current.classList.remove("inputs-error")
        setErrorCharges({ description: "", dueDate: "", value: "", status: "" })
    }

    function resetFormErrorLogin() {
        inputPassword.current = null
        inputEmail.current = null
        setError({ email: "", password: "", name: "", cpf: "", telephone: "", confirmPassword: "" })
        setForm({})
    }

    async function requestsCEP(e) {
        let cep = inputCEP.current.value.replace(".", "").replace("-", "");
        handleChangeInputValues(e);
        if (cep.length != 8) {
            return;
        }
        const promisseCEP = fetch(`https://viacep.com.br/ws/${cep}/json/`);
        promisseCEP.then(response => {
            if (!response.ok) return;
            const promiseBody = response.json();
            promiseBody.then(body => {
                if (body.erro) return
                if (!inputAddress.current.value.includes(body.logradouro)) inputAddress.current.value = body.logradouro;
                if (!inputCity.current.value.includes(body.localidade)) inputCity.current.value = body.localidade;
                if (!inputDistrict.current.value.includes(body.bairro)) inputDistrict.current.value = body.bairro;
                if (!inputState.current.value.includes(body.uf)) inputState.current.value = body.uf
            })
        });
    }

    return (
        <FormContext.Provider value={{
            form,
            setForm,
            inputPassword,
            inputEmail,
            inputName,
            inputCPF,
            inputTelephone,
            inputAddress,
            inputComplement,
            inputCEP,
            inputDistrict,
            inputCity,
            inputState,
            handleChangeInput,
            error,
            setError,
            requestsCEP,
            resetFormErrorLogin,
            inputConfirmPassword,
            inputDescription,
            inputValue,
            inputStatus,
            resetFormError,
            resetFormEditUser,
            inputDueDate,
            errorCharges,
            setErrorCharges,
            resetFormCharge
        }}>
            {children}
        </FormContext.Provider>
    )
}

export function useForm() {
    return useContext(FormContext);
}
