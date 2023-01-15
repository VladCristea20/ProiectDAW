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
      {authIsReady && (
        <BrowserRouter>
          {user&&<Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<>
              {!user&&<Navigate to="/login" />}
              {user&&<Dashboard />}
              </>}  
              />
              <Route path="/create" element={<>
              {!user&&<Navigate to="/login" />}
              {user&&<Create />}
              </>}/>
              <Route path="/login" element={<>
              {user&&<Navigate to="/" />}
              {!user&&<Login />}
              </>} />
              <Route path="/signup" element={<>
              {user&&<Navigate to="/" />}
              {!user&&<Signup />}
              </>} />
              <Route path="/projects/:id" element={<>
              {!user&&<Navigate to="/login" />}
              {user&&<Project />}
              </>} />
            </Routes>
          </div>
          {user&&<OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
