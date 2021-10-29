import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 const [user, setUser] = useState({});
  const {user: currentUser} = useContext(AuthContext);
  const [file, setFile] = useState('');
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const submitHandler = async (e) => {
    e.preventDefault();

   const updateProfile={
    userId:user._id
   };

  if (file) {
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    updateProfile.profilePicture = fileName;
    console.log(updateProfile);
    try {
      if(updateProfile!== ""){
      await axios.post("/upload", data);
      }
    } catch (err) {}
  }
  try {
    if(updateProfile!== ""){
      await axios.put(`/users/${currentUser._id}`, updateProfile , {
        headers: {
          "content-type": "application/json"
        }
          } 
          );
      window.location.reload();
    }
  } catch (err) {}
};

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <form className="profileCover" >
            <label htmlFor="file" className="shareOption">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
               <input
                style={{ display: "none" }}
                name="file"
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
              />
            </label>
              <label htmlFor="file" className="shareOption">            
              <img
                className="profileUserImg"
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <input
              style={{ display: "none" }}
                name="file"
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" style={{ marginLeft: "650px", marginTop:"50px" }} onClick={submitHandler}>Upload</button> 
            </label>
              
            </form>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
