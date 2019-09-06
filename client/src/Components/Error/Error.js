import React from 'react'

const Error = ({error, size}) => {
    return (
        <div>
            {error &&
                <div className='flex justify-center'>
                    <p className={`w-${size} bg-light-red br2 pa3`}>
                        {error}
                    </p>
                </div>
            }
        </div>
    )
}

export default Error