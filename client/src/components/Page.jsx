import React, { PropTypes } from 'react';

const Page = props => {
    return (
        <div>
            <h1 style={{ textAlign: 'left' }}> {props.name} </h1>
            { props.children }
        </div>
    );
};

Page.propTypes = {
    
};

export default Page;