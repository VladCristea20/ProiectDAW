import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore"
export default function ProjectSummary({ project }) {
  const {deleteDocument}=useFirestore("projects");//deserializez metoda deleteDocument ce face un request de delete pentru proiectul curent cand este apelata
  const {user}=useAuthContext();//cookie pentru utilizatorul curent
  const navigate=useNavigate();//hook pentru navigat pe pagini
  const handleClick= (event)=>{
    deleteDocument(project.id);//apelez metoda pentru a da delete la documentul curent
    navigate("/");//navighez inapoi catre dashboard
  }
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>Created by {project.createdBy.username}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.details}
        </p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (//userii ce au asignat task-ul
            <div key={user.id}>
              <Avatar src={user.photoURL} />{/**componenta ce da display la un nume si o fotografie a unui utilizator */}
            </div>
          ))}
        </div>
      </div>
        {user.uid===project.createdBy.id&&(
        <button className="btn" onClick={handleClick}>Mark as complete</button>//Butonul de Mark as complete are metoda de handleClick binded de mai sus pentru event listener-ul onClick
        )}
    </div>
  )
}