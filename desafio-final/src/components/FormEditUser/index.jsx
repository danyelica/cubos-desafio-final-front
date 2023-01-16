import iconCloseModal from '../../assets/icon-close-modal.svg';
import { useForm } from '../../Contexts/FormContexts';
import InputPassword from '../InputPassword';
import './style.css';

function FormEditUser({ handleSubmit, setShowModal, setOpenMenu }) {
    const { inputName, inputEmail, inputCPF, inputTelephone,
        error, handleChangeInput, resetFormEditUser, inputConfirmPassword } = useForm();

    function handleShowModal() {
        resetFormEditUser()
        setOpenMenu(false)
        setShowModal(false)
    }
    return (
        <form className='form-modal-register-client relative flex-column' onSubmit={handleSubmit}>
            <div className='flex-row-center'>
                <h1 className='form-modal-title'>Edite seu cadastro</h1>
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
                    <label htmlFor='cpf' className='label'>CPF</label>
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
                    <label htmlFor='telephone' className='label'> Telefone</label>
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
                <InputPassword className='form-modal-inputs' text='Nova Senha*' />
                {error.password && (
                    <span className='error-inputs'>{error.password}</span>
                )}
            </div>
            <div className='flex-column relative'>
                <InputPassword className='form-modal-inputs' text='Confirmar Senha*' id='ConfirmSenha' inputRef={inputConfirmPassword} name='confirmPassword' />
                {error.confirmPassword && (
                    <span className='error-inputs'>{error.confirmPassword}</span>
                )}
            </div>
            <div className='div-form-flex-row flex-row-center'>
                <button className='btn-form-modal btn-to-apply'>Aplicar</button>
            </div>
        </form>
    )
}

export default FormEditUser;