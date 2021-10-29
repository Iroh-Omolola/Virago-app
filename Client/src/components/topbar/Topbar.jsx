import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SearchBox } from "../searchBox/searchBox";
import axios from "axios";



export default function Topbar() {
  // const [search, setSearch] = useState({
  //   searchField:""
  // })
  const [user, setUser] = useState('')
  const { user :currentUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${currentUser._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser._id]);
 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  
  // const onSearchChange=(e)=>{
  //  setSearch({searchField:e.target.value})
  // }
  
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">Virago</span>
        </Link>
      </div>
      <div className="topbarCenter">
       <SearchBox placeholder="search post or friends" handleChange={''}/>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
