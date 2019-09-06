import React, { useState } from 'react'
import Error from '../Error/Error'

const SignIn = ({ onRouteChange, loadUser }) => {

    const [error, setError] = useState()
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
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

    return (
        <div className='flex justify-center items-center'>
            <main className="pa4 black-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 near-white">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input 
                                className="pa2 input-reset ba br2 bg-transparent near-white w-100" 
                                type="email" 
                                name="email"  
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba br2 bg-transparent near-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba br2 b--red bg-transparent grow pointer f6 dib near-white" 
                            type="submit" 
                            value="Sign in" 
                            onClick={(e) => handleSubmit(e)}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <a 
                            href="#0" 
                            className="f6 link dim black db near-white" 
                            onClick={() => onRouteChange('register')}
                        >
                            Register
                        </a>
                    </div>
                </form>
                <Error error={error} size={100} />
            </main>
        </div>
    )
}

export default SignIn