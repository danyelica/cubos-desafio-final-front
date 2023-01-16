import { useEffect } from "react";
import iconCloseModal from "../../assets/icon-close-modal.svg";
import iconCheckbox from "../../assets/icon-checkbox.svg";
import iconCheckboxSelected from "../../assets/icon-checkbox-selected.svg";
import iconCharge from "../../assets/icon-nav-charges.svg";
import { useForm } from "../../Contexts/FormContexts";
import { userUser } from "../../Contexts/UserContexts";
import "./style.css";

function FormCharges({
    name,
    charge,
    handleSubmit,
    statusSelected,
    setStatusSelected,
}) {
    const { setShowModal } = userUser();
    const {
        inputName,
        inputDescription,
        inputValue,
        inputDueDate,
        errorCharges,
        handleChangeInput,
        resetFormCharge,
    } = useForm();

    useEffect(() => {
        if (charge) {
            inputName.current.value = charge.nome;
        }
        if (name) {
            inputName.current.value = name;
        }
    }, []);
    function handleShowModal() {
        resetFormCharge();
        setShowModal(false);
    }
    return (
        <form
            className='form-modal-register-client relative flex-column'
            onSubmit={handleSubmit}
        >
            <div className='flex-row'>
                <img className='form-modal-icon-client' src={iconCharge} />
                <h1 className='form-modal-title'>{charge.id ? "Edição de Cobrança" : "Cadastro de Cobrança"}</h1>
                <img
                    className='icon-close-modal'
                    src={iconCloseModal}
                    onClick={() => handleShowModal()}
                />
            </div>
            <div className='flex-column relative'>
                <label htmlFor='name' className='label'>
                    Nome*
                </label>
                <input
                    name='name'
                    ref={inputName}
                    id='name'
                    className='inputs form-modal-inputs '
                    placeholder='Digite o nome'
                    onChange={(e) => handleChangeInput(e)}
                    disabled
                />
                {errorCharges.name && (
                    <span className='error-inputs'>{errorCharges.name}</span>
                )}
            </div>
            <div className='flex-column relative'>
                <label htmlFor='description' className='label'>
                    {" "}
                    Descrição*
                </label>
                <textarea
                    name='description'
                    ref={inputDescription}
                    id='description'
                    rows={4}
                    maxLength={100}
                    className='inputs form-modal-inputs textarea-description'
                    placeholder='Digite sua descrição'
                    onChange={(e) => handleChangeInput(e)}
                />
                {errorCharges.description && (
                    <span className='error-inputs error-inputs-description'>
                        {errorCharges.description}
                    </span>
                )}
            </div>

            <div className='div-form-flex-row flex-row'>
                <div className='flex-column relative'>
                    <label htmlFor='dueDate' className='label'>
                        Vencimento*
                    </label>
                    <input
                        name='dueDate'
                        ref={inputDueDate}
                        maxLength={10}
                        id='dueDate'
                        className='inputs form-modal-input-value'
                        placeholder='Data de Vencimento'
                        onChange={(e) => handleChangeInput(e)}
                    />
                    {errorCharges.dueDate && (
                        <span className='error-inputs'>{errorCharges.dueDate}</span>
                    )}
                </div>
                <div className='flex-column relative'>
                    <label htmlFor='value' className='label'>
                        {" "}
                        Valor*
                    </label>
                    <input
                        name='value'
                        ref={inputValue}
                        id='value'
                        maxLength={30}
                        className='inputs form-modal-input-value'
                        placeholder='Digite o valor'
                        onChange={(e) => handleChangeInput(e)}
                    />
                    {errorCharges.value && (
                        <span className='error-inputs'>{errorCharges.value}</span>
                    )}
                </div>
            </div>
            <div>
                <div className='flex-column relative'>
                    <label htmlFor='status' className='label'>
                        {" "}
                        Status*
                    </label>
                    <div>
                        <div
                            className='relative flex-row div-status'
                            onClick={() => setStatusSelected(true)}
                        >
                            <img src={statusSelected ? iconCheckboxSelected : iconCheckbox} />
                            <span>Cobrança Paga</span>
                        </div>
                        <div
                            className='relative flex-row div-status'
                            onClick={() => setStatusSelected(false)}
                        >
                            <img
                                src={!statusSelected ? iconCheckboxSelected : iconCheckbox}
                            />
                            <span>Cobrança Pendente</span>
                        </div>
                    </div>
                    {errorCharges.status && (
                        <span className='error-inputs'>{errorCharges.status}</span>
                    )}
                </div>
            </div>
            <div className='div-form-flex-row flex-row'>
                <button
                    onClick={() => handleShowModal()}
                    className='btn-form-modal btn-cancel'
                    type='button'
                >
                    Cancelar
                </button>
                <button className='btn-form-modal btn-to-apply'>Aplicar</button>
            </div>
        </form>
    );
}

export default FormCharges;
