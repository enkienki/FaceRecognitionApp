import React, { useState } from 'react'
import Error from '../Error/Error'

const Register = ({ onRouteChange, loadUser }) => {

    const [error, setError] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)$/
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/
        if (!nameRegex.test(name)) {
            return setError('Name can contain only letters')
        } else if (!emailRegex.test(email)) {
            return setError('the email is not a valid email adress')
        } else if (!passwordRegex.test(password)) {
            return setError('Password must contain 8 to 10 characters including at least one letter, one number and one special character')
        } else {
            fetch('http://localhost:3001/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        loadUser(user)
                        onRouteChange('home')
                    } else {
                        setError(user)
                    }
                })
        }
    }

    return (
        <div className='flex justify-center'>
            <article className="pa4 black-80">
                <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6 near-white" htmlFor="email">Name</label>
                            <input
                                className="pa2 input-reset ba br2 bg-transparent near-white"
                                type="name"
                                name="name"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6 near-white" htmlFor="email">Email address</label>
                            <input 
                                className="pa2 input-reset ba br2 bg-transparent near-white" 
                                type="email" 
                                name="email"  
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6 near-white" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba br2 bg-transparent near-white" 
                                type="password" 
                                name="password"  
                                id="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div>
                    </fieldset>
                    <div className="mt3">
                        <input 
                        className="b ph3 pv2 input-reset ba br2 b--red bg-transparent grow pointer f6 near-white" 
                        type="submit" 
                        value="Register" 
                        onClick={(e) => handleSubmit(e)} 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <a
                            href="#0"
                            className="f6 link dim black db near-white"
                            onClick={() => onRouteChange('signin')}
                        >
                            Sign In
                        </a>
                    </div>
                </form>
                <Error error={error} size={100} />
            </article>
        </div>
    )
}

export default Register
