import React from 'react'
import Tilt from 'react-tilt'

const Logo = () => {
    return (
        <div className='flex justify-center'>
            <Tilt className='Tilt bg-mid-gray br4 shadow-4 flex items-center justify-center' options={{ max: 25 }} style={{ height: 100, width: 100 }} >
                <div className='Tilt-inner'><i className="fas fa-brain near-white f1"></i></div>
            </Tilt>
        </div>
        
    )
}

export default Logo