import './Sidebar.css';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Sidebar() {
    const {user}=useAuthContext(); {/**Cookie ce retine informatii legate de utilizatorul logat */}
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                   <Avatar src={user.photoURL}/>
                    <p>Hello {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to="/">{/**Ancora speciala(aplica clasa .active ancorei curente) pentru pagina de dashboard */}
                                <img src={DashboardIcon} alt="dashboard icon"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">{/**Ancora speciala(aplica clasa .active ancorei curente) pentru pagina de create project*/}
                                <img src={AddIcon} alt="Add project icon"/>
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
