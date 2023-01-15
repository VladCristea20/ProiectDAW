import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuthContext()//cookie legat de utilizatorul curent
  const { documents, error } = useCollection('projects')//request de get la proiecte
  const [filter, setFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setFilter(newFilter)//aici se updateaza state-ul de filter dupa care se filtreaza array-ul de mai jos
  }
  
  const projects = documents ? documents.filter(document => {//proiectele se pot filtra dupa preferintele utilizatorului
    switch(filter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if(u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return document.category === filter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} />}{/**metoda de changeFilter va fi apelata in componenta de Project filter si aceasta va da un argument care va conta la switch-ul de mai sus */}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}