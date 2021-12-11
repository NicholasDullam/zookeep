import React, { useContext, useEffect, useState } from 'react'
import { Page } from '../components'
import AuthContext from '../context/AuthContext'
import { BsArrowRightShort } from 'react-icons/bs'
import { useHistory } from 'react-router'

const Home = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        if (!auth.zoo) return
    }, [auth.zoo])

    return (
        <Page name={'Dashboard'}>
            { 
                auth.zoo ? <div style={{ marginTop: '20px', position: 'relative' }}>
                    <img src={auth.zoo.map_url} style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '15px', marginBottom: '20px' }}/>
                    <div style={{ backgroundColor: 'black', borderRadius: '25px', padding: '12px 16px 12px 16px', color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => history.push('/enclosures')}>
                        Continue to Enclosures <BsArrowRightShort style={{ fontSize: '24px', marginBottom: '-2px' }}/>
                    </div>
                </div> : <div style={{ marginTop: '20px', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <div style={{ backgroundColor: 'black', borderRadius: '25px', padding: '12px 16px 12px 16px', color: 'white', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => auth.handleZooOpen()}>
                        Select a zoo to get started <BsArrowRightShort style={{ fontSize: '24px', marginBottom: '-2px' }}/>
                    </div>
                </div>
            }
        </Page>
    )
}

export default Home