import {Link} from 'react-router-dom';
import './Navbar.css';
import Manage from '../assets/manage.svg';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const {logout,isPending} = useLogout();
  const {user}=useAuthContext();
  return (
    <div className="navbar">
        <ul>
            <li className="logo">
                <img src={Manage} alt="dojo logo"/>{/** svg din fisierul assets */}
                <span>Manage</span>
            </li>
            {!user&&(<>{/**logica pentru cand utilizatorul nu este logat(se va da display doar la 2 ancore catre pagina de login si signup) */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li
            ></>)}
            {user&&(<>{/**logica pentru cand utilizatorul este logat */}
            <li>
                {!isPending&&<button className="btn" onClick={logout}>Logout</button>} {/**logica pentru cand utilizatorul doreste sa isi dea logout*/}
                {isPending&&<button className="btn" onClick={logout} disabled>Logging out</button>}{/**logica pentru cand actiunea de logout este in desfasurare(textul butonului devine "Logging out")*/}
                </li></>)}
        </ul>
    </div>
  )
}
