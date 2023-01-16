import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { userUser } from '../../Contexts/UserContexts';
import iconCloseCard from '../../assets/icon-close-card.svg'
import './style.css';


export default function SuccessFullCard() {
    const { successCard, setSuccessCard } = userUser();

    useEffect(() => {
        setTimeout(() => {
            setSuccessCard("")
        }, 4000)
    }, []);

    return (
        <div className='div-success'>
            <Stack sx={{ width: '100%' }} spacing={3}>
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{
                        fontSize: '1.4rem',
                        backgroundColor: "var(--color-feed-back-blue-3)",
                        color: 'var( --color-feed-back-blue-1)',
                        borderRadius: '1rem',
                        boxShadow: '0px 4px 42px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <div className='flex-row-center'>
                        {successCard}
                        <img
                            className='icon-close-card'
                            src={iconCloseCard}
                            onClick={() => setSuccessCard("")} />
                    </div>
                </Alert>
            </Stack>
        </div>
    );
}
