import React from 'react'
import { CircularProgress} from '@mui/material'

const Button = props => {
    return ( <div style={{ backgroundColor: 'black', width: '100%', opacity: props.loading ? '.7' : '1', borderRadius: '10px', height: '40px', display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center', ...props.style }} onClick={props.onClick}>
        { !props.loading ? <h4 style={{ color: 'white', textAlign: 'center', userSelect: 'none' }}> {props.label} </h4> : <CircularProgress size={20} style={{ color: 'white' }}/> }
    </div> )
}

export default Button