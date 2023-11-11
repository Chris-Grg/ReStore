import { Container, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const ServerError = () => {
    const {state} = useLocation();
  return (
    <Container component={Paper}>
        {state?.error? (
            <>
            <Typography gutterBottom variant='h3' color='secondary'>
                {state.error.title}
            </Typography>
            <Divider/>
            <Typography variant='body1'>
                {state.error.detail || 'Internal server error'}
            </Typography>
            </>
        ): (
            <Typography gutterBottom variant='h3'>Server Error</Typography>
        )
    }
    </Container>
  )
}

export default ServerError