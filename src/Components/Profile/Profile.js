import "./profile.css";
import {jwtDecode} from "jwt-decode";
import {useEffect,useState} from "react"
import { signOut } from "firebase/auth";
import { auth,provider } from "../../firebase/config";
import { Link } from "react-router-dom";

const Profile = () => {
    const user = localStorage.getItem("token");
    const decodedUser =  user? jwtDecode(user):null;
    const id = decodedUser? decodedUser.userId:null;
    const googleUser = JSON.parse(localStorage.getItem("google-token"));
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("/img/flag.png");
    useEffect(() => {
      const fetchUser = () => {
          if (id) {
              fetch(`${process.env.URL}/user/${id}`)
                  .then(res => res.json()) // Parse the response as JSON
                  .then(data => {
                      setName(data.firstName);
                  })
                  .catch(err => console.log(err));
          }else if(googleUser){
            setName(googleUser.displayName||"");
            setProfilePhoto(googleUser.photoURL);
          }

      };
  
      fetchUser();
  }, [id,googleUser]);
  

    const handleLogout=()=>{
      if (id) {
        localStorage.removeItem("token");
        window.location.reload();
      }else if(googleUser){
        signOut(auth,provider).then(()=>{
          localStorage.clear();
          window.location.reload();
        })
      }
    }
  return (
    <div className="profile">
      <div className="profileTop">
        <img src={profilePhoto} alt="" />
        <h1 className="profileName">{name}</h1>
      </div>
      <hr />
      <div className="profileCenter">
        <div className="options">
          <span>Notifications</span>
          <Link to='/shoppingHistory'><span>Shopping History</span></Link>
          <span>Customer Service</span>
          <span>Shopping History</span>
          <span>Customer Service</span>
          <span>Shopping History</span>
          <span>Customer Service</span>
        </div>
      </div>
      <hr />
      <div className="profileBottom">
          <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
