import { useState } from 'react';
import iconHidePassword from '../../assets/icon-password-hide.svg';
import iconShowPassword from '../../assets/icon-password-show.svg';
import { useForm } from '../../Contexts/FormContexts';
import './style.css';

function InputPassword({ className, text, id, inputRef, name }) {
    const [showPassword, setShowPassword] = useState(false);
    const { inputPassword, handleChangeInput } = useForm();

    return (
        <div className='div-input-password flex-column'>
            <label
                htmlFor={id ? id : 'senha'}
                className='label'
            >
                {text ? text : 'Senha'}
            </label>
            <input
                name={name ? name : 'password'}
                ref={inputRef ? inputRef : inputPassword}
                id={id ? id : 'senha'}
                className={className ? `inputs ${className}` : 'inputs'}
                placeholder='Digite sua senha'
                type={showPassword
                    ? "text"
                    : "password"
                }
                onChange={(e) => handleChangeInput(e)}
            />
            <img
                onClick={() => setShowPassword(!showPassword)}
                className='icon-password' src={showPassword
                    ? iconShowPassword
                    : iconHidePassword
                } />

        </div>

    )
}

export default InputPassword;