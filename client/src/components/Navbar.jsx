import React from 'react'
import { ActionBar } from '.'
import { Select, MenuItem, InputLabel } from '@mui/material'

const Navbar = (props) => {
    return (
        <div style={{ position: 'fixed', top: '0px', width: '100%' }}>
            <div style={{ backgroundColor: 'white', backgroundColor: 'rgba(240,240,240,1)', padding: '10px', height: '50px', display: 'flex', alignItems: 'center', width: '100%', zIndex: '1', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                <div>
                    <div style={{ border: '1px solid rgba(0,0,0,.2)', borderRadius: '25px', padding: '10px 15px 10px 15px', marginLeft: '25px'}}>
                        <p style={{ margin: '0px', opacity: '.8', fontSize: '14px' }}> Select a Zoo </p>
                    </div>
                </div>
            </div>
            <div style={{ zIndex: '0' }}>
                <ActionBar/>
            </div>
        </div>
    )
}

export default Navbar