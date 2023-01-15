import './Avatar.css';

export default function Avatar({src}) {
  {/**Componenta ce da display la o imagine al carei URL este pasat ca si argument prin parametrul src*/}
  return (
    <div className="avatar">
        <img src={src} alt="user avatar"/>
    </div>
  )
}
