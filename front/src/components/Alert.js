import React from 'react';



const Alert = ({texto}) => {
    return ( 
        <div className="container d-flex justify-content-center  alert alert-danger mt-2 w-25 h-50" role="alert">
            { texto }
        </div>
    );
}

export default Alert;