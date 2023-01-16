import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { userUser } from '../../Contexts/UserContexts';
import iconCloseCardError from '../../assets/icon-close-card-error.svg'
import './style.css';

export default function ErrorCard({ pag }) {
    const { errorCard, setErrorCard } = userUser();

    useEffect(() => {
        setTimeout(() => {
            setErrorCard("")
        }, 4000)
    }, []);
    return (
        <div className={`div-error-${pag}`}>
            <Stack
                variant="filled"
                sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error"
                    variant="filled"
                    sx={{
                        fontSize: '1.4rem',
                        backgroundColor: "var( --color-feed-back-red-5)",
                        color: "var(--color-feed-back-red-1)"
                    }}
                >
                    <div className='flex-row-center'>
                        {errorCard}
                        <img
                            onClick={() => setErrorCard("")}
                            className='icon-close-card'
                            src={iconCloseCardError}
                        />
                    </div>
                </Alert>
            </Stack>
        </div >

    );
}
