import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, username, thumbnail);
  }
  const handleFileChange = (event) => {
    setThumbnail(null);
    let selected = event.target.files[0];
    console.log(selected);

    ///if user didn't press on cancel
    if (!selected) {
      setThumbnailError("Please select a file");
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
    setThumbnail(selected);
    console.log("thumbnail updated");
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </label>

      <label>
        <span>Username:</span>
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
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
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
