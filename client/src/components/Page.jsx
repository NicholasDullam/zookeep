import React, { PropTypes } from 'react';

const Page = props => {
    return (
        <div style={{ height: '100%' }}>
            <h1 style={{ textAlign: 'left', marginBottom: '0px' }}> {props.name} </h1>
            { props.children }
        </div>
    );
};

Page.propTypes = {
    
};

export default Page;