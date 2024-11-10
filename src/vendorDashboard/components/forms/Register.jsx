import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })
      const data = await response.json()
      if (response.ok) {
        console.log(data,"Vendor Register Success")
        setUsername(""),
        setEmail(""),
        setPassword("")
        alert("Vendor Registered Success")
        showLoginHandler()

      }
      else{
        setError(data.error)
      }

    }
    catch (error) {
      console.error("Registration Failed", error)
      alert("Registration Failed")

    }
  }

  return (
    <div className="registerSection">
      <form className='authForm' onSubmit={handleSubmit} >
        <h3>Vendor Register</h3>
        <label htmlFor="">User Name</label>
        <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Your Name' /><br />
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

export default Register
