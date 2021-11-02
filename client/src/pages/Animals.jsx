import React, { PropTypes, useState } from 'react';
import { ActionModal, Page } from '../components'

const Animals = props => {
    const [createOpen, setCreateOpen] = useState(false)
    
    return (
        <Page name={'Animals'}>
            <h6 onClick={() => setCreateOpen(true)}> Click to open </h6>
            <ActionModal open={createOpen} handleClose={() => setCreateOpen(false)}/>
        </Page>
    );
};

Animals.propTypes = {
    
};

export default Animals;