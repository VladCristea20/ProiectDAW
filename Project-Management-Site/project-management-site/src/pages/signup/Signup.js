import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");//state-uri ce vor fi modificate pe baza valorilor din formular
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();//deserializez metoda de signup si state-urile de isPending si error din hook-ul useSignup

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, username, thumbnail);//apelez metoda de signup ce va face un request de post la api
  }
  const handleFileChange = (event) => {
    setThumbnail(null);
    let selected = event.target.files[0];
    console.log(selected);

    ///logica pentru cand fisierul incarcat nu este valid
    if (!selected) {
      setThumbnailError("Please select a file");//
      return
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return
    }
    if (selected.size > 1000000) {
      setThumbnailError("Image file size must be less than 1MB");
      return
    }
    setThumbnailError(null);
    setThumbnail(selected);//update la state-ul de thumbnail
    console.log("thumbnail updated");
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}//update la state-ul de email
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}//update la state-ul de parola
          value={password}
        />
      </label>

      <label>
        <span>Username:</span>
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}//update la state-ul de username
          value={username}
        />
      </label>

      <label>
        <span>Profile thumbnail:</span>
        <input
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}{/**Logica pentru cand requestul de post este in desfasurare */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
