import React, { PropTypes } from 'react';
import Modal from '@mui/material/Modal'

const ActionModal = props => {
    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <div style={{ backgroundColor: 'white', borderRadius: '15px', position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', width: '440px', height: '440px', padding: '30px', outline: 'none' }}>
                { props.title ? <h3 style={{ textAlign: 'center', marginTop: '0px' }}> {props.title} </h3> : null }
                <div style={{ height: 'calc(100% - 40px)', position: 'relative' }}>
                    {
                        props.children
                    }
                </div>
            </div>
        </Modal>
    );
};

ActionModal.propTypes = {
    
};

export default ActionModal;