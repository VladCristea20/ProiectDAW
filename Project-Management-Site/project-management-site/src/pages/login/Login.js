import './Login.css'
import {useLogin} from '../../hooks/useLogin';
import { useState } from 'react';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");//state-urile ce isi vor updata valoarea in functie de eventul din formular
  const {login,isPending,error} = useLogin();
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    login(email,password);//metoda ce verifica credentialele utilizatorului cu cele din baza de date
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}///state-ul de email de mai sus isi modifica valoarea de fiecare data cand se modifica valoarea introdusa in formular
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}///state-ul de parola de mai sus isi modifica valoarea de fiecare data cand se modifica valoarea introdusa in formular
          value={password}
        />
      </label>

      {!isPending && <button className="btn">Log in</button>}
      {isPending && <button className="btn" disabled>Loading</button>}{/**butonul de mai sus isi schimba textul in "Loading" si devine disabled cat timp se efectueaza requestul de login */}
      {error && <div className="error">{error}</div>}{/**Erori pe baza la request(Incorrect username or password, etc) */}
    </form>
  )
}
