import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom'
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const [signError, setsignError] = useState({});
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const history = useHistory();


  const{username, email,password, confirmPassword}= signupData;

  const handelFormChanges = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const validateCP = () => {
    if (signupData.password === signupData.confirmPassword) {
      return {
        isMatch: true,
        confirmPassword: 'match',
      };
    }
    return {
      isMatch: false,
      confirmPassword: 'Password does not match',
    };
  };

  const handleSubmit =  async(event, dispatch) => {
    event.preventDefault();
    event.stopPropagation();
    const passwordMatch = validateCP();
    if (!passwordMatch.isMatch) {
      return setsignError({
        ...signError,
        passwordMatch,
      });
    } try {
           const result= await axios.post("http://localhost:8800/api/auth/register", signupData);   
         if(result)
            history.push("/login");
          } catch (err) {
            console.log(err);
          }
  }
  return (
      <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Virago</h3>
          <span className="loginDesc">
            Connect with Females in tech around you on Virago.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              name="username"
              value={username}
              onChange={handelFormChanges}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handelFormChanges}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              name="password"
              value={password}
              className="loginInput"
              type="password"
              onChange={handelFormChanges}
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handelFormChanges}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              <Link to ="/login">
              Log into Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
    )
  
}
