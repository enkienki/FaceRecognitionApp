import React from 'react'

const Rank = ({name, entries}) => {
    return(
        <nav className='flex justify-center pa3 near-white'>
            <p>Hi {name}, your current rank is {entries} </p>
        </nav>
    )
}

export default Rank