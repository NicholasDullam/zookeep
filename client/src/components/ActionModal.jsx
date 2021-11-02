import React, { PropTypes } from 'react';
import Modal from '@mui/material/Modal'

const ActionModal = props => {
    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <div style={{ backgroundColor: 'white', borderRadius: '15px', position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', width: '500px', height: '500px', outline: 'none' }}>
                { props.children }
            </div>
        </Modal>
    );
};

ActionModal.propTypes = {
    
};

export default ActionModal;