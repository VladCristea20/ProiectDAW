import { useEffect, useState } from 'react'
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import {useAuthContext} from '../../hooks/useAuthContext';
import {useNavigate} from 'react-router-dom';
// styles
import './Create.css'
import { useFirestore } from '../../hooks/useFirestore';

const categories = [
  { value: 'development', label: 'Development' },//categorii ce vor fi adaugate intr-un tag de select ca si optiuni
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },

]

export default function Create() {
  const navigate= useNavigate();
  const {addDocument,response} =useFirestore("projects");
  const {documents}=useCollection("users");
  const [users,setUsers]=useState([]);
  const {user}=useAuthContext();

  // form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');//state-uri ce se modifica odata cu valorile introduse in formular
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError,setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()//cand apas pe un buton intr-un formular, acesta transmite un eveniment ce da refresh la pagina, lucru ce l-am prevenit cu ajutorul metodei preventDefault
    setFormError(null);

    if(!category)//daca unul din campuri nu a fost completat state-ul de setFormError va afisa un mesaj
    {
      setFormError("Please select a project category");
      return 
    }
    if(assignedUsers.length<1)
    {
      setFormError("Please assign the project to at least 1 user");
      return
    }

    const createdBy={
      username:user.displayName,
      photoURL:user.photoURL,
      id:user.uid
    }

    const assignedUsersList = assignedUsers.map((u)=>{
      return {
      username:u.value.username,
      photoURL:u.value.photoURL,
      id:u.value.id
      }
    })

    const project={
      name,
      details,
      category:category.value,
      dueDate:timestamp.fromDate(new Date(dueDate)),
      comments:[],
      createdBy,
      assignedUsersList
    }//obiectul de tip proiect ce va fi adaugat in baza de date

    await addDocument(project);//astept sa se termine requestul de post 
    if(!response.error)//daca requestul de post a fost efectuat cu succes , utilizatorul va fi redirectionat catre pagina principala
    {
      navigate("/");
    }
  }
useEffect(()=>{
  if(documents)
  {
    const options=documents.map(user=>{
      return {value:user,label:user.username};//array ce va contine toti userii ce se afla in baza de date
    })
    setUsers(options);//updatez state-ul
  }
},[documents])

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}//updatez state-ul ce contine numele proiectului cu valoarea pasata ca si eveniment in functia de onChange
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}//updatez state-ul ce contine detaliile proiectului cu valoarea pasata ca si eveniment in functia de onChange
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} //updatez state-ul ce contine data limita a proiectului cu valoarea pasata ca si eveniment in functia de onChange
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
          onChange={(option)=>setCategory(option)}//updatez state-ul ce contine optiunile proiectului cu valoarea pasata ca si eveniment in functia de onChange
          options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
          options={users}
          onChange={(option)=>setAssignedUsers(option)}//updatez state-ul ce contine array-ul cu utilizatorii ce vor lucra la proiect cu valoarea pasata ca si eveniment in functia de onChange
          isMulti ///verifica daca utilizatorul a ales 2 optiuni sau mai multe
          />
        </label>

        <button className="btn">Add Project</button>

        {formError&& <p className="error">{formError}</p>}{/**eroare ce va aparea pe ecran daca una din categorii sau daca proiectului nu i s-a asignat niciun utilizator*/}
      </form>
    </div>
  )
}