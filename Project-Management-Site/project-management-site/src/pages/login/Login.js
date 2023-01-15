import './Login.css'
import {useLogin} from '../../hooks/useLogin';
import { useState } from 'react';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,isPending,error} = useLogin();
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    login(email,password);
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </label>

      {!isPending && <button className="btn">Log in</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
