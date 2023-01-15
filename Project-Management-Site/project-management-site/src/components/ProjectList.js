// styles
import './ProjectList.css'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
export default function ProjectList({ projects }) {
  { /**parametrul projects va primi un argument cu datele legate de proiecte, acesta fiind pasat prin notiunea de props din React
(argument dat unei componente, in cazul acesta din pagina de Dashboard din folderul pages)*/}
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>} {/**Logica pentru cand tabelul de projects nu are date inregistrate */}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p> {/**Logica pentru cand sunt date in tabelul projects din baza de date (iterez peste fiecare proiect si afisez datele corespunzatoare) */}
          <div className="assigned-to">
            <p><strong>Assigned to:</strong></p>
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
          </Link>
      ))}
    </div>
  )
}