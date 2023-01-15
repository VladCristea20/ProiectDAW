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
  { value: 'development', label: 'Development' },
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
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError,setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null);

    if(!category)
    {
      setFormError("Please select a project category");
      return ///stops the function here
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
    }

    await addDocument(project);
    if(!response.error)
    {
      navigate("/");
    }
  }
useEffect(()=>{
  if(documents)
  {
    const options=documents.map(user=>{
      return {value:user,label:user.username};
    })
    setUsers(options);
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
          onChange={(option)=>setCategory(option)}
          options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
          options={users}
          onChange={(option)=>setAssignedUsers(option)}
          isMulti ///checks if user chose 2 or more options
          />
        </label>

        <button className="btn">Add Project</button>

        {formError&& <p className="error">{formError}</p>}
      </form>
    </div>
  )
}