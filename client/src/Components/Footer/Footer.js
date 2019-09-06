import React from 'react'

const Footer = () => {
    return(
        <footer className='w-100 flex justify-between'>
            <p>background powered by <a className='link dim underline-hover red' href='https://thispersondoesnotexist.com/'>ThispersonDoesNotExist</a></p>
            <p>2019 <span role='img' aria-label=''>©</span> Made with <span role='img' aria-label=''>❤️</span> by <a className='link dim underline-hover red' href='https://enkienki.com'>Gaetan Peltier</a></p>
        </footer>
    )
}

export default Footer