import React from 'react';


const Title = ({name}) => {
    return ( 
        <div className='container mb-5 d-flex justify-content-center bg-dark'>
            <h1 className='text-light'>{ name }</h1>
        </div>
    );
}

export default Title;