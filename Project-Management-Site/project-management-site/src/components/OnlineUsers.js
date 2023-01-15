import './OnlineUsers.css';
import {useCollection} from '../hooks/useCollection';
import Avatar from './Avatar';
export default function OnlineUsers() {
  const {documents,error}=useCollection("users");//request de GET la endpointul de useri, salvati in baza de date din firebase
  return (
    <div className="user-list">
        <h2>All Users</h2>
        {error && <div className="error">{error}</div>}{/**logica pentru cand nu se poate efectua requestul de GET de mai sus */}
        {documents && documents.map(user=>(
            <div key={user.id} className="user-list-item">
                {user.online&&<span className="online-user"></span>}{/** logica pentru cand un utilizator este online(va da display la un cerc verde in stanga numelui utilizatorului) */}
                <span>{user.username}</span>
                <Avatar src={user.photoURL}/>
            </div>
        ))}
    </div>
  )
}
