import React from 'react';
import { useHistory, useLocation } from 'react-router';

const Action = (props) => {
    const location = useLocation()
    const history = useHistory()

    return (
        <div style={{ margin: '0px 10px 0px 10px', padding: '6px 9px 6px 9px', borderRadius: '25px', backgroundColor: location.pathname === props.path ? 'black' : '', color: location.pathname === props.path ? 'white' : '', transition: 'background-color 300ms ease', display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => history.push(props.path)}>
            <p style={{ margin: '0px', fontSize: '14px' }}> {props.name} </p>
        </div>
    )
}

const ActionBar = (props) => {
    return (
        <div style={{ width: 'calc(100% - 100px)', borderBottom: '1px solid rgba(0,0,0,.1)', display: 'flex', backgroundColor: 'white', margin: '0px 50px 0px 50px', padding: '10px 0px 10px 0px' }}>
            <Action path={'/'} name={'Dashboard'}/>
            <Action path={'/enclosures'} name={'Enclosures'}/>
            <Action path={'/animals'} name={'Animals'}/>
        </div>
    );
};

export default ActionBar;