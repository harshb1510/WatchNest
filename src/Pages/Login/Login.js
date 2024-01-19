import "./login.css";
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import ClockT from "../../Components/Clock/ClockT"
import { auth,provider } from "../../firebase/config";
import {signInWithPopup} from 'firebase/auth'

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error,setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.post(`https://watchnest.onrender.com/api/login`,data);
        localStorage.setItem('token',res.data.token);
        navigate("/");
    } catch (error) {
        if (error.response&&error.response.status>=400&&error.response.status<=500) {
            setError(error.response.data.message)
        }
    }
  }

  const googleAuth = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        navigate('/');
        localStorage.setItem("google-token", JSON.stringify(data.user));
      })
      .catch((error) => {
        console.error("Error during sign-in", error);
      });
      
      
    }
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
        <form action="" className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <button onClick={googleAuth}>Sign In with google</button>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error&&<div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
                Sign In
            </button>
          </form>
        </div>
        <div className="right">
        <Link to="/">
        <button className="home">
            <h1>Watchnest</h1>
            </button>
        </Link> 
        <div className="watchDiv">

        <ClockT/>
        </div>
        <h1 className="newHere">New Here</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default Signup;
