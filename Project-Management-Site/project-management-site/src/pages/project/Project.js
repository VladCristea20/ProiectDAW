import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import './Project.css';
import ProjectComments from './ProjectComments';
import ProjectSummary from './ProjectSummary';

export default function Project() {
  const {id}= useParams();
  const {error,document}=useDocument("projects",id);//request de get pentru documentul pe care a apasat utilizatorul
  if(error)
  {
    return <div className="error">{error}</div> //logica pentru cand nu s-a putut efectua requestul de get
  }
  if(!document)
  {
    return <div className="loading">Loading...</div>//logica pentru cat timp se efectueaza requestul de get
  }
  return (
    <div className="project-details">
      <ProjectSummary project={document}/>{/**Componenta pentru descrierea proiectului */}
      <ProjectComments project={document}/>{/**Componenta pentru comentariile adaugate proiectului */}
    </div>
  )
}
