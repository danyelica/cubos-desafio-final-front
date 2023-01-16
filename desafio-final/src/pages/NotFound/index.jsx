
import './style.css';
import imageNotFound from '../../assets/notfound.svg';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='flex-column-center container-not-found'>
            <img src={imageNotFound} />
            <Link className='btn-not-found' to="/home">Ir para página principal</Link>
        </div>

    )
}
export default NotFound;