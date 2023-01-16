import iconCloseModal from '../../assets/icon-close-modal.svg';
import iconClient from '../../assets/icon-nav-clients.svg';
import { useForm } from '../../Contexts/FormContexts';
import { userUser } from '../../Contexts/UserContexts';
import './style.css';

function FormRegisterClient({ handleSubmit }) {
    const { setShowModal } = userUser()
    const { inputName, inputEmail, inputCPF, inputTelephone,
        inputAddress, inputComplement, inputCEP, inputDistrict, inputCity, inputState,
        error, handleChangeInput, requestsCEP, resetFormError } = useForm();

    function handleShowModal() {
        resetFormError()
        setShowModal(false)
    }
    return (
        <form className='form-modal-register-client relative flex-column' onSubmit={handleSubmit}>
            <div className='flex-row'>
                <img className='form-modal-icon-client'
                    src={iconClient} />
                <h1 className='form-modal-title'>Cadastro do Cliente</h1>
                <img className='icon-close-modal'
                    src={iconCloseModal}
                    onClick={() => handleShowModal()} />
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
                />
                {error.name &&
                    <span className='error-inputs'>{error.name}</span>
                }
            </div>
            <div className='flex-column relative'>
                <label htmlFor='email' className='label' > Email*</label>
                <input
                    name='email'
                    ref={inputEmail}
                    id='email'
                    className='inputs form-modal-inputs '
                    placeholder='Digite o e-mail'
                    onChange={(e) => handleChangeInput(e)}
                />
                {error.email &&
                    <span className='error-inputs'>{error.email}</span>
                }
            </div>

            <div className='div-form-flex-row flex-row'>
                <div className='flex-column relative'>
                    <label htmlFor='cpf' className='label'>CPF*</label>
                    <input
                        name='cpf'
                        ref={inputCPF}
                        maxLength={14}
                        id='cpf'
                        className='inputs form-modal-input-cpf '
                        placeholder='Digite o CPF'
                        onChange={(e) => handleChangeInput(e)}
                    />
                    {error.cpf &&
                        <span className='error-inputs'>{error.cpf}</span>
                    }
                </div>
                <div className='flex-column relative'>
                    <label htmlFor='telephone' className='label'> Telefone*</label>
                    <input
                        name='telephone'
                        ref={inputTelephone}
                        id='telephone'
                        maxLength={18}
                        className='inputs form-modal-input-telephone '
                        placeholder='Digite o telefone'
                        onChange={(e) => handleChangeInput(e)}
                    />
                    {error.telephone &&
                        <span className='error-inputs'>{error.telephone}</span>
                    }
                </div>
            </div>

            <div className='flex-column relative'>
                <label htmlFor='address' className='label'>Endereço</label>
                <input
                    name='address'
                    ref={inputAddress}
                    id='address'
                    className='inputs form-modal-inputs '
                    placeholder='Digite o endereço'
                    onChange={(e) => handleChangeInput(e)}
                />
            </div>

            <div className='flex-column relative'>
                <label htmlFor='address' className='label'> Complemento </label>
                <input
                    name='complement'
                    ref={inputComplement}
                    id='complement'
                    className='inputs form-modal-inputs '
                    placeholder='Digite o complemento'
                    onChange={(e) => handleChangeInput(e)}
                />
            </div>

            <div className='div-form-flex-row flex-row'>

                <div className='flex-column relative'>
                    <label htmlFor='cep' className='label'> CEP </label>
                    <input
                        name='cep'
                        ref={inputCEP}
                        id='cep'
                        maxLength={10}
                        className='inputs form-modal-input-cpf '
                        placeholder='Digite o CEP'
                        onChange={(e) => requestsCEP(e)}
                    />
                </div>

                <div className='flex-column relative'>
                    <label htmlFor='district' className='label'>Bairro </label>
                    <input
                        name='district'
                        ref={inputDistrict}
                        id='district'
                        className='inputs form-modal-input-district '
                        placeholder='Digite o Bairro'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </div>
            </div>

            <div className='div-form-flex-row flex-row'>

                <div className='flex-column relative'>
                    <label htmlFor='city' className='label'>Cidade </label>
                    <input
                        name='city'
                        ref={inputCity}
                        id='city'
                        className='inputs form-modal-input-city'
                        placeholder='Digite a cidade'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </div>

                <div className='flex-column relative'>
                    <label htmlFor='state' className='label'>UF</label>
                    <input
                        name='state'
                        ref={inputState}
                        id='state'
                        className='inputs form-modal-input-state'
                        placeholder='Digite o UF'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </div>
            </div>

            <div className='div-form-flex-row flex-row'>
                <button onClick={() => handleShowModal()} className='btn-form-modal btn-cancel' type='button'>Cancelar</button>
                <button className='btn-form-modal btn-to-apply'>Aplicar</button>
            </div>
        </form>
    )
}

export default FormRegisterClient;