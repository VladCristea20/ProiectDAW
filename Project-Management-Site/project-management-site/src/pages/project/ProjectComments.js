import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
export default function ProjectComments({project}) {
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState('')
  const {updateDocument,response}=useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();//previn refresh-ul paginii

    //obiect ce va fi adaugat in tabelul de comentarii , din baza de date de pe firebase
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    //updatez documentul cu comentariile adaugate(request de put/patch)
    await updateDocument(project.id,{
        comments:[...project.comments,commentToAdd]
    });
    if(!response.error)
    {
        setNewComment("");//logica pentru daca nu a putut fi efectuat requestul
    }
  }

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      
      <ul>
        {project.comments.length > 0 && project.comments.map(comment => (/**Iterez peste comentariile deja existente */
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoURL} />
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{formatDistanceToNow(comment.createdAt.toDate(),{addSuffix:true})}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>{/**apelez metoda de handleSubmit de mai sus cand apas pe butonul din formular*/}
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}//state-ul pentru comentariu este updatat cu ce valoare este in tagul de textarea
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}