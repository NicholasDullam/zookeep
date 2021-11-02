import React from 'react'
import { ActionBar } from '.'

const Navbar = (props) => {
    return (
        <div style={{ position: 'fixed', top: '0px', width: '100%' }}>
            <div style={{ backgroundColor: 'white', backgroundColor: 'rgba(0,0,0,.05)', padding: '10px', height: '50px', display: 'flex', alignItems: 'center', width: '100%', zIndex: '1', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                <div>
                    <h2> Zoo </h2>
                </div>
            </div>
            <div style={{ zIndex: '0' }}>
                <ActionBar/>
            </div>
        </div>
    )
}

export default Navbar