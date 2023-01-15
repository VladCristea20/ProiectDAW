import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import OnlineUsers from './components/OnlineUsers';
function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (///se pot incarca resul componentelor care sunt nested mai jos daca authIsReady a terminat cu apelatul functiei de dispatch
        <BrowserRouter>
          {user&&<Sidebar />}{/**Logica pentru cand utilizatorul este autentificat(acesta va putea interactiona cu functionalitatile din Sidebar) */}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<>{/**Route pentru pagina de dashboard */}
              {!user&&<Navigate to="/login" />}{/**Logica pentru cand utilizatorul nu este autentificat(acesta va fi redirectionat catre pagina de login) */}
              {user&&<Dashboard />}
              </>}  
              />
              <Route path="/create" element={<>{/**Route pentru pagina de creat proiecte */}
              {!user&&<Navigate to="/login" />}{/**Logica pentru cand utilizatorul nu este autentificat(acesta va fi redirectionat catre pagina de login) */}
              {user&&<Create />}
              </>}/>
              <Route path="/login" element={<>{/**Route pentru pagina de login */}
              {user&&<Navigate to="/" />}{/**Logica pentru cand utilizatorul este autentificat(acesta va fi redirectionat catre pagina de pagina de Dashboard) */}
              {!user&&<Login />}
              </>} />
              <Route path="/signup" element={<>{/**Route pentru pagina de signup */}
              {user&&<Navigate to="/" />}{/**Logica pentru cand utilizatorul este autentificat(acesta va fi redirectionat catre pagina de pagina de Dashboard) */}
              {!user&&<Signup />}
              </>} />
              <Route path="/projects/:id" element={<>{/**Route pentru fiecare proiect */}
              {!user&&<Navigate to="/login" />}{/**Logica pentru cand utilizatorul nu este autentificat(acesta va fi redirectionat catre pagina de login) */}
              {user&&<Project />}
              </>} />
            </Routes>
          </div>
          {user&&<OnlineUsers/>}{/**Logica pentru cand utilizatorul este autentificat(acesta va putea vedea restul utilizatorilor) */}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
