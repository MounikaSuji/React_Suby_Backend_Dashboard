import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'


const Login = ({showWelcomeHandler}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (response.ok) {
                alert("Vendor Login Success")
                console.log(data, "Vendor Login Success")
                setEmail(""),
                setPassword("")
                localStorage.setItem('loginToken', data.token);
                showWelcomeHandler()
                
            }
            const vendorId = data.vendorId
            const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
            const vendorData = await vendorResponse.json()
            if(vendorResponse.ok){
                const vendorFirmId = vendorData.vendorFirmId;
                const vendorFirmName = vendorData.vendor.firm[0].firmName;
                
                localStorage.setItem('firmId',vendorFirmId)
                localStorage.setItem('firmName',vendorFirmName)
                 window.location.reload()

            }

        }
        catch (error) {
            console.error("Login Failed", error)
            alert("Login Failed")

        }
    }
    return (
        <div className="loginSection">

            <form className='authForm' onSubmit={loginHandler} >
                <h3>Vendor Login</h3>
                <label htmlFor="">Email</label>
                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' /><br />
                <label htmlFor="">Password</label>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' /><br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
