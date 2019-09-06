import React from 'react'

const Picture = ({ url, children }) => {
    return (
        <div className='flex justify-center'>
            <div 
                className='w-100 w-50-m w-33-ns pt3'
                style={{ position: 'relative' }}
            >
                <img
                    id='img'
                    src={ url }
                    alt=''
                />

                { children }
                
            </div>
        </div>
    )
}

export default Picture