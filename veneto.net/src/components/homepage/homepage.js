import React from 'react';
import "./homepage.css"

const Homepage = ({setLoginUser}) => {
    return ( 
        <div className='homepage'>
            Hello Homepage

            <div className='button' onClick={() => setLoginUser({})}>Logout</div>
            </div>
     );
}
 
export default Homepage;